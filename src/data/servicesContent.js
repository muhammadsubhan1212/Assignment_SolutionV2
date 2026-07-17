const baseFaqs = (label) => [
  {
    q: `What does your ${label.toLowerCase()} service include?`,
    a: `We cover briefing, outlining, drafting, citation formatting, and quality review tailored to ${label.toLowerCase()} requirements.`,
  },
  {
    q: 'How do I place an order?',
    a: 'Open Order Now, share instructions and files, confirm the quote in your currency, and our desk assigns a matched writer.',
  },
  {
    q: 'Do you offer free revisions?',
    a: 'Yes, within the revision window when requests align with the original brief and rubric.',
  },
  {
    q: 'Is my information confidential?',
    a: 'We store order details securely and never sell personal data. See our privacy policy for full terms.',
  },
];

function makeService({ slug, title, hero, intro, benefits, category, writerOverride }) {
  return {
    slug,
    title,
    category,
    seoTitle: title,
    seoDescription: `${hero} Professional ${title.toLowerCase()} from Assignment Solution with transparent pricing in your currency.`,
    hero,
    intro,
    benefits,
    faqs: baseFaqs(title),
    writers: writerOverride,
  };
}

export const servicesContent = {
  'academic-writing': makeService({
    slug: 'academic-writing',
    title: 'Academic Writing',
    category: 'Academic Core',
    hero: 'Structured academic writing that respects your module outcomes',
    intro:
      'From seminar responses to longer researched papers, Assignment Solution helps you organise evidence, cite correctly, and write with a steady academic voice.',
    benefits: [
      'Rubric-aligned outlines before drafting',
      'Reference styles handled with care',
      'Editor review for coherence and tone',
    ],
  }),
  'essay-writing': makeService({
    slug: 'essay-writing',
    title: 'Essay Writing',
    category: 'Academic Core',
    hero: 'Essays with argument, evidence, and readable flow',
    intro:
      'We craft essays that open cleanly, develop paragraphs with purpose, and close with insight — not filler conclusions.',
    benefits: [
      'Thesis-driven introductions',
      'Source integration that reads natural',
      'Proofreading for clarity and grammar',
    ],
  }),
  'research-paper-writing': makeService({
    slug: 'research-paper-writing',
    title: 'Research Paper Writing',
    category: 'Academic Core',
    hero: 'Research papers grounded in credible sources and clear method',
    intro:
      'Our research writers map literature, frame questions, and structure findings so supervisors see rigor instead of patchwork notes.',
    benefits: [
      'Literature maps that show positioning',
      'Transparent methodology notes',
      'Citation hygiene for major styles',
    ],
  }),
  'term-paper-writing': makeService({
    slug: 'term-paper-writing',
    title: 'Term Paper Writing',
    category: 'Academic Core',
    hero: 'Term papers that survive end-of-semester pressure',
    intro:
      'When multiple modules collide, we help you ship a term paper that still looks considered — structure first, polish second.',
    benefits: [
      'Fast scoping for overloaded weeks',
      'Discipline-aware writers',
      'Delivery buffers for your review time',
    ],
  }),
  'coursework-writing': makeService({
    slug: 'coursework-writing',
    title: 'Coursework Writing',
    category: 'Academic Core',
    hero: 'Coursework support paced to weekly submission cycles',
    intro:
      'Ongoing modules need steady output. Assignment Solution supports briefs, reflections, and assignment packs without generic templates.',
    benefits: [
      'Consistent voice across related tasks',
      'Clarifying questions before drafting',
      'Flexible milestones for multi-part coursework',
    ],
  }),
  'article-writing': makeService({
    slug: 'article-writing',
    title: 'Article Writing',
    category: 'Academic Core',
    hero: 'Articles that balance readability with academic substance',
    intro:
      'Whether journalistic academic features or course articles, we keep hooks honest and sources traceable.',
    benefits: ['Audience-aware tone', 'Clean section hierarchy', 'Optional SEO-friendly framing'],
  }),
  'case-study-writing': makeService({
    slug: 'case-study-writing',
    title: 'Case Study Writing',
    category: 'Academic Core',
    hero: 'Case studies with sharp analysis and actionable recommendations',
    intro:
      'We unpack context, analyse options, and recommend with evidence — the format markers expect in business and health courses.',
    benefits: [
      'Problem–analysis–recommendation arcs',
      'Framework application without buzzword fog',
      'Appendices and exhibits when needed',
    ],
  }),
  'thesis-writing-service': makeService({
    slug: 'thesis-writing-service',
    title: 'Thesis Writing',
    category: 'Advanced Research',
    hero: 'Thesis chapters built for committee scrutiny',
    intro:
      'From proposals to discussion chapters, we help you keep methodology coherent and prose patient enough for long-form review.',
    benefits: ['Chapter-by-chapter planning', 'Literature synthesis support', 'Editing passes for consistency'],
  }),
  'dissertation-writing': makeService({
    slug: 'dissertation-writing',
    title: 'Dissertation Writing',
    category: 'Advanced Research',
    hero: 'Dissertation support for doctoral-level structure and stamina',
    intro:
      'Long projects need pacing. Our desk coordinates literature, methods, results narrative, and revisions without losing the thread.',
    benefits: ['Milestone calendars', 'Specialist matching by field', 'Formatting for institutional templates'],
  }),
  'research-proposal-writing': makeService({
    slug: 'research-proposal-writing',
    title: 'Research Proposal Writing',
    category: 'Advanced Research',
    hero: 'Proposals that convince supervisors you are ready to begin',
    intro:
      'We tighten research questions, justify methods, and present feasible timelines that boards can approve.',
    benefits: ['Gap statements that earn attention', 'Ethics and feasibility notes', 'Clear expected contribution language'],
  }),
  'thesis-editing': makeService({
    slug: 'thesis-editing',
    title: 'Thesis Editing & Proofreading',
    category: 'Advanced Research',
    hero: 'Editing that protects your voice while upgrading clarity',
    intro:
      'Already drafted? Our editors refine structure, consistency, citations, and language without flattening your argument.',
    benefits: ['Line and structural edits', 'Reference list cleanup', 'Comment streams you can learn from'],
  }),
  'personal-statement': makeService({
    slug: 'personal-statement',
    title: 'Personal Statement Writing',
    category: 'Career & Content',
    hero: 'Personal statements that sound like you — at your best',
    intro:
      'Admissions readers spot generic claims. We help you narrate motivation, evidence, and fit in a credible first-person voice.',
    benefits: ['Interview-led discovery prompts', 'Program-specific framing', 'Tight length discipline'],
  }),
  'sop-writing': makeService({
    slug: 'sop-writing',
    title: 'SOP Writing',
    category: 'Career & Content',
    hero: 'Statements of purpose with goals, fit, and proof',
    intro:
      'A strong SOP links past experience to future research or professional aims. We help you make that line undeniable.',
    benefits: ['Faculty and lab alignment language', 'Outcome-focused storytelling', 'Polished English without overclaiming'],
  }),
  'cv-writing': makeService({
    slug: 'cv-writing',
    title: 'CV Writing',
    category: 'Career & Content',
    hero: 'Academic and professional CVs that scan cleanly',
    intro:
      'We restructure achievements, quantify where honest, and format for both human reviewers and ATS-aware screens.',
    benefits: ['Role-targeted versions', 'Publication and project blocks', 'Readable typography hierarchies'],
  }),
  copywriting: makeService({
    slug: 'copywriting',
    title: 'Copywriting',
    category: 'Career & Content',
    hero: 'Copy that persuades without sounding like a template',
    intro:
      'Brand pages, campaigns, and emails need clarity first. Assignment Solution writers balance creativity with conversion goals.',
    benefits: ['Audience and offer mapping', 'CTA-focused drafts', 'Tone guidelines retained across assets'],
  }),
  'web-content-writing': makeService({
    slug: 'web-content-writing',
    title: 'Web Content Writing',
    category: 'Career & Content',
    hero: 'Web content structured for scanners and search',
    intro:
      'We write pages that load meaning fast — headings, scannable paragraphs, and SEO hygiene without keyword stuffing.',
    benefits: ['Information architecture support', 'Meta-friendly summaries', 'Consistent brand lexicon'],
  }),
  'ebook-writing': makeService({
    slug: 'ebook-writing',
    title: 'Ebook Writing',
    category: 'Career & Content',
    hero: 'Ebooks from outline to reader-ready chapters',
    intro:
      'Long-form digital books need pacing and chapter promises. We build arcs that keep readers finishing.',
    benefits: ['Chapter outlines approved first', 'Voice consistency across sections', 'Optional worksheets and summaries'],
  }),
  'ghost-writing': makeService({
    slug: 'ghost-writing',
    title: 'Ghost Writing',
    category: 'Career & Content',
    hero: 'Confidential ghost writing matched to your tone',
    intro:
      'When the byline must be yours alone, we listen carefully, draft privately, and hand over polished manuscripts under NDA-friendly practice.',
    benefits: ['Voice interviews and samples', 'Strict confidentiality norms', 'Iterative drafts until it sounds like you'],
  }),
  'powerpoint-presentation': makeService({
    slug: 'powerpoint-presentation',
    title: 'PowerPoint Presentation',
    category: 'Career & Content',
    hero: 'Presentations that teach, not overwhelm',
    intro:
      'We design slide narratives with hierarchy, speaker notes, and visuals that support your talk instead of competing with it.',
    benefits: ['Storyboard before slides', 'Clean academic visual language', 'Speaker notes for delivery confidence'],
  }),
  'product-description': makeService({
    slug: 'product-description',
    title: 'Product Description Writing',
    category: 'Career & Content',
    hero: 'Product descriptions that convert without hype fatigue',
    intro:
      'Commerce copy should answer objections quickly. We highlight benefits, specs, and proof points in skimmable blocks.',
    benefits: ['Feature-to-benefit translation', 'SEO-aware titles and bullets', 'Consistent catalog voice'],
  }),
};

export function getServiceBySlug(slug) {
  return servicesContent[slug] || null;
}

export const allServiceEntries = Object.values(servicesContent);
