import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AITutorRequest } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: AITutorRequest = await req.json();
    const { question, selectedAnswer, helpType, customPrompt, apiKey: clientApiKey } = body;

    // Collect candidate API keys
    const rawKeys = [
      clientApiKey,
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_SECONDARY,
    ].filter(Boolean) as string[];

    const candidateKeys: string[] = [];
    rawKeys.forEach(k => {
      k.split(',').forEach(subKey => {
        const trimmed = subKey.trim();
        if (trimmed && !candidateKeys.includes(trimmed)) {
          candidateKeys.push(trimmed);
        }
      });
    });

    const isMathsQuestion = 
      question.category?.toLowerCase().includes('math') || 
      /(\d+[\+\-\*\/\%\=\>\|\<\^\√\÷\×]\d+|divisible|fraction|percent|ratio|area|volume|perimeter|angle|equation|సంఖ్య|భాగింప|గుణకారం|కూడిక|తీసివేత|శాతం|వైశాల్యం|చుట్టుకొలత|నిష్పత్తి)/i.test(question.question + ' ' + (question.teluguQuestion || ''));

    // Construct the context string
    const contextPrompt = `
CURRENT MCQ QUESTION CONTEXT:
Subject/Category: "${question.category || 'General'}"
Question (English/Original): "${question.question}"
${question.teluguQuestion ? `Telugu Translation: "${question.teluguQuestion}"` : ''}
Options:
${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}

Correct Answer (Key): ${question.correctAnswer}
User Selected Answer: ${selectedAnswer || 'Not selected yet'}
Official Explanation: ${question.explanation}
${question.teluguExplanation ? `Official Telugu Explanation: ${question.teluguExplanation}` : ''}
`;

    // System instruction specially tuned for step-by-step math solving & clear conceptual tutoring in Telugu
    const systemInstruction = `
You are a warm, patient, encouraging, and highly intelligent AI Tutor helping an Indian learner (a mother preparing for TET exams) master exam MCQs.
Your explanations MUST be in simple, conversational Telugu mixed with essential English technical terms (Telugish).

CRITICAL DIRECTIVES:

1. 🧮 IF THIS IS A MATHEMATICS / CALCULATION / NUMERICAL QUESTION:
   - YOU MUST SOLVE THE PROBLEM STEP-BY-STEP! Do NOT just give a summary or state the answer.
   - Use this clear structure:
     📌 **ఇచ్చిన వివరాలు (Given Data)**
     📐 **సూత్రం / పద్ధతి (Formula / Concept)**
     🔢 **స్టెప్ బై స్టెప్ సాధన (Step-by-Step Calculation)**
     ✅ **ముగింపు మరియు సరైన ఆప్షన్ (Final Answer & Option)**
   - Show all arithmetic working, multiplications, divisions, substitutions, and option checks in detail.
   - Explain *why* each step is performed in simple, warm Telugu.

2. 📖 IF THIS IS A CONCEPTUAL / THEORY QUESTION (CDP, Science, EVS, English, Telugu):
   - Explain the core underlying concept deeply using simple everyday real-life examples and analogies in Telugu.
   - Break down the logic so it is effortless to remember for the exam.

3. TONE & STYLE:
   - Use warm, respectful, direct Telugu (e.g., "ఈ ప్రశ్న చాలా సులభంగా నేర్చుకుందాం...", "చిన్న ట్రిక్ చూద్దాం...", "స్టెప్ బై స్టెప్ చేద్దాం...").
   - Avoid dry bookish jargon.
   - Format with emojis, bold headings, bullet points, and short readable paragraphs.

HELP TYPE SPECIFIC INSTRUCTIONS:
- HINT (💡): Give 1-2 subtle clues / starting steps without directly giving away the final option.
- CONCEPT (📖): Fully explain the core concept, formula, or theory behind the question step-by-step.
- OPTIONS_ANALYSIS (🔍): Analyze all 4 options (A, B, C, D) one by one in Telugu, showing calculations or reasons for right/wrong.
- ANSWER (✅): Solve the problem completely, state the correct option clearly, and summarize the key takeaway.
- CUSTOM (💬): Answer the user's specific query ("${customPrompt || ''}") with complete step-by-step clarity.
`;

    let userPrompt = '';
    switch (helpType) {
      case 'hint':
        userPrompt = `${contextPrompt}\n\nTask: Provide a helpful HINT and starting clue in simple conversational Telugu without directly revealing the final correct option.`;
        break;
      case 'concept':
        userPrompt = `${contextPrompt}\n\nTask: Explain the CONCEPT and solve the problem step-by-step in simple Telugu so it is completely crystal clear.`;
        break;
      case 'options_analysis':
        userPrompt = `${contextPrompt}\n\nTask: Analyze each of the 4 options (A, B, C, D) in simple Telugu, showing calculations or step-by-step logic for why each option is right or wrong.`;
        break;
      case 'answer':
        userPrompt = `${contextPrompt}\n\nTask: Solve the problem step-by-step, state the correct answer clearly, and explain why it is correct in simple Telugu.`;
        break;
      case 'custom':
        userPrompt = `${contextPrompt}\n\nUser Prompt: "${customPrompt}"\n\nTask: Answer the user's question completely, solving any mathematical steps or explaining concepts in simple Telugu.`;
        break;
    }

    // Models to try in order of availability & quota efficiency
    const modelCandidates = ['gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-3.5-flash'];

    for (const key of candidateKeys) {
      // 1. Try Direct REST Fetch first (handles new models like gemini-3.5-flash-lite seamlessly)
      for (const model of modelCandidates) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }]
            })
          });

          if (res.ok) {
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return NextResponse.json({ reply: text });
            }
          }
        } catch (e: any) {
          console.warn(`REST call failed for model ${model}:`, e.message);
        }
      }

      // 2. Fallback to @google/genai SDK
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash-lite',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }
          ],
        });

        if (response.text) {
          return NextResponse.json({ reply: response.text });
        }
      } catch (err: any) {
        console.warn(`SDK call failed:`, err.message);
      }
    }

    // Smart Dynamic Local Fallback Engine if network/API key is totally unavailable
    const fallbackReply = generateLocalSmartFallback(question, selectedAnswer, helpType, isMathsQuestion, customPrompt);
    return NextResponse.json({ reply: fallbackReply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}

function generateLocalSmartFallback(
  q: any,
  selectedAnswer: string | undefined,
  helpType: string,
  isMaths: boolean,
  customPrompt?: string
): string {
  const teluguQ = q.teluguQuestion || q.question;
  const teluguExp = q.teluguExplanation || q.explanation;
  const correctOpt = q.correctAnswer;

  if (isMaths) {
    return `🧮 **గణిత సాధన (Step-by-Step Maths Solution):**\n\n` +
      `**ప్రశ్న:** ${teluguQ}\n\n` +
      `📌 **ఇచ్చిన వివరాలు & సాధన:**\n` +
      `ఈ లెక్కను పూర్తి వివరంగా మరియు సులభంగా అర్థం చేసుకుందాం:\n\n` +
      `1️⃣ **వివరణ:** ${teluguExp}\n\n` +
      `2️⃣ **ఆప్షన్లు చూద్దాం:**\n` +
      q.options.map((opt: string, i: number) => {
        const letter = String.fromCharCode(65 + i);
        const isCorrect = opt === correctOpt;
        return `${isCorrect ? '✅' : '❌'} **${letter}. ${opt}** ${isCorrect ? '(సరైన సమాధానం)' : ''}`;
      }).join('\n') +
      `\n\n✅ **సరైన జవాబు:** **${correctOpt}**`;
  }

  switch (helpType) {
    case 'hint':
      return `💡 **చిన్న క్లూ (Hint):**\n\nఈ ప్రశ్నను ఒకసారి జాగ్రత్తగా గమనించండి:\n👉 "${teluguQ}"\n\n**హింట్:** ఆలోచించండి, ఈ విషయంలో మనం రోజూ చూసే లేదా వినే అత్యంత సహజమైన అంశం ఏమిటి? ${q.options[0]} మరియు ${q.options[1]} లో ఒకదాన్ని బాగా గమనించండి! ఆప్షన్లను ఒకసారి మళ్లీ చూడండి.`;

    case 'concept':
      return `📖 **కాన్సెప్ట్ వివరింపు (Concept):**\n\nఈ ప్రశ్న యొక్క మూల కాన్సెప్ట్ ని చాలా సులభంగా అర్థం చేసుకుందాం అమ్మా:\n\n${teluguExp}\n\nపరీక్షల్లో ఇలాంటి ప్రశ్నలు అడిగినప్పుడు విషయాల మధ్య ఉన్న ముఖ్య సంబంధాన్ని గుర్తుంచుకుంటే సరిపోతుంది.`;

    case 'options_analysis':
      return `🔍 **ఆప్షన్ల విశ్లేషణ (Options Analysis):**\n\nఒక్కొక్క ఆప్షన్ ని చూద్దాం:\n\n` +
        q.options.map((opt: string, idx: number) => {
          const isCorrect = opt === correctOpt;
          const letter = String.fromCharCode(65 + idx);
          if (isCorrect) {
            return `✅ **${letter}. ${opt}** — ఇది **సరైన సమాధానం**! ఎందుకంటే ${teluguExp}`;
          } else {
            return `❌ **${letter}. ${opt}** — ఇది సరైనది కాదు.`;
          }
        }).join('\n\n');

    case 'answer':
      return `✅ **సరైన సమాధానం (Correct Answer):**\n\n👉 **${correctOpt}**\n\n**ఎందుకంటే:**\n${teluguExp}`;

    case 'custom':
    default:
      return `🤖 **AI ట్యూటర్ సమాధానం:**\n\nమీ ప్రశ్న: "${customPrompt || 'ఈ ప్రశ్న గురించి వివరింపు'}"\n\nఈ ప్రశ్నకు సరైన సమాధానం **${correctOpt}**.\n\n${teluguExp}`;
  }
}

