export const blogPosts = [
  {
    slug: 'how-to-structure-a-research-argument',
    title: 'How to Structure a Research Argument Without Losing the Reader',
    date: '2025-11-12',
    readTime: '6 min read',
    category: 'Writing Craft',
    author: 'Assignment Solution Editorial',
    excerpt:
      'A practical framework for moving from topic interest to a defensible claim, evidence ladder, and closing implication.',
    content: [
      'Many students begin with a topic and never arrive at an argument. The difference is simple: a topic names a field, while an argument stakes a claim others can disagree with.',
      'Start by writing a one-sentence claim. Next, list three reasons that claim holds. Under each reason, attach the strongest source you already know. This becomes your evidence ladder.',
      'In the draft, open with context only long enough to make the claim feel necessary. Body paragraphs should open with a reason, present evidence, and explain why the evidence matters for the claim — not for the author’s feelings.',
      'Close by stating what changes if your claim is accepted. A good conclusion is a consequence, not a summary parade.',
    ],
  },
  {
    slug: 'time-management-for-thesis-season',
    title: 'Time Management for Thesis Season: A Calm Two-Week Cadence',
    date: '2026-02-03',
    readTime: '5 min read',
    category: 'Productivity',
    author: 'Assignment Solution Editorial',
    excerpt:
      'Protect deep work, schedule feedback loops, and keep revisions from swallowing your calendar during thesis season.',
    content: [
      'Thesis season fails when everything feels equally urgent. Separate creation days from response days. On creation days you draft; on response days you answer supervisor comments and clean citations.',
      'Use ninety-minute blocks with a single chapter goal. Ending a block mid-sentence can be useful — it lowers restart friction the next morning.',
      'Build a revision backlog instead of editing while drafting. Capture issues in a list, then batch similar fixes (headings, references, figure captions) so attention stays focused.',
      'If you work with Assignment Solution, share your cadence. Matching writer updates to your review windows keeps the project moving without weekend panic.',
    ],
  },
  {
    slug: 'citation-styles-explained',
    title: 'APA, MLA, Harvard, Chicago: Choosing and Using Citation Styles',
    date: '2026-04-18',
    readTime: '7 min read',
    category: 'Referencing',
    author: 'Assignment Solution Editorial',
    excerpt:
      'A quick, student-friendly comparison of the major citation styles and how to stay consistent across a long paper.',
    content: [
      'Citation styles are not arbitrary — each reflects the conventions of a discipline. APA favours the social sciences with author–date emphasis; MLA suits the humanities with author–page references; Harvard is a flexible author–date family; Chicago offers both notes and author–date systems.',
      'The single biggest source of lost marks is inconsistency, not choosing the "wrong" style. Pick the style your department requires, then keep one reference manager or one master list so every entry follows the same pattern.',
      'Build your reference list as you write, not at the end. Every time you cite a source in the body, add its full entry immediately. This avoids the frantic final-night reconstruction that introduces errors.',
      'When in doubt, mirror a published example from a journal in your field. Editors and markers recognise the shape of a correctly formatted reference even before they read it closely.',
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}
