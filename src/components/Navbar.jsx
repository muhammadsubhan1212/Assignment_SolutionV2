import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { Home, FileText, Info, Star, BookOpen, Mail, ArrowUpRight } from 'lucide-react'
import { brand, navLinks, serviceNavGroups } from '../data/brand'
import CurrencySelector from './CurrencySelector'

const dockIcons = {
  '/': Home,
  '/services': FileText,
  '/about-us': Info,
  '/reviews': Star,
  '/blogs': BookOpen,
  '/contact-us': Mail,
}

function Logo({ onClick, light }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <img
        src={light ? '/logo-mark-white.png' : '/logo-mark.png'}
        alt={`${brand.name} logo`}
        className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-3"
      />
      <span className={`hidden text-[15px] font-semibold tracking-tight sm:block ${light ? 'text-white' : 'text-ink-950'}`}>
        {brand.name}
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [floatingVisible, setFloatingVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [dockOpen, setDockOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const location = useLocation()
  const navigate = useNavigate()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastScrollY.current
    setFloatingVisible(latest > 280)
    setScrolled(latest > 48)
    if (diff > 5 && latest > 100) setHidden(true)
    if (diff < -5) setHidden(false)
    lastScrollY.current = latest
  })

  useEffect(() => {
    setDockOpen(false)
    setMegaOpen(false)
    setFloatingVisible(false)
    setScrolled(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = dockOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [dockOpen])

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path))

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`left-0 right-0 top-0 z-40 ${
          scrolled ? 'fixed bg-ink-950/95 shadow-lg shadow-ink-950/20 backdrop-blur-md' : 'absolute'
        } ${floatingVisible ? 'lg:hidden' : ''}`}
        style={{ marginTop: scrolled ? 0 : '42px' }}
      >
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <Logo light />

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <button
                      onClick={() => navigate(link.path)}
                      className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                        isActive(link.path) ? 'text-white' : 'text-white/65 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                    <AnimatePresence>{megaOpen && <MegaMenu />}</AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={({ isActive: a }) =>
                      `rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                        a ? 'text-white' : 'text-white/65 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <CurrencySelector variant="onDark" />
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/order-now"
                className="inline-flex items-center gap-1.5 bg-brass-400 px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-colors duration-200 hover:bg-brass-300"
              >
                Start Project
              </Link>
            </div>

            <div className="lg:hidden">
              <CurrencySelector variant="onDark" />
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {floatingVisible && !hidden && (
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 items-center gap-1 border border-ink-800 bg-ink-950/95 px-2 py-2 shadow-2xl shadow-ink-950/30 backdrop-blur-xl lg:flex"
          >
            <Link to="/" className="flex h-8 items-center justify-center px-1.5" aria-label={`${brand.name} home`}>
              <img src="/logo-mark-white.png" alt="" className="h-5 w-auto" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative px-4 py-2 text-[12px] font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-white' : 'text-ink-300 hover:text-white'
                }`}
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <Link
              to="/order-now"
              className="ml-1 inline-flex items-center bg-brass-400 px-4 py-2 text-[12px] font-semibold text-ink-950 transition-colors hover:bg-brass-300"
            >
              Order
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setDockOpen(!dockOpen)}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center bg-ink-950 text-white shadow-xl shadow-ink-950/30"
            aria-label="Toggle navigation"
          >
            <motion.span animate={{ rotate: dockOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-xl leading-none">
              +
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {dockOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setDockOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="pointer-events-auto absolute bottom-0 left-0 right-0 bg-ink-950 px-6 py-8 pb-12"
              >
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {navLinks.map((link) => {
                    const Icon = dockIcons[link.path] || FileText
                    return (
                      <Link
                        key={link.label}
                        to={link.path}
                        className={`flex flex-col items-center gap-2 py-3 transition-all ${
                          isActive(link.path) ? 'bg-white/10 text-white' : 'text-ink-400 hover:text-white'
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                        <span className="text-[11px] font-medium">{link.label}</span>
                      </Link>
                    )
                  })}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    className="block border border-white/15 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/order-now"
                    className="block bg-brass-400 py-3.5 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-brass-300"
                  >
                    Start Project
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 w-[760px] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden border border-mist-200 bg-white shadow-[0_24px_64px_-16px_rgba(12,22,32,0.28)]">
        <div className="flex items-center justify-between border-b border-mist-100 bg-mist-50 px-5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-600">
            {brand.name} · Services
          </p>
          <Link to="/services" className="text-[12px] font-semibold text-ink-950 underline decoration-brass-400 underline-offset-4 hover:text-ink-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-1 p-3">
          {serviceNavGroups.map((group) => (
            <div key={group.title} className="px-2 py-1">
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">{group.title}</p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group block border-l-2 border-transparent px-2.5 py-2 transition-colors hover:border-brass-400 hover:bg-mist-50"
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span>
                          <span className="block text-[13px] font-medium text-ink-800 group-hover:text-ink-950">
                            {item.label}
                          </span>
                          {item.blurb && (
                            <span className="mt-0.5 block text-[11px] leading-snug text-ink-400">
                              {item.blurb}
                            </span>
                          )}
                        </span>
                        <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-brass-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-mist-100 bg-ink-950 px-5 py-3.5">
          <span className="text-[12px] text-white/60">Not sure which service fits your brief?</span>
          <Link to="/order-now" className="text-[12px] font-semibold text-brass-300 hover:text-brass-200">
            Get a quote →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
