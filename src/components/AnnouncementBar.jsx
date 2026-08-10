import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-ink-950 px-4 py-2.5 text-center"
        >
          <p className="text-[13px] font-medium text-ink-200">
            <span className="inline-flex items-center gap-2">
              <span className="hidden text-ink-500 sm:inline">—</span>
              New students save 15% on the first project
              <Link
                to="/order-now"
                className="font-semibold text-brass-300 underline-offset-2 hover:underline"
              >
                Claim offer →
              </Link>
            </span>
          </p>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-ink-400 transition-colors hover:text-brass-300 sm:block"
            aria-label="Dismiss announcement"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
