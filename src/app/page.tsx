'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HomeScreen } from '@/components/HomeScreen';
import { SetSelectionScreen } from '@/components/SetSelectionScreen';
import { PracticeScreen } from '@/components/PracticeScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { ReviewScreen } from '@/components/ReviewScreen';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { QuestionImporterModal } from '@/components/QuestionImporterModal';
import { OFFICIAL_TET_PRACTICE_SETS } from '@/data/papers';
import { PracticeSet, UserAnswerMap, AttemptRecord } from '@/types';
import { isOptionCorrect } from '@/utils/answerUtils';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'sets' | 'practice' | 'result' | 'review'>('home');
  const [practiceSets, setPracticeSets] = useState<PracticeSet[]>(OFFICIAL_TET_PRACTICE_SETS);
  const [activeSet, setActiveSet] = useState<PracticeSet | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswerMap>({});
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<AttemptRecord | null>(null);
  const [lastTimeTaken, setLastTimeTaken] = useState<number>(0);

  // Settings
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('amma_mcq_gemini_key');
      if (savedKey) setUserApiKey(savedKey);

      const savedAttempts = localStorage.getItem('amma_mcq_attempts');
      if (savedAttempts) setAttempts(JSON.parse(savedAttempts));

      const savedCustomSets = localStorage.getItem('amma_mcq_custom_sets');
      if (savedCustomSets) {
        const customSets: PracticeSet[] = JSON.parse(savedCustomSets);
        setPracticeSets((prev) => [...prev, ...customSets]);
      }

      const savedTextSize = localStorage.getItem('amma_mcq_text_size');
      if (savedTextSize === 'normal' || savedTextSize === 'large' || savedTextSize === 'xlarge') {
        setTextSize(savedTextSize);
      }
    } catch (e) {
      console.warn('Failed to read from localStorage:', e);
    }
  }, []);

  // Browser & Mobile Hardware Back Button Listener
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.history.state) {
      window.history.replaceState({ screen: 'home' }, '', '#home');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        // Return to home screen when back button is pressed
        setCurrentScreen('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToScreen = (screen: 'home' | 'sets' | 'practice' | 'result' | 'review', pushHistory = true) => {
    setCurrentScreen(screen);
    if (pushHistory && typeof window !== 'undefined') {
      window.history.pushState({ screen }, '', `#${screen}`);
    }
  };

  const handleToggleTextSize = () => {
    const nextSize = textSize === 'normal' ? 'large' : textSize === 'large' ? 'xlarge' : 'normal';
    setTextSize(nextSize);
    localStorage.setItem('amma_mcq_text_size', nextSize);
  };

  const handleSaveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('amma_mcq_gemini_key', key);
  };

  const handleSelectSet = (set: PracticeSet) => {
    setActiveSet(set);
    setUserAnswers({});
    navigateToScreen('practice');
  };

  const handleSelectOption = (questionId: string, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleCompletePractice = (timeTakenSeconds: number) => {
    if (!activeSet) return;

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    activeSet.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) skipped++;
      else if (isOptionCorrect(ans, q.correctAnswer, q.options)) correct++;
      else wrong++;
    });

    const total = activeSet.totalQuestions;
    const percentage = Math.round((correct / total) * 100);

    const newAttempt: AttemptRecord = {
      id: `attempt-${Date.now()}`,
      setId: activeSet.id,
      setTitle: activeSet.teluguTitle || activeSet.title,
      date: new Date().toISOString(),
      totalQuestions: total,
      score: correct,
      percentage,
      timeTakenSeconds,
      correctCount: correct,
      wrongCount: wrong,
      skippedCount: skipped,
      answers: userAnswers,
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    setCurrentAttempt(newAttempt);
    setLastTimeTaken(timeTakenSeconds);
    localStorage.setItem('amma_mcq_attempts', JSON.stringify(updatedAttempts.slice(0, 50)));

    navigateToScreen('result');
  };

  const handleReviewAttempt = (attempt: AttemptRecord) => {
    const targetSet = practiceSets.find((s) => s.id === attempt.setId) || activeSet || practiceSets[0];
    setActiveSet(targetSet);
    setUserAnswers(attempt.answers);
    navigateToScreen('review');
  };

  const handleImportSet = (newSet: PracticeSet) => {
    const updatedSets = [newSet, ...practiceSets];
    setPracticeSets(updatedSets);
    try {
      const customSets = updatedSets.filter((s) => s.id.startsWith('custom-'));
      localStorage.setItem('amma_mcq_custom_sets', JSON.stringify(customSets));
    } catch (e) {
      console.warn('Failed to save custom set:', e);
    }
    handleSelectSet(newSet);
  };

  // Font size mapping class
  const getTextSizeClass = () => {
    if (textSize === 'xlarge') return 'text-lg';
    if (textSize === 'large') return 'text-base';
    return 'text-sm';
  };

  return (
    <div className="min-h-screen bg-emerald-950/20 font-sans text-gray-900 selection:bg-amber-300 selection:text-emerald-950 flex flex-col">
      {/* Top Main Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigateHome={() => navigateToScreen('home')}
        textSize={textSize}
        onToggleTextSize={handleToggleTextSize}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(userApiKey)}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentScreen === 'home' && (
          <HomeScreen
            practiceSets={practiceSets}
            attempts={attempts}
            onSelectSet={handleSelectSet}
            onNavigateToSets={() => navigateToScreen('sets')}
            onReviewAttempt={handleReviewAttempt}
            onOpenImporter={() => setIsImporterOpen(true)}
            textSizeClass={getTextSizeClass()}
          />
        )}

        {currentScreen === 'sets' && (
          <SetSelectionScreen
            practiceSets={practiceSets}
            onSelectSet={handleSelectSet}
            textSizeClass={getTextSizeClass()}
          />
        )}

        {currentScreen === 'practice' && activeSet && (
          <PracticeScreen
            set={activeSet}
            userAnswers={userAnswers}
            onSelectOption={handleSelectOption}
            onCompletePractice={handleCompletePractice}
            onNavigateHome={() => navigateToScreen('home')}
            userApiKey={userApiKey}
            textSizeClass={getTextSizeClass()}
          />
        )}

        {currentScreen === 'result' && activeSet && (
          <ResultScreen
            set={activeSet}
            userAnswers={userAnswers}
            timeTakenSeconds={lastTimeTaken}
            onReviewAnswers={() => navigateToScreen('review')}
            onPracticeAgain={() => handleSelectSet(activeSet)}
            onNavigateHome={() => navigateToScreen('home')}
            textSizeClass={getTextSizeClass()}
          />
        )}

        {currentScreen === 'review' && activeSet && (
          <ReviewScreen
            set={activeSet}
            userAnswers={userAnswers}
            onNavigateHome={() => navigateToScreen('home')}
            onPracticeAgain={() => handleSelectSet(activeSet)}
            userApiKey={userApiKey}
            textSizeClass={getTextSizeClass()}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/20 bg-emerald-950 text-emerald-200 py-6 text-center text-xs space-y-1">
        <p className="font-bold text-amber-200">అమ్మ డిజిటల్ గురువు — MCQ Practice App with AI Tutor</p>
        <p className="text-emerald-400">Designed with simple conversational Telugu & high legibility for easy exam preparation.</p>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentApiKey={userApiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <QuestionImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImportSet={handleImportSet}
      />
    </div>
  );
}
