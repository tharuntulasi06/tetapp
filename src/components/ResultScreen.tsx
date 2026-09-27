'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PracticeSet, UserAnswerMap } from '@/types';
import { isOptionCorrect } from '@/utils/answerUtils';
import { Trophy, CheckCircle2, XCircle, MinusCircle, Clock, RotateCcw, Home, Eye, Sparkles } from 'lucide-react';

interface ResultScreenProps {
  set: PracticeSet;
  userAnswers: UserAnswerMap;
  timeTakenSeconds: number;
  onReviewAnswers: () => void;
  onPracticeAgain: () => void;
  onNavigateHome: () => void;
  textSizeClass: string;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  set,
  userAnswers,
  timeTakenSeconds,
  onReviewAnswers,
  onPracticeAgain,
  onNavigateHome,
  textSizeClass,
}) => {
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  set.questions.forEach((q) => {
    const userAns = userAnswers[q.id];
    if (!userAns) {
      skippedCount++;
    } else if (isOptionCorrect(userAns, q.correctAnswer, q.options)) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = set.totalQuestions;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    // Trigger celebratory confetti if score is >= 50%
    if (percentage >= 50) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins} నిమిషాల ${remainingSecs} సెకన్లు`;
  };

  return (
    <div className={`space-y-8 pb-12 ${textSizeClass}`}>
      {/* Celebration Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800 text-center space-y-4 relative overflow-hidden">
        
        <div className="inline-flex p-4 bg-amber-400 text-emerald-950 rounded-3xl shadow-lg ring-8 ring-amber-400/20">
          <Trophy className="w-12 h-12" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-amber-100">
          ప్రాక్టీస్ పూర్తయింది! (Practice Completed)
        </h2>

        <p className="text-emerald-200 text-lg font-medium">
          {set.teluguTitle || set.title}
        </p>

        {/* Big Percentage Badge */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <div className="bg-emerald-950/80 border-2 border-amber-400 px-8 py-5 rounded-3xl shadow-inner text-center">
            <span className="text-4xl sm:text-6xl font-black text-amber-300">{percentage}%</span>
            <p className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider mt-1">
              శాతం (Percentage Score)
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black text-emerald-800">{correctCount}</p>
          <p className="text-xs font-bold text-gray-600">✓ సరైనవి (Correct)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <XCircle className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black text-rose-700">{wrongCount}</p>
          <p className="text-xs font-bold text-gray-600">✕ పొరపాట్లు (Wrong)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <MinusCircle className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black text-amber-800">{skippedCount}</p>
          <p className="text-xs font-bold text-gray-600">— వదిలేసినవి (Skipped)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-lg font-extrabold text-teal-900 leading-tight pt-1">
            {formatTime(timeTakenSeconds)}
          </p>
          <p className="text-xs font-bold text-gray-600">తీసుకున్న సమయం</p>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onReviewAnswers}
          className="w-full sm:w-auto px-7 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] focus:ring-4 focus:ring-amber-300"
        >
          <Eye className="w-6 h-6" />
          <span>సమాధానాలు చూడండి [Review Answers]</span>
        </button>

        <button
          onClick={onPracticeAgain}
          className="w-full sm:w-auto px-6 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base rounded-2xl shadow transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>మళ్లీ సాధన చేయండి [Practice Again]</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-100 text-emerald-950 font-bold text-base border-2 border-emerald-200 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>హోమ్ కు వెళ్ళండి [Home]</span>
        </button>
      </div>
    </div>
  );
};
