export const WORDS_PER_PAGE = 250

export const paperTypes = [
  'Essay',
  'Book Report',
  'Research Paper',
  'Term Paper',
  'Thesis',
  'Dissertation',
  'Course Work',
  'Thesis Proposal',
  'Research Proposal',
  'Dissertation Proposal',
  'Assignment',
  'Other',
];

export const academicLevels = [
  { id: 1, label: 'Undergraduate' },
  { id: 2, label: 'Master' },
  { id: 3, label: 'PhD' },
];

export const deadlines = [
  { id: 1, label: '15 Days' },
  { id: 2, label: '10 Days' },
  { id: 3, label: '7 Days' },
  { id: 4, label: '6 Days' },
  { id: 5, label: '5 Days' },
  { id: 6, label: '4 Days' },
  { id: 7, label: '3 Days' },
  { id: 8, label: '48 Hours' },
  { id: 9, label: '24 Hours' },
  { id: 10, label: '12 Hours' },
  { id: 11, label: '6 Hours' },
];

export const pageOptions = Array.from({ length: 200 }, (_, i) => {
  const pages = i + 1
  const words = pages * WORDS_PER_PAGE
  return {
    value: pages,
    words,
    label: `${words.toLocaleString()} words · ${pages} page${pages > 1 ? 's' : ''}`,
  }
})

/** Word-first length presets for the calculator */
export const wordPresets = [
  500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3750, 5000, 6250, 7500, 10000, 12500, 15000,
]

export const wordOptions = [
  ...wordPresets.map((words) => ({
    value: words,
    pages: words / WORDS_PER_PAGE,
    label: `${words.toLocaleString()} words · ${words / WORDS_PER_PAGE} page${words > WORDS_PER_PAGE ? 's' : ''}`,
  })),
  ...pageOptions
    .filter((p) => !wordPresets.includes(p.words) && p.words <= 20000)
    .map((p) => ({
      value: p.words,
      pages: p.value,
      label: p.label,
    })),
]

export const referenceStyles = ['APA', 'MLA', 'Chicago', 'Turabian', 'Harvard', 'Oxford', 'Vancouver', 'CBE', 'Other'];

export const subjectGroups = [
  {
    label: 'Art',
    options: ['Architecture', 'Dance', 'Design Analysis', 'Drama', 'Movies', 'Music', 'Paintings', 'Theatre'],
  },
  {
    label: 'Science',
    options: ['Biology', 'Chemistry', 'Physics', 'Astronomy', 'Geology', 'Environmental Issues'],
  },
  {
    label: 'Business',
    options: [
      'Economics',
      'Accounting',
      'Case Study',
      'Company Analysis',
      'E-Commerce',
      'Finance',
      'Logistics',
      'Trade',
      'Management',
      'Marketing',
    ],
  },
  {
    label: 'Social Sciences',
    options: ['Psychology', 'Sociology', 'Political Science', 'Philosophy', 'Religion and Theology', 'Anthropology', 'Geography'],
  },
  {
    label: 'Humanities',
    options: [
      'English',
      'Ethics',
      'History',
      'Law',
      'Criminology',
      'Legal Issues',
      'Linguistics',
      'Literature',
      'American Literature',
      'English Literature',
    ],
  },
  {
    label: 'Technology',
    options: ['Computer Science', 'Internet', 'IT Management', 'Web Design', 'Aeronautics', 'Aviation'],
  },
  {
    label: 'Health',
    options: ['Medicine and Health', 'Alternative Medicine', 'Healthcare', 'Nursing', 'Nutrition', 'Pharmacology', 'Sport'],
  },
  {
    label: 'Education',
    options: ['Application Essay', 'Education Theories', 'Pedagogy', "Teacher's Career"],
  },
  {
    label: 'Other',
    options: ['Creative Writing', 'Tourism', 'Agriculture', 'Mathematics', 'Communication and Media', 'Other'],
  },
];

export const countryList = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain',
  'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt', 'Finland',
  'France', 'Germany', 'Greece', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait', 'Malaysia', 'Mexico',
  'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Other',
];
