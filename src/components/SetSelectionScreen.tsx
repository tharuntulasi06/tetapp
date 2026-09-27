'use client';

import React, { useState } from 'react';
import { PracticeSet } from '@/types';
import { BookOpen, Clock, Play, Search, Filter, Sparkles } from 'lucide-react';

interface SetSelectionScreenProps {
  practiceSets: PracticeSet[];
  onSelectSet: (set: PracticeSet) => void;
  textSizeClass: string;
}

export const SetSelectionScreen: React.FC<SetSelectionScreenProps> = ({
  practiceSets,
  onSelectSet,
  textSizeClass,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(practiceSets.map((s) => s.category)))];

  const filteredSets = practiceSets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (set.teluguTitle && set.teluguTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || set.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`space-y-6 pb-12 ${textSizeClass}`}>
      {/* Header Title */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <span>ప్రాక్టీస్ పేపర్లు ఎంచుకోండి (Select Practice Set)</span>
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base mt-1">
            మీకు కావలసిన క్వశ్చన్ పేపర్ ని ఎంచుకొని ప్రాక్టీస్ ప్రారంభించండి.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="పేపర్ పేరు లేదా సబ్జెక్ట్ వెతకండి (Search papers...)"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base text-gray-900"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-emerald-700 hidden sm:block shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-amber-200 shadow'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {cat === 'All' ? 'అన్నీ (All)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Practice Sets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSets.map((set) => (
          <div
            key={set.id}
            className="bg-white rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {set.category}
                </span>
                {set.badge && (
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {set.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                  {set.teluguTitle || set.title}
                </h3>
                <p className="text-sm font-medium text-emerald-700 mt-0.5">{set.title}</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{set.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-gray-600">
                <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  {set.totalQuestions} ప్రశ్నలు (Questions)
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <Clock className="w-4 h-4 text-amber-600" />
                  సుమారు ~{set.estimatedTimeMinutes} నిమిషాలు
                </span>
              </div>

              <button
                onClick={() => onSelectSet(set)}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-base rounded-2xl shadow hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>ప్రాక్టీస్ ప్రారంభించు</span>
              </button>
            </div>
          </div>
        ))}

        {filteredSets.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-2xl text-center space-y-3 border border-emerald-100">
            <p className="text-lg font-bold text-gray-700">ఏ పేపర్లు కనుగొనబడలేదు</p>
            <p className="text-sm text-gray-500">దయచేసి మీ సెర్చ్ పదాన్ని లేదా ఫిల్టర్ ని మార్చండి.</p>
          </div>
        )}
      </div>
    </div>
  );
};
