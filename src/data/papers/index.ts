import { PracticeSet, Question } from '@/types';
import cdpRaw from './paper_cdp.json';
import englishRaw from './paper_english.json';
import evsRaw from './paper_evs.json';
import mathsRaw from './paper_maths.json';
import teluguRaw from './paper_telugu.json';

const cdpQuestions = cdpRaw as Question[];
const englishQuestions = englishRaw as Question[];
const evsQuestions = evsRaw as Question[];
const mathsQuestions = mathsRaw as Question[];
const teluguQuestions = teluguRaw as Question[];

export const OFFICIAL_TET_PRACTICE_SETS: PracticeSet[] = [
  // 1. Full 150 Question Grand Mock Test
  {
    id: 'tet-grand-mock-1',
    title: 'TET Paper 1A — Grand Mock Test (150 Questions)',
    teluguTitle: 'TET 1A — గ్రాండ్ మాక్ టెస్ట్ (150 ప్రశ్నలు)',
    description: 'Complete 150 Question Mock Exam covering CDP (30), Telugu (30), English (30), Maths (30), EVS (30) with official answer keys.',
    category: 'Full Mock Test',
    totalQuestions: 150,
    estimatedTimeMinutes: 150,
    badge: '150 Questions',
    questions: [
      ...cdpQuestions.slice(0, 30),
      ...teluguQuestions.slice(0, 30),
      ...englishQuestions.slice(0, 30),
      ...mathsQuestions.slice(0, 30),
      ...evsQuestions.slice(0, 30),
    ]
  },
  // 2. Child Development & Pedagogy (CDP)
  {
    id: 'tet-cdp-full',
    title: 'Child Development & Pedagogy (CDP) — Question Bank',
    teluguTitle: 'శిశు వికాసం & బోధనా శాస్త్రం (CDP) — 630 ప్రశ్నలు',
    description: 'Complete 630 official practice questions for Child Development and Pedagogy (CDP 1A).',
    category: 'CDP',
    totalQuestions: cdpQuestions.length,
    estimatedTimeMinutes: 120,
    badge: '630 Questions',
    questions: cdpQuestions,
  },
  // 3. Telugu Language
  {
    id: 'tet-telugu-full',
    title: 'Telugu Language (Content & Pedagogy) — Question Bank',
    teluguTitle: 'తెలుగు భాష (Telugu 1A) — 629 ప్రశ్నలు',
    description: 'Complete 629 official practice questions for Telugu grammar, comprehension, poetry & pedagogy.',
    category: 'Telugu',
    totalQuestions: teluguQuestions.length,
    estimatedTimeMinutes: 120,
    badge: '629 Questions',
    questions: teluguQuestions,
  },
  // 4. English Language
  {
    id: 'tet-english-full',
    title: 'English Language (Content & Methodology) — Question Bank',
    teluguTitle: 'ఇంగ్లీష్ భాష (English 1A) — 563 ప్రశ్నలు',
    description: 'Complete 563 official practice questions for English grammar, vocabulary, synonyms & methodology.',
    category: 'English',
    totalQuestions: englishQuestions.length,
    estimatedTimeMinutes: 120,
    badge: '563 Questions',
    questions: englishQuestions,
  },
  // 5. Mathematics
  {
    id: 'tet-maths-full',
    title: 'Mathematics (1A) — Question Bank',
    teluguTitle: 'గణిత శాస్త్రం (Maths 1A) — 630 ప్రశ్నలు',
    description: 'Complete 630 official practice questions covering numbers, geometry, algebra, arithmetic & pedagogy.',
    category: 'Mathematics',
    totalQuestions: mathsQuestions.length,
    estimatedTimeMinutes: 120,
    badge: '630 Questions',
    questions: mathsQuestions,
  },
  // 6. Environmental Studies (EVS)
  {
    id: 'tet-evs-full',
    title: 'Environmental Studies (EVS) — Question Bank',
    teluguTitle: 'పరిసరాల విజ్ఞానం (EVS 1A) — 632 ప్రశ్నలు',
    description: 'Complete 632 official practice questions for plants, animals, science, geography & environment.',
    category: 'EVS',
    totalQuestions: evsQuestions.length,
    estimatedTimeMinutes: 120,
    badge: '632 Questions',
    questions: evsQuestions,
  },
];
