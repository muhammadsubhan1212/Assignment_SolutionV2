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

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <img
        src="/logo-mark.png"
        alt={`${brand.name} logo`}
        className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-3"
      />
      <span className="hidden text-[15px] font-semibold tracking-tight text-neutral-900 sm:block">{brand.name}</span>
    </Link>
  )
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [floatingVisible, setFloatingVisible] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [dockOpen, setDockOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const location = useLocation()
  const navigate = useNavigate()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastScrollY.current
    setFloatingVisible(latest > 400)
    if (diff > 5 && latest > 100) setHidden(true)
    if (diff < -5) setHidden(false)
    lastScrollY.current = latest
  })

  useEffect(() => {
    setDockOpen(false)
    setMegaOpen(false)
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
      {/* Static top bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-0 z-40"
        style={{ marginTop: '42px' }}
      >
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <Logo />

            {/* Desktop links */}
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
                        isActive(link.path) ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
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
                        a ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <CurrencySelector />
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Login
              </Link>
              <Link
                to="/order-now"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile: currency + logo already shown; dock handles nav */}
            <div className="lg:hidden">
              <CurrencySelector />
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Floating pill nav on scroll */}
      <AnimatePresence>
        {floatingVisible && !hidden && (
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/95 px-2 py-2 shadow-2xl shadow-neutral-900/20 backdrop-blur-xl lg:flex"
          >
            <Link to="/" className="flex h-8 items-center justify-center rounded-full px-1.5" aria-label={`${brand.name} home`}>
              <img src="/logo-mark-white.png" alt="" className="h-5 w-auto" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative rounded-full px-4 py-2 text-[12px] font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <Link
              to="/order-now"
              className="ml-1 inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              Order
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile bottom dock */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setDockOpen(!dockOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl shadow-neutral-900/30"
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
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setDockOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-neutral-900 px-6 py-8 pb-12"
              >
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {navLinks.map((link) => {
                    const Icon = dockIcons[link.path] || FileText
                    return (
                      <Link
                        key={link.label}
                        to={link.path}
                        className={`flex flex-col items-center gap-2 rounded-2xl py-3 transition-all ${
                          isActive(link.path) ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'
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
                    className="block rounded-2xl border border-white/15 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/order-now"
                    className="block rounded-2xl bg-white py-3.5 text-center text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
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
      className="absolute left-1/2 top-full z-50 w-[720px] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-3"
    >
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.2)]">
        {serviceNavGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group block rounded-xl px-2.5 py-2 transition-colors hover:bg-neutral-50"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium text-neutral-800 group-hover:text-neutral-900">
                        {item.label}
                      </span>
                      <ArrowUpRight size={13} className="text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-4 mt-1.5 flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-3">
        <span className="text-[12px] text-neutral-500">Not sure which service fits your brief?</span>
        <Link to="/services" className="text-[12px] font-semibold text-neutral-900 hover:underline">
          Browse all services →
        </Link>
      </div>
    </motion.div>
  )
}
