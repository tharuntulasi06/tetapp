'use client';

import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentApiKey,
  onSaveApiKey,
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-100">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Key className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Gemini AI Key సెట్టింగ్స్</h3>
              <p className="text-xs text-gray-500">Custom Google Gemini API Key Config</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ఆటోమేటిక్ ఉచిత AI ట్యూటర్:</span>
          </p>
          <p className="leading-relaxed">
            యాప్ లో ముందుగా రూపొందించిన శక్తివంతమైన తెలుగు ట్యూటర్ ఆటోమేటిక్‌గా పనిచేస్తుంది.
            మీకు కావాలనుకుంటే మీ స్వంత <strong>Google Gemini API Key</strong> ఇక్కడ నమోదు చేయవచ్చు.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Gemini API Key:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-emerald-700">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline font-bold"
            >
              <span>ఉచిత Gemini Key పొందండి (Get Free Key)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setApiKey('');
                onSaveApiKey('');
              }}
              className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold"
            >
              కీ తొలగించు (Clear)
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
            >
              {isSaved ? <Check className="w-4 h-4" /> : null}
              <span>{isSaved ? 'సేవ్ అయ్యింది!' : 'సేవ్ చేయండి (Save)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
