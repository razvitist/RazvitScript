import { morse } from './morse-alphabet';

const morseDict: Record<string, string> = morse;

export const getMorseTask = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let word = '';
  const code: string[] = [];
  for (let i = 0; i < length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    word += char;
    code.push(morseDict[char]);
  }
  return { problem: code.join(' / '), answer: word };
};
