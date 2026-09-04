import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ANNIVERSARY_DATE, ANNIVERSARY_LABEL } from '../data/siteConfig';

interface Breakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getBreakdown(from: Date, now: Date): Breakdown {
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();
  let hours = now.getHours() - from.getHours();
  let minutes = now.getMinutes() - from.getMinutes();
  let seconds = now.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    months -= 1;
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += lastDayOfPreviousMonth;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

export default function LoveCounter() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const breakdown = getBreakdown(ANNIVERSARY_DATE, now);
  const totalDays = Math.max(0, Math.floor((now.getTime() - ANNIVERSARY_DATE.getTime()) / 86_400_000));
  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <motion.section
      className="section counter-section"
      aria-label="Time we have been together"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="section-eyebrow">Since {ANNIVERSARY_LABEL}</p>
      <h2 className="sr-only">Time we have been together since {ANNIVERSARY_LABEL}</h2>

      <p className="counter-days">{totalDays.toLocaleString('en-IN')}</p>
      <p className="counter-days-label">days of us</p>

      <p className="counter-breakdown">
        {breakdown.years} years · {breakdown.months} months · {breakdown.days} days
      </p>
      <p className="counter-live">
        {pad(breakdown.hours)} hrs · {pad(breakdown.minutes)} min · {pad(breakdown.seconds)} sec — and counting{' '}
        <span aria-hidden="true">❤️</span>
      </p>
    </motion.section>
  );
}
