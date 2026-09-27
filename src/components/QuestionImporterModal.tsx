'use client';

import React, { useState } from 'react';
import { PracticeSet, Question } from '@/types';
import { Plus, X, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface QuestionImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSet: (newSet: PracticeSet) => void;
}

export const QuestionImporterModal: React.FC<QuestionImporterModalProps> = ({
  isOpen,
  onClose,
  onImportSet,
}) => {
  const [paperTitle, setPaperTitle] = useState('');
  const [paperTeluguTitle, setPaperTeluguTitle] = useState('');
  const [rawJsonText, setRawJsonText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const sampleJsonTemplate = `[
  {
    "id": "q-custom-1",
    "question": "What is the capital of India?",
    "teluguQuestion": "భారతదేశ రాజధాని ఏది?",
    "options": ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    "correctAnswer": "New Delhi",
    "explanation": "New Delhi is the official capital of India.",
    "teluguExplanation": "న్యూ ఢిల్లీ భారతదేశ అధికారిక రాజధాని."
  }
]`;

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const parsedQuestions: Question[] = JSON.parse(rawJsonText);
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error('JSON ప్రశ్నల జాబితా సరైన ఫార్మాట్ లో లేదు.');
      }

      const newSet: PracticeSet = {
        id: `custom-${Date.now()}`,
        title: paperTitle.trim() || 'కస్టమ్ ప్రాక్టీస్ పేపర్',
        teluguTitle: paperTeluguTitle.trim() || paperTitle.trim() || 'కస్టమ్ పేపర్',
        description: `${parsedQuestions.length} ప్రశ్నల కస్టమ్ సాధన పేపర్.`,
        category: 'Custom Papers',
        questions: parsedQuestions,
        totalQuestions: parsedQuestions.length,
        estimatedTimeMinutes: Math.ceil(parsedQuestions.length * 1.2),
        badge: 'Custom',
      };

      onImportSet(newSet);
      onClose();
    } catch (err: any) {
      setErrorMsg(`ఫార్మాట్ లోపం: ${err.message || 'JSON సరైనది కాదు'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-emerald-100">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Plus className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">కొత్త క్వశ్చన్ పేపర్ జోడించండి</h3>
              <p className="text-xs text-gray-500">Import Custom MCQs in JSON format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              పేపర్ పేరు (Title in English):
            </label>
            <input
              type="text"
              required
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="e.g. Science Practice Set 04"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              తెలుగు పేరు (Telugu Title):
            </label>
            <input
              type="text"
              value={paperTeluguTitle}
              onChange={(e) => setPaperTeluguTitle(e.target.value)}
              placeholder="ఉదా: సైన్స్ ప్రాక్టీస్ పేపర్ 04"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                JSON ప్రశ్నల ఫార్మాట్ (MCQs Data):
              </label>
              <button
                type="button"
                onClick={() => setRawJsonText(sampleJsonTemplate)}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                నమూనా JSON నింపండి (Load Sample)
              </button>
            </div>
            <textarea
              rows={8}
              required
              value={rawJsonText}
              onChange={(e) => setRawJsonText(e.target.value)}
              placeholder="Paste JSON array of MCQs here..."
              className="w-full px-4 py-3 bg-gray-900 text-amber-200 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono text-xs leading-relaxed"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold"
            >
              రద్దు చేయండి (Cancel)
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>పేపర్ జోడించండి (Import Set)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
