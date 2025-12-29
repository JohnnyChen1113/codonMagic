import { textToCodon } from './codon';

export interface Preset {
  id: string;
  category: string; // Category key for i18n: 'holiday', 'love', 'bio', 'greeting', 'motivation', 'short'
  text: string;
  hintEn?: string;
  hintZh?: string;
}

// Presets organized by category
export const PRESETS: Preset[] = [
  // Holiday Greetings
  { id: 'merry-christmas', category: 'holiday', text: 'MERRY CHRISTMAS', hintEn: 'Merry Christmas', hintZh: '圣诞快乐' },
  { id: 'happy-new-year', category: 'holiday', text: 'HAPPY NEW YEAR', hintEn: 'Happy New Year', hintZh: '新年快乐' },
  { id: 'happy-easter', category: 'holiday', text: 'HAPPY EASTER', hintEn: 'Happy Easter', hintZh: '复活节快乐' },
  { id: 'happy-thanksgiving', category: 'holiday', text: 'HAPPY THANKSGIVING', hintEn: 'Happy Thanksgiving', hintZh: '感恩节快乐' },
  { id: 'happy-halloween', category: 'holiday', text: 'HAPPY HALLOWEEN', hintEn: 'Happy Halloween', hintZh: '万圣节快乐' },
  { id: 'happy-valentines', category: 'holiday', text: 'HAPPY VALENTINES DAY', hintEn: "Happy Valentine's Day", hintZh: '情人节快乐' },

  // Love & Emotions
  { id: 'i-love-you', category: 'love', text: 'I LOVE YAV', hintEn: 'I Love You (U unavailable)', hintZh: '我爱你 (U无法表达)' },
  { id: 'miss-you', category: 'love', text: 'MISS YAV', hintEn: 'Miss You', hintZh: '想你' },
  { id: 'thank-you', category: 'love', text: 'THANKS', hintEn: 'Thanks', hintZh: '谢谢' },
  { id: 'love', category: 'love', text: 'LOVE', hintEn: 'Love', hintZh: '爱' },
  { id: 'peace', category: 'love', text: 'PEACE', hintEn: 'Peace', hintZh: '和平' },
  { id: 'hope', category: 'love', text: 'HOPE', hintEn: 'Hope', hintZh: '希望' },
  { id: 'dream', category: 'love', text: 'DREAM', hintEn: 'Dream', hintZh: '梦想' },

  // Life Science Fun
  { id: 'dna', category: 'bio', text: 'DNA', hintEn: 'DNA itself', hintZh: 'DNA本身' },
  { id: 'gene', category: 'bio', text: 'GENE', hintEn: 'Gene', hintZh: '基因' },
  { id: 'life', category: 'bio', text: 'LIFE', hintEn: 'Life', hintZh: '生命' },
  { id: 'cell', category: 'bio', text: 'CELL', hintEn: 'Cell', hintZh: '细胞' },
  { id: 'protein', category: 'bio', text: 'PROTEIN', hintEn: 'Protein', hintZh: '蛋白质' },
  { id: 'science', category: 'bio', text: 'SCIENCE', hintEn: 'Science', hintZh: '科学' },
  { id: 'nature', category: 'bio', text: 'NATVRE', hintEn: 'Nature (U unavailable)', hintZh: '自然 (U无法表达)' },

  // Greetings
  { id: 'hello', category: 'greeting', text: 'HELLO', hintEn: 'Hello', hintZh: '你好' },
  { id: 'hi-there', category: 'greeting', text: 'HI THERE', hintEn: 'Hi There', hintZh: '嗨' },
  { id: 'welcome', category: 'greeting', text: 'WELCOME', hintEn: 'Welcome', hintZh: '欢迎' },
  { id: 'good-morning', category: 'greeting', text: 'GOOD MORNING', hintEn: 'Good Morning', hintZh: '早上好' },
  { id: 'good-night', category: 'greeting', text: 'GOOD NIGHT', hintEn: 'Good Night', hintZh: '晚安' },
  { id: 'have-a-nice-day', category: 'greeting', text: 'HAVE A NICE DAY', hintEn: 'Have a Nice Day', hintZh: '祝你有美好的一天' },

  // Motivation
  { id: 'never-give-up', category: 'motivation', text: 'NEVER GIVE VP', hintEn: 'Never Give Up (U unavailable)', hintZh: '永不放弃 (U无法表达)' },
  { id: 'stay-strong', category: 'motivation', text: 'STAY STRONG', hintEn: 'Stay Strong', hintZh: '保持坚强' },
  { id: 'keep-going', category: 'motivation', text: 'KEEP GOING', hintEn: 'Keep Going', hintZh: '继续前进' },
  { id: 'believe', category: 'motivation', text: 'BELIEVE', hintEn: 'Believe', hintZh: '相信' },
  { id: 'create', category: 'motivation', text: 'CREATE', hintEn: 'Create', hintZh: '创造' },
  { id: 'inspire', category: 'motivation', text: 'INSPIRE', hintEn: 'Inspire', hintZh: '启发' },
  { id: 'imagine', category: 'motivation', text: 'IMAGINE', hintEn: 'Imagine', hintZh: '想象' },

  // Short & Sweet
  { id: 'yes', category: 'short', text: 'YES', hintEn: 'Yes', hintZh: '是' },
  { id: 'cool', category: 'short', text: 'COOL', hintEn: 'Cool', hintZh: '酷' },
  { id: 'win', category: 'short', text: 'WIN', hintEn: 'Win', hintZh: '胜利' },
  { id: 'star', category: 'short', text: 'STAR', hintEn: 'Star', hintZh: '星星' },
  { id: 'magic', category: 'short', text: 'MAGIC', hintEn: 'Magic', hintZh: '魔法' },
  { id: 'smile', category: 'short', text: 'SMILE', hintEn: 'Smile', hintZh: '微笑' },
  { id: 'happy', category: 'short', text: 'HAPPY', hintEn: 'Happy', hintZh: '快乐' },
  { id: 'lucky', category: 'short', text: 'LUCKY', hintEn: 'Lucky', hintZh: '幸运' },
];

// Category key to translation key mapping
export const CATEGORY_KEYS = ['holiday', 'love', 'bio', 'greeting', 'motivation', 'short'] as const;
export type CategoryKey = typeof CATEGORY_KEYS[number];

// Generate codon for a preset
export function getPresetWithCodon(preset: Preset) {
  const { codon, valid, invalidChars } = textToCodon(preset.text);
  return {
    ...preset,
    codon,
    valid,
    invalidChars,
  };
}

// Get all presets with their codons
export function getAllPresetsWithCodons() {
  return PRESETS.map(getPresetWithCodon);
}

// Get unique category keys
export function getCategoryKeys(): CategoryKey[] {
  return [...new Set(PRESETS.map(p => p.category))] as CategoryKey[];
}
