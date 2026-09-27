'use client';

import React from 'react';
import { PracticeSet, AttemptRecord } from '@/types';
import { Play, Sparkles, BookOpen, Clock, Trophy, ArrowRight, RotateCcw, CheckCircle2, Bot } from 'lucide-react';

interface HomeScreenProps {
  practiceSets: PracticeSet[];
  attempts: AttemptRecord[];
  onSelectSet: (set: PracticeSet) => void;
  onNavigateToSets: () => void;
  onReviewAttempt: (attempt: AttemptRecord) => void;
  onOpenImporter: () => void;
  textSizeClass: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  practiceSets,
  attempts,
  onSelectSet,
  onNavigateToSets,
  onReviewAttempt,
  onOpenImporter,
  textSizeClass,
}) => {
  const latestAttempt = attempts.length > 0 ? attempts[0] : null;

  return (
    <div className={`space-y-8 pb-12 ${textSizeClass}`}>
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs sm:text-sm font-semibold">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>తెలుగులో AI ట్యూటర్ తో పరీక్ష సాధన</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-50 leading-tight">
            నమస్తే! MCQ ప్రశ్నలను సులభంగా సాధన చేయండి
          </h2>

          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
            ప్రతి ప్రశ్నకు మీకు సహాయం చేయడానికి **తెలుగు AI ట్యూటర్** సిద్ధంగా ఉన్నారు.
            జవాబు తెలియకపోయినా, సందేహం ఉన్నా ట్యూటర్ ని హింట్ లేదా వివరణ అడగవచ్చు!
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToSets}
              className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>ప్రాక్టీస్ ప్రారంభించండి (Start Practice)</span>
            </button>

            <button
              onClick={onOpenImporter}
              className="px-5 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-sm sm:text-base rounded-2xl border border-emerald-600 transition-colors flex items-center gap-2"
            >
              <span>+ కొత్త ప్రశ్నలు జోడించండి</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Summary Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-600 tracking-wide">మొత్తం పేపర్లు (Practice Papers)</p>
            <p className="text-2xl font-bold text-gray-900">{practiceSets.length} పేపర్లు</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-amber-600 tracking-wide">మొత్తం ప్రశ్నలు (Total Questions)</p>
            <p className="text-2xl font-bold text-gray-900">
              {practiceSets.reduce((sum, s) => sum + s.totalQuestions, 0)}+ ప్రశ్నలు
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-teal-600 tracking-wide">మొత్తం ప్రయత్నాలు (Attempts)</p>
            <p className="text-2xl font-bold text-gray-900">{attempts.length} సార్లు</p>
          </div>
        </div>
      </section>

      {/* Previous Attempt Summary Card (if any) */}
      {latestAttempt && (
        <section className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-200/80 rounded-xl text-amber-900 font-bold">
                <RotateCcw className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-lg text-amber-950">చివరి ప్రయత్న వివరాలు (Previous Attempt)</h3>
                <p className="text-xs text-amber-800 font-medium">
                  {latestAttempt.setTitle} • {new Date(latestAttempt.date).toLocaleDateString('te-IN')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-2xl font-black text-emerald-700">{latestAttempt.percentage}%</p>
                <p className="text-xs font-semibold text-gray-600">
                  {latestAttempt.score} / {latestAttempt.totalQuestions} మార్కులు
                </p>
              </div>
              <button
                onClick={() => onReviewAttempt(latestAttempt)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-colors shadow"
              >
                సమాధానాలు చూడండి (Review)
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Practice Sets Quick Picks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <span>ప్రాక్టీస్ సెట్‌లు (Available Practice Papers)</span>
          </h3>
          <button
            onClick={onNavigateToSets}
            className="text-emerald-700 hover:text-emerald-900 font-bold text-sm flex items-center gap-1"
          >
            <span>అన్నీ చూడండి</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {practiceSets.map((set) => (
            <div
              key={set.id}
              className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {set.category}
                  </span>
                  {set.badge && (
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {set.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                  {set.teluguTitle || set.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">{set.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    {set.totalQuestions} ప్రశ్నలు
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    ~{set.estimatedTimeMinutes} నిమిషాలు
                  </span>
                </div>

                <button
                  onClick={() => onSelectSet(set)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow group-hover:scale-105 transition-all"
                >
                  ప్రారంభించు
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
