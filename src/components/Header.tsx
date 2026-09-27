'use client';

import React from 'react';
import { BookOpen, Key, Type, Home, Award } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  onNavigateHome: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onToggleTextSize: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigateHome,
  textSize,
  onToggleTextSize,
  onOpenApiKeyModal,
  hasCustomKey,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-lg p-0.5 text-left shrink"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-lg sm:text-xl shadow-inner group-hover:scale-105 transition-transform shrink-0">
            అ
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm sm:text-xl leading-tight text-amber-100 flex items-center gap-1.5 flex-wrap">
              <span className="truncate">అమ్మ డిజిటల్ గురువు</span>
              <span className="text-[10px] sm:text-xs bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded-full font-extrabold uppercase shrink-0">MCQ</span>
            </h1>
            <p className="text-[11px] text-emerald-200 hidden sm:block truncate">Exam Practice with Simple Telugu AI Tutor</p>
          </div>
        </button>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Text Size Switcher */}
          <button
            onClick={onToggleTextSize}
            title="అక్షరాల సైజు మార్చు (Toggle Font Size)"
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-700 text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-amber-300"
          >
            <Type className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Size:</span>
            <span className="font-bold uppercase text-amber-300">{textSize.charAt(0)}</span>
          </button>

          {/* Gemini API Key Setting */}
          <button
            onClick={onOpenApiKeyModal}
            title="Gemini AI Key సెట్టింగ్స్"
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors focus:ring-2 focus:ring-amber-300 ${
              hasCustomKey
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                : 'bg-emerald-800 text-emerald-200 border-emerald-700 hover:bg-emerald-700'
            }`}
          >
            <Key className={`w-3.5 h-3.5 ${hasCustomKey ? 'text-amber-400' : 'text-emerald-300'}`} />
            <span className="hidden md:inline">{hasCustomKey ? 'Custom Key' : 'AI Key'}</span>
            <span className="md:hidden text-[11px]">Key</span>
          </button>

          {/* Home button if not on home */}
          {currentScreen !== 'home' && (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow transition-colors focus:ring-2 focus:ring-amber-300"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">హోమ్</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
