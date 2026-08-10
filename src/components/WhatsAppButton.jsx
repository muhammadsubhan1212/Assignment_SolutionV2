import { motion } from 'framer-motion'
import { brand } from '../data/brand'

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.15L2 22l5.09-1.53a9.87 9.87 0 0 0 4.95 1.33h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.92 1.4-.49.08-1.11.11-1.79-.11-.41-.14-.94-.32-1.61-.62-2.84-1.23-4.69-4.1-4.83-4.29-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.33.02.53-.1.2-.15.32-.29.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.05.19-.19.79-.92.99-1.24.2-.32.41-.27.68-.16.28.11 1.75.82 2.05.97.3.15.5.22.57.35.08.13.08.75-.16 1.43Z" />
    </svg>
  )
}

const waHref = `https://wa.me/${brand.whatsapp}`

export default function WhatsAppButton() {
  return (
    <motion.a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="fixed bottom-24 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 lg:bottom-6 lg:left-24 lg:right-auto"
      aria-label={`Chat with ${brand.name} on WhatsApp`}
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon className="pointer-events-none h-7 w-7" />
    </motion.a>
  )
}
