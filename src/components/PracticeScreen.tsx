'use client';

import React, { useState, useEffect } from 'react';
import { PracticeSet, Question, UserAnswerMap } from '@/types';
import { AITutorModal } from './AITutorModal';
import { isOptionCorrect, getCorrectOptionText } from '@/utils/answerUtils';
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid,
  Volume2,
  Bookmark,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
  Sparkles,
  X
} from 'lucide-react';

interface PracticeScreenProps {
  set: PracticeSet;
  userAnswers: UserAnswerMap;
  onSelectOption: (questionId: string, option: string) => void;
  onCompletePractice: (timeTakenSeconds: number) => void;
  onNavigateHome: () => void;
  userApiKey?: string;
  textSizeClass: string;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  set,
  userAnswers,
  onSelectOption,
  onCompletePractice,
  onNavigateHome,
  userApiKey,
  textSizeClass,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  
  // Timer State
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Audio Speech state for Question text
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  const currentQuestion: Question = set.questions[currentIndex];
  const selectedOption = userAnswers[currentQuestion.id];
  const hasAnswered = Boolean(selectedOption);
  const userIsCorrect = hasAnswered
    ? isOptionCorrect(selectedOption, currentQuestion.correctAnswer, currentQuestion.options)
    : false;
  const correctOptionText = getCorrectOptionText(currentQuestion.correctAnswer, currentQuestion.options);

  // Timer Tick
  useEffect(() => {
    if (isTimerPaused) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPaused]);

  // Audio Read Question Text out loud in Telugu / English
  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeakingQuestion) {
        window.speechSynthesis.cancel();
        setIsSpeakingQuestion(false);
        return;
      }
      window.speechSynthesis.cancel();
      const textToSpeak = `${currentQuestion.teluguQuestion || currentQuestion.question}. ఆప్షన్లు: ${currentQuestion.options.join(', ')}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'te-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeakingQuestion(false);
      utterance.onerror = () => setIsSpeakingQuestion(false);

      setIsSpeakingQuestion(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < set.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished practice
      onCompletePractice(secondsElapsed);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercentage = Math.round((answeredCount / set.totalQuestions) * 100);

  return (
    <div className={`space-y-6 pb-20 ${textSizeClass}`}>
      {/* Top Header Bar */}
      <div className="bg-emerald-900 text-white rounded-3xl p-4 sm:p-6 shadow-md border border-emerald-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-800 text-amber-300 border border-emerald-700">
              {set.teluguTitle || set.title}
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-amber-100 mt-1">
              ప్రశ్న {currentIndex + 1} / {set.totalQuestions}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer Badge */}
            {showTimer && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-amber-300 font-mono text-sm sm:text-base font-bold shadow-inner">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(secondsElapsed)}</span>
                <button
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="p-1 hover:text-white transition-colors"
                  title={isTimerPaused ? 'టైమర్ ని కొనసాగించండి' : 'టైమర్ ఆపండి (Pause)'}
                >
                  {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                </button>
              </div>
            )}

            {/* Question Grid Jump Drawer Toggle */}
            <button
              onClick={() => setIsGridOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs sm:text-sm font-bold border border-emerald-700 transition-colors"
              title="అన్ని ప్రశ్నల జాబితా (Question Navigation Grid)"
            >
              <Grid className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">అన్ని ప్రశ్నలు</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-emerald-200">
            <span>పూర్తయినవి: {answeredCount} / {set.totalQuestions} ({progressPercentage}%)</span>
            <span>బాకీ ఉన్నవి: {set.totalQuestions - answeredCount}</span>
          </div>
          <div className="w-full h-3 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${(answeredCount / set.totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main MCQ Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-md space-y-6">
        
        {/* Question Control Top Line */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 gap-2">
          <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
            ప్రశ్న {currentIndex + 1}
          </span>

          <div className="flex items-center gap-2">
            {/* Read aloud Voice Button */}
            <button
              onClick={handleSpeakQuestion}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isSpeakingQuestion
                  ? 'bg-amber-400 text-emerald-950 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
              title="ప్రశ్నను తెలుగులో వినండి"
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>{isSpeakingQuestion ? 'చదువుతోంది...' : '🔊 వినండి'}</span>
              <span className="hidden sm:inline">(Listen)</span>
            </button>

            {/* Flag Question */}
            <button
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`p-2 rounded-xl transition-colors ${
                flaggedQuestions[currentQuestion.id]
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-gray-100 text-gray-400 hover:text-amber-600'
              }`}
              title="ఈ ప్రశ్నను గుర్తుగా ఉంచండి (Bookmark)"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2 sm:space-y-3">
          {currentQuestion.teluguQuestion && (
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug">
              {currentQuestion.teluguQuestion}
            </h3>
          )}
          <p className="text-sm sm:text-lg text-emerald-950 font-medium leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isThisOptionCorrect = isOptionCorrect(option, currentQuestion.correctAnswer, currentQuestion.options);
            const isUserSelection = selectedOption === option;

            let cardClasses = 'bg-white border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-gray-800';
            let badgeClasses = 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-900';

            if (hasAnswered) {
              if (isUserSelection && isThisOptionCorrect) {
                // Selected & Correct
                cardClasses = 'bg-emerald-50 border-emerald-500 shadow-md text-emerald-950 ring-2 ring-emerald-400';
                badgeClasses = 'bg-emerald-600 text-white font-black shadow';
              } else if (isUserSelection && !isThisOptionCorrect) {
                // Selected & Incorrect
                cardClasses = 'bg-rose-50 border-rose-500 shadow-md text-rose-950 ring-2 ring-rose-400';
                badgeClasses = 'bg-rose-600 text-white font-black shadow';
              } else if (!isUserSelection && isThisOptionCorrect) {
                // Not selected, but this IS the correct answer
                cardClasses = 'bg-emerald-50/90 border-emerald-400 border-2 border-dashed shadow-sm text-emerald-950';
                badgeClasses = 'bg-emerald-600 text-white font-bold';
              } else {
                // Not selected & incorrect
                cardClasses = 'bg-gray-50/70 border-gray-200 text-gray-400 opacity-60';
                badgeClasses = 'bg-gray-200 text-gray-500';
              }
            }

            return (
              <button
                key={option}
                onClick={() => onSelectOption(currentQuestion.id, option)}
                className={`w-full text-left p-3.5 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 group focus:outline-none focus:ring-4 focus:ring-amber-300 ${cardClasses}`}
              >
                <div className="flex items-start gap-3 flex-1 w-full">
                  {/* Option Letter Indicator */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 transition-colors ${badgeClasses}`}
                  >
                    {letter}
                  </div>

                  <div className="font-semibold text-sm sm:text-lg leading-snug pt-0.5 break-words min-w-0 flex-1">
                    {option}
                  </div>
                </div>

                {/* Status Badges on Right/Bottom side of option when answered */}
                {hasAnswered && (
                  <div className="shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
                    {isUserSelection && isThisOptionCorrect && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ సరైనవి</span>
                      </span>
                    )}

                    {isUserSelection && !isThisOptionCorrect && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-600 text-white text-xs font-black shadow">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>✕ తప్పు</span>
                      </span>
                    )}

                    {!isUserSelection && isThisOptionCorrect && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>సరైన సమాధానం ఇది</span>
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Callout Box */}
        {hasAnswered && (
          <div
            className={`p-4 sm:p-6 rounded-3xl border-2 transition-all space-y-3 sm:space-y-4 shadow-md ${
              userIsCorrect
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950'
                : 'bg-gradient-to-br from-rose-50 to-amber-50/40 border-rose-300 text-rose-950'
            }`}
          >
            {/* Header Status */}
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                {userIsCorrect ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow shrink-0">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black shadow shrink-0">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                )}

                <div>
                  <h4 className="text-base sm:text-xl font-extrabold">
                    {userIsCorrect ? '🎉 శభాష్! సరైన సమాధానం!' : '❌ అయ్యో! పొరపాటు జరిగింది'}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold opacity-90">
                    {userIsCorrect
                      ? 'మీరు సరైన ఆప్షన్ ని ఎంచుకున్నారు.'
                      : 'క్రింద సరైన జవాబు మరియు వివరణ చూడండి.'}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-black px-2.5 py-1 rounded-full border shadow-sm shrink-0 ${
                  userIsCorrect
                    ? 'bg-emerald-200 text-emerald-950 border-emerald-300'
                    : 'bg-rose-200 text-rose-950 border-rose-300'
                }`}
              >
                {userIsCorrect ? '✓ +1 మార్కు' : '✕ తప్పు'}
              </span>
            </div>

            {/* Display Right Answer if user was wrong */}
            {!userIsCorrect && (
              <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border-2 border-emerald-400 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-black shrink-0 uppercase tracking-wider">
                  సరైన సమాధానం:
                </div>
                <div className="font-extrabold text-gray-900 text-sm sm:text-lg flex-1 break-words">
                  {correctOptionText}
                </div>
              </div>
            )}

            {/* Detailed Telugu Explanation */}
            <div className="space-y-2 bg-white/90 p-3.5 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-xs sm:text-base">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 shrink-0" />
                <span>వివరణ (Explanation):</span>
              </div>
              <p className="text-sm sm:text-lg text-gray-800 leading-relaxed font-medium whitespace-pre-line break-words">
                {currentQuestion.teluguExplanation ||
                  currentQuestion.explanation ||
                  'ఈ ప్రశ్నకు వివరమైన వివరణ ఉచితంగా పొందడానికి క్రింది AI ట్యూటర్ ని ఉపయోగించండి.'}
              </p>
            </div>
          </div>
        )}

        {/* Prominent AI Tutor Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsAIOpen(true)}
            className="w-full py-3.5 sm:py-4 px-4 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white rounded-2xl shadow-lg border border-emerald-700 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg font-bold hover:scale-[1.01] transition-all group focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow group-hover:rotate-12 transition-transform shrink-0">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-amber-200">🤖 Ask AI Tutor in Telugu</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
          </button>
        </div>
      </div>

      {/* Bottom Sticky Navigation Bar for Mobile & Desktop */}
      <div className="sticky sm:relative bottom-0 left-0 right-0 bg-emerald-950/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-3 sm:p-0 border-t sm:border-t-0 border-emerald-800/80 z-30 flex items-center justify-between gap-3 shadow-lg sm:shadow-none rounded-t-2xl sm:rounded-none">
        <button
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-emerald-950 font-extrabold text-sm sm:text-base border-2 border-emerald-200 shadow-sm transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>మునుపటి</span>
          <span className="hidden sm:inline">(Previous)</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 sm:flex-none px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-1.5"
        >
          <span>{currentIndex === set.questions.length - 1 ? 'ముగించు' : 'తరువాతి'}</span>
          <span className="hidden sm:inline">{currentIndex === set.questions.length - 1 ? '(Complete)' : '(Next)'}</span>
          <ChevronRight className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* Question Grid Modal/Drawer */}
      {isGridOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-700" />
                <span>ప్రశ్నల జాబితా (Question Navigation)</span>
              </h3>
              <button
                onClick={() => setIsGridOpen(false)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold text-gray-600 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> సరైనవి ({
                  Object.entries(userAnswers).filter(([qid, ans]) => {
                    const q = set.questions.find((quest) => quest.id === qid);
                    return q && isOptionCorrect(ans, q.correctAnswer, q.options);
                  }).length
                })
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" /> పొరపాట్లు ({
                  Object.entries(userAnswers).filter(([qid, ans]) => {
                    const q = set.questions.find((quest) => quest.id === qid);
                    return q && !isOptionCorrect(ans, q.correctAnswer, q.options);
                  }).length
                })
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" /> మిగిలినవి ({set.totalQuestions - answeredCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> గుర్తుపెట్టినవి
              </span>
            </div>

            {/* Question Buttons Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 gap-3 p-1">
              {set.questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isAnswered = Boolean(userAns);
                const isCorrect = isAnswered && isOptionCorrect(userAns, q.correctAnswer, q.options);
                const isCurrent = idx === currentIndex;
                const isFlagged = Boolean(flaggedQuestions[q.id]);

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsGridOpen(false);
                    }}
                    className={`h-11 rounded-xl font-extrabold text-sm flex items-center justify-center transition-all border-2 relative ${
                      isCurrent
                        ? 'ring-4 ring-amber-400 border-emerald-800 font-black scale-105 z-10'
                        : ''
                    } ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-rose-600 text-white border-rose-700'
                        : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-emerald-100'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsGridOpen(false)}
              className="w-full py-3 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900"
            >
              తిరిగి రండి (Close)
            </button>
          </div>
        </div>
      )}

      {/* AI Tutor Drawer Component */}
      <AITutorModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        question={currentQuestion}
        selectedAnswer={selectedOption}
        userApiKey={userApiKey}
      />
    </div>
  );
};

