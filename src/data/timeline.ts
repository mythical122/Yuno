export interface TimelineEntry {
  /** e.g. "10 April 2024" */
  date: string;
  title: string;
  /** Keep it short — one or two lines read best. */
  description: string;
  /** Optional photo from /image/yuno*.jpg */
  image?: string;
}

/**
 * ✏️ EDIT ME — replace the placeholders below with your real memories.
 * Add or remove entries freely; the layout adapts on its own.
 * Keep descriptions short and personal.
 */
export const timeline: TimelineEntry[] = [
  {
    date: '10 April 2024',
    title: 'The Beginning ❤️',
    description: '✏️ Add our real memory here — the day our little story started.',
    image: '/image/yuno1.jpg',
  },
  {
    date: '✏️ Add date',
    title: 'First Little Adventure 💫',
    description: '✏️ Our first trip / first photo together — write it here.',
    image: '/image/yuno3.jpg',
  },
  {
    date: '✏️ Add date',
    title: 'Us, Through Everything 🌦️',
    description: '✏️ Ups and downs, always together — your words go here.',
    image: '/image/yuno5.jpg',
  },
  {
    date: '✏️ Add date',
    title: 'One of My Favourite Days 🌙',
    description: '✏️ That one evening / call / moment you never forgot.',
    image: '/image/yuno7.jpg',
  },
  {
    date: 'Today',
    title: '…and still counting ❤️',
    description: 'Every ordinary day with you quietly becomes a favourite one.',
    image: '/image/yuno9.jpg',
  },
];
