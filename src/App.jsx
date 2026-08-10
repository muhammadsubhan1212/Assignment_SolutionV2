import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CurrencyProvider } from './context/CurrencyContext'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'

const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceLandingPage = lazy(() => import('./pages/ServiceLandingPage'))
const OrderNowPage = lazy(() => import('./pages/OrderNowPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const BlogsPage = lazy(() => import('./pages/BlogsPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/policies/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/policies/TermsPage'))
const RevisionPolicyPage = lazy(() => import('./pages/policies/RevisionPolicyPage'))
const RefundPolicyPage = lazy(() => import('./pages/policies/RefundPolicyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-mist-200 border-t-ink-950" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              background: '#152536',
              color: '#f7f8f7',
              fontSize: '14px',
            },
          }}
        />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="order-now" element={<OrderNowPage />} />
              <Route path="contact-us" element={<ContactPage />} />
              <Route path="about-us" element={<AboutPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="blogs/:slug" element={<BlogPostPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="sitemap" element={<SitemapPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms-and-conditions" element={<TermsPage />} />
              <Route path="revision-policy" element={<RevisionPolicyPage />} />
              <Route path="refund-policy" element={<RefundPolicyPage />} />
              <Route path=":slug" element={<ServiceLandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </CurrencyProvider>
    </AuthProvider>
  )
}
