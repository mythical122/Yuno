import { useEffect, useState } from 'react';
import { Menu, Music, X } from 'lucide-react';
import { PLAYLIST_URL } from '../data/loveSlides';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#story', label: 'Our Story' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#memories', label: 'Memories' },
  { href: '#reasons', label: 'Reasons' },
  { href: '#for-you', label: 'Letter' },
  { href: '#surprise', label: 'Surprise' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Smooth-scroll + close menu when a link is used.
  const goTo = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (hash === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close the mobile menu with Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        <a href="#home" className="navbar-brand" onClick={goTo('#home')}>
          💌 <span>Yuno</span>
        </a>

        <div className="navbar-links">
          {NAV_LINKS.slice(1).map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)}>
              {link.label}
            </a>
          ))}
          <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="navbar-playlist">
            <Music size={14} aria-hidden="true" />
            Playlist
          </a>
        </div>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="navbar-mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)}>
              {link.label}
            </a>
          ))}
          <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Playlist 🎵
          </a>
        </div>
      )}
    </header>
  );
}
