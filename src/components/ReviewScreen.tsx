'use client';

import React, { useState } from 'react';
import { PracticeSet, Question, UserAnswerMap } from '@/types';
import { AITutorModal } from './AITutorModal';
import { isOptionCorrect, getCorrectOptionText } from '@/utils/answerUtils';
import { Bot, CheckCircle2, XCircle, MinusCircle, Eye, ArrowLeft, Sparkles, Filter } from 'lucide-react';

interface ReviewScreenProps {
  set: PracticeSet;
  userAnswers: UserAnswerMap;
  onNavigateHome: () => void;
  onPracticeAgain: () => void;
  userApiKey?: string;
  textSizeClass: string;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  set,
  userAnswers,
  onNavigateHome,
  onPracticeAgain,
  userApiKey,
  textSizeClass,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'incorrect' | 'correct' | 'skipped'>('all');
  const [selectedQuestionForAI, setSelectedQuestionForAI] = useState<Question | null>(null);

  const filteredQuestions = set.questions.filter((q) => {
    const userAns = userAnswers[q.id];
    const isCorrect = userAns ? isOptionCorrect(userAns, q.correctAnswer, q.options) : false;
    const isSkipped = !userAns;

    if (activeFilter === 'correct') return isCorrect;
    if (activeFilter === 'incorrect') return userAns && !isCorrect;
    if (activeFilter === 'skipped') return isSkipped;
    return true;
  });

  return (
    <div className={`space-y-6 pb-20 ${textSizeClass}`}>
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-md border border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-2 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>హోమ్ కి వెళ్లండి (Back to Home)</span>
          </button>
          <h2 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
            <Eye className="w-7 h-7 text-amber-400" />
            <span>ప్రశ్నల సమాధానాల సమీక్ష (Review Answers)</span>
          </h2>
          <p className="text-emerald-200 text-sm mt-0.5">
            {set.teluguTitle || set.title} — ప్రతి ప్రశ్నకు వివరణ చూడండి
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPracticeAgain}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm rounded-xl shadow"
          >
            మళ్లీ ప్రాక్టీస్ చేయండి
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm">
        <Filter className="w-4 h-4 text-emerald-700 shrink-0 ml-1" />
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            activeFilter === 'all'
              ? 'bg-emerald-800 text-amber-200 shadow'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          అన్ని ప్రశ్నలు ({set.questions.length})
        </button>

        <button
          onClick={() => setActiveFilter('incorrect')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            activeFilter === 'incorrect'
              ? 'bg-rose-700 text-white shadow'
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
          }`}
        >
          ✕ పొరపాట్లు (Wrong)
        </button>

        <button
          onClick={() => setActiveFilter('correct')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            activeFilter === 'correct'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          ✓ సరైనవి (Correct)
        </button>

        <button
          onClick={() => setActiveFilter('skipped')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            activeFilter === 'skipped'
              ? 'bg-amber-500 text-emerald-950 shadow'
              : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
          }`}
        >
          — వదిలేసినవి (Skipped)
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns ? isOptionCorrect(userAns, q.correctAnswer, q.options) : false;
          const isSkipped = !userAns;
          const correctOptionText = getCorrectOptionText(q.correctAnswer, q.options);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-sm space-y-5 transition-all ${
                isCorrect
                  ? 'border-emerald-200'
                  : isSkipped
                  ? 'border-amber-200'
                  : 'border-rose-200'
              }`}
            >
              {/* Question Top Status Pill */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-900 text-amber-300">
                  ప్రశ్న #{idx + 1}
                </span>

                <div>
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ✓ సరైన సమాధానం (Correct)
                    </span>
                  ) : isSkipped ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300">
                      <MinusCircle className="w-4 h-4 text-amber-600" />
                      — వదిలేసారు (Skipped)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold border border-rose-300">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      ✕ పొరపాటు (Incorrect)
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                {q.teluguQuestion && (
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {q.teluguQuestion}
                  </h3>
                )}
                <p className="text-base text-gray-700 font-medium">{q.question}</p>
              </div>

              {/* User Answer vs Correct Answer Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    మీరు ఎంచుకున్న సమాధానం (Your Answer):
                  </p>
                  <p
                    className={`font-bold text-base ${
                      isCorrect
                        ? 'text-emerald-700'
                        : isSkipped
                        ? 'text-amber-700'
                        : 'text-rose-700 underline'
                    }`}
                  >
                    {userAns || '— జవాబు ఇవ్వలేదు (No Answer)'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    సరైన సమాధానం (Correct Answer):
                  </p>
                  <p className="font-bold text-base text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{correctOptionText}</span>
                  </p>
                </div>
              </div>

              {/* Explanation Note */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm space-y-1">
                <p className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                  💡 వివరణ (Explanation):
                </p>
                <p className="text-emerald-900 font-medium leading-relaxed">
                  {q.teluguExplanation || q.explanation}
                </p>
              </div>

              {/* AI Tutor Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedQuestionForAI(q)}
                  className="px-5 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm flex items-center gap-2 shadow transition-all hover:scale-[1.01]"
                >
                  <Bot className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200">🤖 Ask AI Tutor in Telugu (దీనిపై AI వివరణ వినండి)</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Tutor Modal Integration */}
      {selectedQuestionForAI && (
        <AITutorModal
          isOpen={Boolean(selectedQuestionForAI)}
          onClose={() => setSelectedQuestionForAI(null)}
          question={selectedQuestionForAI}
          selectedAnswer={userAnswers[selectedQuestionForAI.id]}
          userApiKey={userApiKey}
        />
      )}
    </div>
  );
};
