import EasterEgg from './EasterEgg';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with <span className="footer-heart" aria-hidden="true">❤️</span>
        <span className="sr-only">love</span> for Shreemati
        <EasterEgg />
      </p>
    </footer>
  );
}
