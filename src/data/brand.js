export const brand = {
  name: 'Assignment Solution',
  shortName: 'AS',
  tagline: 'Clear writing. Confident grades.',
  email: 'hello@assignmentsolution.com',
  phone: '+44 20 7946 0958',
  phoneTel: '+442079460958',
  whatsapp: '442079460958',
  rating: '4.9',
  ratingLabel: 'Excellent',
  copyrightYears: `2024–${new Date().getFullYear()}`,
  domain: 'assignmentsolution.com',
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasMega: true },
  { label: 'About', path: '/about-us' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Contact', path: '/contact-us' },
];

export const serviceNavGroups = [
  {
    title: 'Academic Core',
    items: [
      { label: 'Academic Writing', path: '/academic-writing', blurb: 'Structured papers for every level' },
      { label: 'Essay Writing', path: '/essay-writing', blurb: 'Persuasive, clear essays' },
      { label: 'Research Paper Writing', path: '/research-paper-writing', blurb: 'Evidence-led research' },
      { label: 'Term Paper Writing', path: '/term-paper-writing', blurb: 'Deadline-ready term work' },
      { label: 'Coursework Writing', path: '/coursework-writing', blurb: 'Week-by-week support' },
      { label: 'Article Writing', path: '/article-writing', blurb: 'Publication-ready articles' },
      { label: 'Case Study Writing', path: '/case-study-writing', blurb: 'Analytical case narratives' },
    ],
  },
  {
    title: 'Advanced Research',
    items: [
      { label: 'Thesis Writing', path: '/thesis-writing-service', blurb: 'Chapter-by-chapter guidance' },
      { label: 'Dissertation Writing', path: '/dissertation-writing', blurb: 'Doctoral-level structure' },
      { label: 'Research Proposal Writing', path: '/research-proposal-writing', blurb: 'Compelling proposals' },
      { label: 'Thesis Editing', path: '/thesis-editing', blurb: 'Polish and precision' },
    ],
  },
  {
    title: 'Career & Content',
    items: [
      { label: 'Personal Statement', path: '/personal-statement', blurb: 'Authentic application stories' },
      { label: 'SOP Writing', path: '/sop-writing', blurb: 'Goal-focused statements' },
      { label: 'CV Writing', path: '/cv-writing', blurb: 'CVs that stand out' },
      { label: 'Copywriting', path: '/copywriting', blurb: 'Brand-aware copy' },
      { label: 'Web Content Writing', path: '/web-content-writing', blurb: 'SEO-friendly pages' },
      { label: 'Ebook Writing', path: '/ebook-writing', blurb: 'Long-form digital books' },
      { label: 'Ghost Writing', path: '/ghost-writing', blurb: 'Confidential voice matching' },
      { label: 'PowerPoint Presentation', path: '/powerpoint-presentation', blurb: 'Clear slide narratives' },
      { label: 'Product Description', path: '/product-description', blurb: 'Conversion-focused copy' },
    ],
  },
];

export const allServices = serviceNavGroups.flatMap((g) => g.items);

export const footerPolicyLinks = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Order Now', path: '/order-now' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Sitemap', path: '/sitemap' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Revision Policy', path: '/revision-policy' },
  { label: 'Refund Policy', path: '/refund-policy' },
];

export const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];
