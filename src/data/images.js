/** Curated photography from /public/images — scene photos kept intact (no bg removal). */
export const img = {
  // Hero & atmosphere
  hero: '/images/student-academic-desk.jpeg',
  heroAlt: 'Student writing at an academic desk with textbook and laptop',
  heroSecondary: '/images/student-academic-desk-2.jpeg',

  // Workspaces / still life
  workspace: '/images/workspace-laptop.jpeg',
  workspace2: '/images/workspace-laptop-2.jpeg',
  woodDesk: '/images/research-wood-desk.jpeg',
  bookLaptop: '/images/book-laptop.jpeg',
  organized: '/images/organized-paper.jpeg',
  planning: '/images/planning-workflow.jpeg',
  cleanDesk: '/images/student-clean-desk.jpeg',

  // People — students
  studentLaptop: '/images/student-laptop.jpeg',
  studentWriting: '/images/student-writing.jpeg',
  studentReading: '/images/student-reading.jpeg',
  studentReading2: '/images/student-reading-2.jpeg',
  studentPlanning: '/images/student-planning.jpeg',
  studentPlanning2: '/images/student-planning-2.jpeg',
  studentPhone: '/images/student-phone.jpeg',
  studentPhone2: '/images/student-phone-2.jpeg',
  studentRelaxing: '/images/student-relaxing.jpeg',
  studentRelaxing2: '/images/student-relaxing-2.jpeg',
  studentCloses: '/images/student-closes-laptop.jpeg',
  studentCloses2: '/images/student-closes-laptop-2.jpeg',
  studentDesk3: '/images/student-academic-desk-3.jpeg',
  library: '/images/students-library.jpeg',
  library2: '/images/students-library-2.jpeg',

  // People — consultants / editors / professionals
  consultantDesk: '/images/consultant-desk.jpeg',
  consultantSitting: '/images/consultant-sitting.jpeg',
  consultantOnline: '/images/consultant-online.jpeg',
  consultantOnline2: '/images/consultant-online-2.jpeg',
  studentConsulting: '/images/student-consulting.jpeg',
  studentConsulting2: '/images/student-consulting-2.jpeg',
  editorDocs: '/images/editor-documents.jpeg',
  editorDocs2: '/images/editor-documents-2.jpeg',
  editorManuscript: '/images/editor-manuscript.jpeg',
  editorManuscript2: '/images/editor-manuscript-2.jpeg',
  adultsReviewing: '/images/adults-reviewing-desk.jpeg',
  twoAdults: '/images/two-adults-reviewing.jpeg',
  resumeReview: '/images/resume-review.jpeg',
  resumeReview2: '/images/resume-review-2.jpeg',
  officeDesk: '/images/office-desk.jpeg',
  officeDesk2: '/images/office-desk-2.jpeg',
  researcher: '/images/researcher-desk.jpeg',
  researcher2: '/images/researcher-desk-2.jpeg',
  researcherAnalyzing: '/images/researcher-analyzing.jpeg',
  researcherAnalyzing2: '/images/researcher-analyzing-2.jpeg',
  writers: '/images/writers-conference.jpeg',
  writers2: '/images/writers-conference-2.jpeg',

  // Product / order
  orderLaptop: '/images/order-form-laptop.jpeg',
  orderLaptop2: '/images/order-form-laptop-2.jpeg',
}

/** Home services strip — one photo per featured service */
export const servicePhotos = [
  { src: img.studentWriting, alt: 'Student drafting an essay on a laptop' },
  { src: img.researcherAnalyzing, alt: 'Researcher analyzing academic materials' },
  { src: img.editorManuscript, alt: 'Editor reviewing a printed manuscript' },
  { src: img.researcher, alt: 'Researcher working through a thesis draft' },
  { src: img.adultsReviewing, alt: 'Specialists reviewing a case study document' },
  { src: img.resumeReview, alt: 'Professional polishing career writing' },
]

/** How-it-works visual sequence */
export const processPhotos = [
  { src: img.planning, alt: 'Brief and requirements laid out on paper' },
  { src: img.studentConsulting, alt: 'Student matched with an academic specialist' },
  { src: img.editorDocs, alt: 'Writer drafting and revising documents' },
  { src: img.studentCloses, alt: 'Student receiving a finished draft' },
]

/** Why-choose mosaic */
export const whyPhotos = [
  img.consultantDesk,
  img.editorManuscript2,
  img.writers,
  img.twoAdults,
  img.consultantOnline,
]

/** Writer / team portraits & scenes */
export const writerPhotos = [
  img.writers2,
  img.consultantSitting,
  img.officeDesk,
  img.researcher2,
  img.editorDocs2,
  img.consultantOnline2,
]

/** Gallery for trust / atmosphere bands */
export const atmosphereStrip = [
  img.woodDesk,
  img.bookLaptop,
  img.organized,
  img.workspace,
  img.cleanDesk,
  img.studentReading2,
]
