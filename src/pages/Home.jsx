import { lazy, Suspense } from 'react'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import TrustIndicators from '../components/TrustIndicators'

const Services = lazy(() => import('../components/Services'))
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'))
const HowItWorks = lazy(() => import('../components/HowItWorks'))
const Features = lazy(() => import('../components/Features'))
const Statistics = lazy(() => import('../components/Statistics'))
const Writers = lazy(() => import('../components/Writers'))
const Pricing = lazy(() => import('../components/Pricing'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const FAQ = lazy(() => import('../components/FAQ'))
const CTABanner = lazy(() => import('../components/CTABanner'))
const Contact = lazy(() => import('../components/Contact'))

function SectionFallback() {
  return <div className="py-24" />
}

export default function Home() {
  return (
    <>
      <Seo
        title=""
        description="Assignment Solution delivers subject-matched academic writing for students in the UK, USA, Australia, Canada and beyond — transparent pricing in your local currency."
        path="/"
      />
      <Hero />
      <TrustIndicators />
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Statistics />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Writers />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTABanner />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  )
}
