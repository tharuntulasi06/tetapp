export const isOptionCorrect = (
  option: string | undefined,
  correctAnswer: string | undefined,
  options: string[] = []
): boolean => {
  if (!option || !correctAnswer) return false;

  const normOpt = option.trim();
  const normCorr = correctAnswer.trim();

  // 1. Direct match
  if (normOpt === normCorr) return true;

  // Helper to extract option letter ('A', 'B', 'C', 'D')
  const getLetter = (str: string, idxInOptions?: number): string => {
    const match = str.match(/^([A-D])[\.\s]/i);
    if (match) return match[1].toUpperCase();
    if (str.length === 1 && /[A-D]/i.test(str)) return str.toUpperCase();
    if (idxInOptions !== undefined && idxInOptions >= 0 && idxInOptions < 4) {
      return String.fromCharCode(65 + idxInOptions);
    }
    return '';
  };

  const optIndex = options.indexOf(option);
  const optLetter = getLetter(normOpt, optIndex);
  const corrLetter = getLetter(normCorr);

  // 2. Letter prefix comparison (e.g. 'B' === 'B')
  if (optLetter && corrLetter && optLetter === corrLetter) {
    return true;
  }

  // 3. Normalized stripped text comparison (e.g. ignoring 'A. ')
  const stripPrefix = (s: string) => s.replace(/^[A-D][\.\s]*/i, '').trim().toLowerCase();
  return stripPrefix(normOpt) === stripPrefix(normCorr);
};

export const getCorrectOptionText = (
  correctAnswer: string,
  options: string[] = []
): string => {
  if (!correctAnswer) return '';
  const found = options.find((opt) => isOptionCorrect(opt, correctAnswer, options));
  return found || correctAnswer;
};
