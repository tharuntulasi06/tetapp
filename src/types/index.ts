export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string; // Matched option string or option text
  explanation: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  teluguQuestion?: string;
  teluguExplanation?: string;
  teluguOptions?: string[];
}

export interface PracticeSet {
  id: string;
  title: string;
  teluguTitle?: string;
  description: string;
  category: string;
  questions: Question[];
  totalQuestions: number;
  estimatedTimeMinutes: number;
  badge?: string;
}

export interface UserAnswerMap {
  [questionId: string]: string; // questionId -> selectedOption
}

export interface AttemptRecord {
  id: string;
  setId: string;
  setTitle: string;
  date: string; // ISO string
  totalQuestions: number;
  score: number;
  percentage: number;
  timeTakenSeconds: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  answers: UserAnswerMap;
  flaggedQuestionIds?: string[];
}

export type AITutorHelpType = 'hint' | 'concept' | 'options_analysis' | 'answer' | 'custom';

export interface AITutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  helpType?: AITutorHelpType;
  timestamp: number;
}

export interface AITutorRequest {
  question: Question;
  selectedAnswer?: string;
  helpType: AITutorHelpType;
  customPrompt?: string;
  language?: 'telugu' | 'english' | 'mixed';
  history?: { role: string; content: string }[];
  apiKey?: string;
}
