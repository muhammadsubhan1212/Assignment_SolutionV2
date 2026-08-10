import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AnnouncementBar from '../components/AnnouncementBar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import LiveChatWidget from '../components/LiveChatWidget'
import WhatsAppButton from '../components/WhatsAppButton'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full max-w-[100%] flex-col overflow-x-clip">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main className="w-full min-w-0 flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <LiveChatWidget />
    </div>
  )
}
