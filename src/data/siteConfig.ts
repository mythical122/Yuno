/**
 * SINGLE SOURCE OF TRUTH for the whole website.
 * Edit here — every section (counter, timeline, letter…) reads from this.
 *
 * NOTE: the love letter (slide 8) says the relationship was named in 2022,
 * while 10-04-2024 was the letter's date. If the real anniversary is
 * 10 April 2022, change to `new Date(2022, 3, 10)`.
 */

/** 10 April 2024, local time (timezone-safe). */
export const ANNIVERSARY_DATE = new Date(2022, 3, 10);

export const ANNIVERSARY_LABEL = ANNIVERSARY_DATE.toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Her name, as written everywhere on this website. */
export const HER_NAME = 'Shreemati';

/** Your sign-off name. */
export const YOUR_NAME = 'Dee';
