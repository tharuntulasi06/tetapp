'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question, AITutorMessage, AITutorHelpType } from '@/types';
import { Bot, X, Lightbulb, BookOpen, SearchCheck, CheckCircle2, Send, Volume2, Sparkles, Loader2, RotateCcw } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  selectedAnswer?: string;
  userApiKey?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  question,
  selectedAnswer,
  userApiKey,
}) => {
  const [messages, setMessages] = useState<AITutorMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Reset chat when modal opens for a new question or clear state
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      const initialGreeting: AITutorMessage = {
        id: 'msg-init',
        role: 'assistant',
        content: `నమస్తే! ఈ ప్రశ్నను అర్థం చేసుకోవడంలో నేను మీకు సహాయం చేస్తాను. 

మీకు ఎలాంటి సహాయం కావాలి? క్రింది ఆప్షన్లలో ఒకదాన్ని ఎంచుకోండి లేదా మీ డౌట్ ని టైప్ చేయండి:`,
        timestamp: Date.now(),
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, question.id]);

  if (!isOpen) return null;

  const handleFetchAIHelp = async (helpType: AITutorHelpType, customPrompt?: string) => {
    setIsLoading(true);

    // Add user message if custom prompt or action button pressed
    const userMsgText = customPrompt || getHelpTypeLabel(helpType);
    const userMsg: AITutorMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userMsgText,
      helpType,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          selectedAnswer,
          helpType,
          customPrompt,
          apiKey: userApiKey,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || data.error || 'క్షమించండి, ప్రతిస్పందనను పొందడంలో చిన్న సమస్య వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.';

      const aiMsg: AITutorMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        helpType,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: AITutorMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: 'క్షమించండి, నెట్‌వర్క్ సమస్య ఉంది. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్ ని ఒకసారి చెక్ చేయండి.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    handleFetchAIHelp('custom', inputQuery.trim());
  };

  // Text-To-Speech playback in simple Telugu/English voice
  const handleSpeakText = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
        return;
      }

      window.speechSynthesis.cancel();
      // Remove markdown symbols for speech synthesis
      const cleanText = text.replace(/[*_#`~]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'te-IN'; // Try Telugu voice or default
      utterance.rate = 0.9; // Slightly slower for clear understanding by mother

      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);

      setSpeakingMsgId(msgId);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('మీ బ్రౌజర్ ఆడియో వినడానికి సపోర్ట్ చేయడం లేదు.');
    }
  };

  const getHelpTypeLabel = (type: AITutorHelpType): string => {
    switch (type) {
      case 'hint': return '💡 క్లూ ఇవ్వండి (Give Me a Hint)';
      case 'concept': return '📖 కాన్సెప్ట్ వివరించండి (Explain Concept)';
      case 'options_analysis': return '🔍 ఆప్షన్ల విశ్లేషణ (Explain Options)';
      case 'answer': return '✅ జవాబు మరియు వివరణ (Tell Answer)';
      default: return 'సందేహం';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end items-end sm:items-stretch transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg bg-emerald-950 text-white h-[92dvh] sm:h-full flex flex-col shadow-2xl border-t sm:border-t-0 sm:border-l border-emerald-800 rounded-t-3xl sm:rounded-none">
        
        {/* Header */}
        <div className="p-4 bg-emerald-900 border-b border-emerald-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-200 text-lg flex items-center gap-2">
                <span>తెలుగు AI ట్యూటర్</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  Live Helper
                </span>
              </h3>
              <p className="text-xs text-emerald-200">ప్రశ్నను అర్థం చేసుకోవడంలో సహాయం</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
            title="ముగించు (Close)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Current Question Context Badge */}
        <div className="px-4 py-3 bg-emerald-900/60 border-b border-emerald-800/60 text-xs sm:text-sm">
          <p className="text-emerald-300 font-bold uppercase tracking-wider text-[11px] mb-1">ప్రస్తుత ప్రశ్న (Current Question):</p>
          <p className="font-semibold text-amber-100 line-clamp-2">
            {question.teluguQuestion || question.question}
          </p>
          {selectedAnswer && (
            <p className="text-xs text-amber-300 font-medium mt-1">
              మీరు ఎంచుకున్న జవాబు: <span className="underline">{selectedAnswer}</span>
            </p>
          )}
        </div>

        {/* Preset AI Help Action Buttons */}
        <div className="p-3 bg-emerald-900/40 border-b border-emerald-800 grid grid-cols-2 gap-2">
          <button
            disabled={isLoading}
            onClick={() => handleFetchAIHelp('hint')}
            className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 text-left"
          >
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>💡 క్లూ ఇవ్వండి (Hint)</span>
          </button>

          <button
            disabled={isLoading}
            onClick={() => handleFetchAIHelp('concept')}
            className="p-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 text-left"
          >
            <BookOpen className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>📖 కాన్సెప్ట్ వివరింపు</span>
          </button>

          <button
            disabled={isLoading}
            onClick={() => handleFetchAIHelp('options_analysis')}
            className="p-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 text-left"
          >
            <SearchCheck className="w-4 h-4 text-teal-300 shrink-0" />
            <span>🔍 ఆప్షన్ల విశ్లేషణ</span>
          </button>

          <button
            disabled={isLoading}
            onClick={() => handleFetchAIHelp('answer')}
            className="p-2.5 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 text-left shadow"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-950 shrink-0" />
            <span>✅ సరైన జవాబు చెప్పు</span>
          </button>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] p-4 rounded-2xl text-sm sm:text-base leading-relaxed space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-emerald-950 font-bold rounded-br-none shadow'
                    : 'bg-emerald-900 border border-emerald-800 text-emerald-50 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Speech Button for AI Tutor Messages */}
                {msg.role === 'assistant' && (
                  <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleSpeakText(msg.id, msg.content)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                        speakingMsgId === msg.id
                          ? 'bg-amber-400 text-emerald-950 font-bold animate-pulse'
                          : 'bg-emerald-800/80 hover:bg-emerald-700 text-amber-200'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speakingMsgId === msg.id ? 'చదువుతోంది... (Stop)' : '🔊 తెలుగులో విను (Listen)'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 text-amber-200 text-sm animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
              <span>AI ట్యూటర్ జవాబు తయారు చేస్తున్నారు...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-emerald-900/40 border-t border-emerald-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-emerald-400 font-bold shrink-0">త్వరిత సూచనలు:</span>
          {[
            'B ఎందుకు సరైనది?',
            'గుర్తుంచుకోవడానికి ట్రిక్ ఇవ్వండి',
            'తెలుగులో వివరించు',
            'ఈ క్వశ్చన్ కి అర్థం ఏంటి?'
          ].map((chip) => (
            <button
              key={chip}
              disabled={isLoading}
              onClick={() => handleFetchAIHelp('custom', chip)}
              className="px-2.5 py-1 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-amber-200 border border-emerald-700 shrink-0 font-medium transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="p-3 bg-emerald-900 border-t border-emerald-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="మీ డౌట్ ని టైప్ చేయండి (Ask naturally in Telugu/English)..."
            disabled={isLoading}
            className="flex-1 bg-emerald-950 border border-emerald-700 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl shadow transition-all disabled:opacity-50"
            title="పంపిణీ చేయండి (Send)"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
