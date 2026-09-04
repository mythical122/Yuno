import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="loader"
      role="status"
      aria-label="Preparing something special for you"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
    >
      <div className="loader-inner">
        <motion.span
          className="loader-envelope"
          aria-hidden="true"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          💌
        </motion.span>
        <p className="loader-text">
          Preparing something
          <br />
          special for you…
        </p>
        <motion.span
          className="loader-heart"
          aria-hidden="true"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.span>
      </div>
    </motion.div>
  );
}
