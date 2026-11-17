import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { brand, navLinks, serviceNavGroups } from '../data/brand'
import CurrencySelector from './CurrencySelector'
import AnnouncementBar from './AnnouncementBar'

const DARK_HERO_ROUTES = [
  '/',
  '/services',
  '/order-now',
  '/contact-us',
  '/about-us',
  '/reviews',
  '/blogs',
  '/sitemap',
  '/privacy-policy',
  '/terms-and-conditions',
  '/revision-policy',
  '/refund-policy',
]

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex shrink-0 items-center gap-2.5" aria-label={`${brand.name} home`}>
      <img
        src="/logo-mark-white.png"
        alt=""
        className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-3"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-white">{brand.name}</span>
        <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-brass-300 sm:block">
          Academic writing desk
        </span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path))
  // Pages that open with a full-width dark hero can start with a transparent header.
  const darkTop = DARK_HERO_ROUTES.some((r) => (r === '/' ? location.pathname === '/' : location.pathname.startsWith(r)))
  const solid = scrolled || menuOpen || !darkTop

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <AnnouncementBar />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`transition-all duration-300 ${
            solid
              ? 'border-b border-white/10 bg-ink-950/90 shadow-[0_10px_30px_-12px_rgba(12,22,32,0.5)] backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px] lg:h-20'}`}>
            <Logo />

            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      to={link.path}
                      aria-expanded={megaOpen}
                      onFocus={() => setMegaOpen(true)}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                        isActive(link.path) ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>{megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}</AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive: a }) =>
                      `rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                        a ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
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
              <Link to="/login" className="rounded-full px-3 py-2 text-[13.5px] font-medium text-white/75 transition-colors hover:text-white">
                Log in
              </Link>
              <Link to="/order-now" className="btn btn-brass btn-sm">
                Order now <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/order-now" className="btn btn-brass btn-sm hidden sm:inline-flex">
                Order now
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu isActive={isActive} onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ isActive, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[48] bg-ink-950 lg:hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 100% 0%, rgba(184,149,106,0.18), transparent 60%)' }}
      />
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col overflow-y-auto px-4 pb-8 pt-32 sm:px-6"
      >
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {navLinks.map((link) =>
            link.hasMega ? (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between py-4 text-left font-heading text-2xl font-semibold text-white"
                >
                  {link.label}
                  <ChevronDown size={20} className={`text-brass-300 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-5 pb-5">
                        {serviceNavGroups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-300">{group.title}</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {group.items.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className="rounded-xl bg-white/5 px-3 py-2.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <Link to="/services" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brass-300">
                          View all services <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`flex items-center justify-between py-4 font-heading text-2xl font-semibold transition-colors ${
                    isActive(link.path) ? 'text-brass-300' : 'text-white hover:text-brass-200'
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={18} className="text-white/30" />
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[12px] font-medium text-white/50">Show prices in</span>
          <CurrencySelector variant="onDark" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link to="/login" onClick={onClose} className="btn btn-ghost-light">
            Log in
          </Link>
          <Link to="/order-now" onClick={onClose} className="btn btn-brass">
            Order now
          </Link>
        </div>

        <div className="mt-auto space-y-3 pt-10 text-[13px] text-white/60">
          <a href={`tel:${brand.phoneTel}`} className="flex items-center gap-3 hover:text-white">
            <Phone size={15} className="text-brass-300" /> {brand.phone}
          </a>
          <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white">
            <MessageCircle size={15} className="text-brass-300" /> WhatsApp the desk
          </a>
          <a href={`mailto:${brand.email}`} className="flex items-center gap-3 break-all hover:text-white">
            <Mail size={15} className="shrink-0 text-brass-300" /> {brand.email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function MegaMenu({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 w-[820px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-[0_30px_80px_-20px_rgba(12,22,32,0.35)]">
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 p-4">
          {serviceNavGroups.map((group) => (
            <div key={group.title} className="px-1">
              <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-600">{group.title}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onNavigate}
                      className="group flex items-start justify-between gap-2 rounded-xl px-2.5 py-2 transition-colors hover:bg-mist-50"
                    >
                      <span>
                        <span className="block text-[13.5px] font-semibold text-ink-900 group-hover:text-ink-950">{item.label}</span>
                        {item.blurb && <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-400">{item.blurb}</span>}
                      </span>
                      <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-brass-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 bg-ink-950 px-6 py-4">
          <span className="text-[13px] text-white/65">Not sure which service fits your brief?</span>
          <div className="flex items-center gap-4">
            <Link to="/services" onClick={onNavigate} className="text-[13px] font-semibold text-white/80 hover:text-white">
              All services
            </Link>
            <Link to="/order-now" onClick={onNavigate} className="btn btn-brass btn-sm">
              Get a free quote
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
