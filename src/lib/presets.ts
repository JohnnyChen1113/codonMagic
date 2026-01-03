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
  { id: 'happy-lunar', category: 'holiday', text: 'HAPPY LVNAR NEW YEAR', hintEn: 'Happy Lunar New Year (U unavailable)', hintZh: '春节快乐 (U无法表达)' },
  { id: 'warm-wishes', category: 'holiday', text: 'WARM WISHES', hintEn: 'Warm Wishes', hintZh: '温馨祝福' },
  { id: 'happy-festival', category: 'holiday', text: 'HAPPY FESTIVAL', hintEn: 'Happy Festival', hintZh: '节日快乐' },
  { id: 'happy-midavtumn', category: 'holiday', text: 'HAPPY MIDAVTVMN', hintEn: 'Happy Mid-Autumn (U unavailable)', hintZh: '中秋快乐 (U无法表达)' },

  // Love & Emotions
  { id: 'i-love-you', category: 'love', text: 'I LOVE YAV', hintEn: 'I Love You (U unavailable)', hintZh: '我爱你 (U无法表达)' },
  { id: 'miss-you', category: 'love', text: 'MISS YAV', hintEn: 'Miss You (U unavailable)', hintZh: '想你 (U无法表达)' },
  { id: 'thank-you', category: 'love', text: 'THANKS', hintEn: 'Thanks', hintZh: '谢谢' },
  { id: 'love', category: 'love', text: 'LOVE', hintEn: 'Love', hintZh: '爱' },
  { id: 'peace', category: 'love', text: 'PEACE', hintEn: 'Peace', hintZh: '和平' },
  { id: 'hope', category: 'love', text: 'HOPE', hintEn: 'Hope', hintZh: '希望' },
  { id: 'dream', category: 'love', text: 'DREAM', hintEn: 'Dream', hintZh: '梦想' },
  { id: 'always', category: 'love', text: 'ALWAYS', hintEn: 'Always', hintZh: '永远' },
  { id: 'my-dear', category: 'love', text: 'MY DEAR', hintEn: 'My Dear', hintZh: '亲爱的' },
  { id: 'sweetheart', category: 'love', text: 'SWEETHEART', hintEn: 'Sweetheart', hintZh: '甜心' },
  { id: 'kindness', category: 'love', text: 'KINDNESS', hintEn: 'Kindness', hintZh: '善良' },
  { id: 'friendship', category: 'love', text: 'FRIENDSHIP', hintEn: 'Friendship', hintZh: '友谊' },
  { id: 'take-care', category: 'love', text: 'TAKE CARE', hintEn: 'Take Care', hintZh: '保重' },
  { id: 'cherish', category: 'love', text: 'CHERISH', hintEn: 'Cherish', hintZh: '珍惜' },

  // Life Science Fun
  { id: 'dna', category: 'bio', text: 'DNA', hintEn: 'DNA itself', hintZh: 'DNA本身' },
  { id: 'gene', category: 'bio', text: 'GENE', hintEn: 'Gene', hintZh: '基因' },
  { id: 'life', category: 'bio', text: 'LIFE', hintEn: 'Life', hintZh: '生命' },
  { id: 'cell', category: 'bio', text: 'CELL', hintEn: 'Cell', hintZh: '细胞' },
  { id: 'protein', category: 'bio', text: 'PROTEIN', hintEn: 'Protein', hintZh: '蛋白质' },
  { id: 'science', category: 'bio', text: 'SCIENCE', hintEn: 'Science', hintZh: '科学' },
  { id: 'nature', category: 'bio', text: 'NATVRE', hintEn: 'Nature (U unavailable)', hintZh: '自然 (U无法表达)' },
  { id: 'genetics', category: 'bio', text: 'GENETICS', hintEn: 'Genetics', hintZh: '遗传学' },
  { id: 'rna', category: 'bio', text: 'RNA', hintEn: 'RNA', hintZh: 'RNA' },
  { id: 'nucleus', category: 'bio', text: 'NVCLEUS', hintEn: 'Nucleus (U unavailable)', hintZh: '细胞核 (U无法表达)' },
  { id: 'membrane', category: 'bio', text: 'MEMBRANE', hintEn: 'Membrane', hintZh: '细胞膜' },
  { id: 'cellular', category: 'bio', text: 'CELLULAR', hintEn: 'Cellular', hintZh: '细胞的' },
  { id: 'catalyst', category: 'bio', text: 'CATALYST', hintEn: 'Catalyst', hintZh: '催化剂' },
  { id: 'synthesis', category: 'bio', text: 'SYNTHESIS', hintEn: 'Synthesis', hintZh: '合成' },

  // Greetings
  { id: 'hello', category: 'greeting', text: 'HELLO', hintEn: 'Hello', hintZh: '你好' },
  { id: 'hi-there', category: 'greeting', text: 'HI THERE', hintEn: 'Hi There', hintZh: '嗨' },
  { id: 'welcome', category: 'greeting', text: 'WELCOME', hintEn: 'Welcome', hintZh: '欢迎' },
  { id: 'good-morning', category: 'greeting', text: 'GOOD MORNING', hintEn: 'Good Morning', hintZh: '早上好' },
  { id: 'good-night', category: 'greeting', text: 'GOOD NIGHT', hintEn: 'Good Night', hintZh: '晚安' },
  { id: 'have-a-nice-day', category: 'greeting', text: 'HAVE A NICE DAY', hintEn: 'Have a Nice Day', hintZh: '祝你有美好的一天' },
  { id: 'greetings', category: 'greeting', text: 'GREETINGS', hintEn: 'Greetings', hintZh: '问候' },
  { id: 'see-ya', category: 'greeting', text: 'SEE YA', hintEn: 'See You', hintZh: '再见' },
  { id: 'cheers', category: 'greeting', text: 'CHEERS', hintEn: 'Cheers', hintZh: '干杯/再见' },
  { id: 'stay-safe', category: 'greeting', text: 'STAY SAFE', hintEn: 'Stay Safe', hintZh: '注意安全' },
  { id: 'take-it-easy', category: 'greeting', text: 'TAKE IT EASY', hintEn: 'Take it easy', hintZh: '放轻松' },
  { id: 'nice-day', category: 'greeting', text: 'NICE DAY', hintEn: 'Nice Day', hintZh: '美好的一天' },

  // Motivation
  { id: 'never-give-up', category: 'motivation', text: 'NEVER GIVE VP', hintEn: 'Never Give Up (U unavailable)', hintZh: '永不放弃 (U无法表达)' },
  { id: 'stay-strong', category: 'motivation', text: 'STAY STRONG', hintEn: 'Stay Strong', hintZh: '保持坚强' },
  { id: 'keep-going', category: 'motivation', text: 'KEEP GOING', hintEn: 'Keep Going', hintZh: '继续前进' },
  { id: 'believe', category: 'motivation', text: 'BELIEVE', hintEn: 'Believe', hintZh: '相信' },
  { id: 'create', category: 'motivation', text: 'CREATE', hintEn: 'Create', hintZh: '创造' },
  { id: 'inspire', category: 'motivation', text: 'INSPIRE', hintEn: 'Inspire', hintZh: '启发' },
  { id: 'imagine', category: 'motivation', text: 'IMAGINE', hintEn: 'Imagine', hintZh: '想象' },
  { id: 'achieve', category: 'motivation', text: 'ACHIEVE', hintEn: 'Achieve', hintZh: '成就' },
  { id: 'success', category: 'motivation', text: 'SVCCESS', hintEn: 'Success (U unavailable)', hintZh: '成功 (U无法表达)' },
  { id: 'strength', category: 'motivation', text: 'STRENGTH', hintEn: 'Strength', hintZh: '力量' },
  { id: 'stand-tall', category: 'motivation', text: 'STAND TALL', hintEn: 'Stand Tall', hintZh: '昂首挺立' },
  { id: 'fight', category: 'motivation', text: 'FIGHT', hintEn: 'Fight', hintZh: '战斗' },
  { id: 'persist', category: 'motivation', text: 'PERSIST', hintEn: 'Persist', hintZh: '坚持' },
  { id: 'advance', category: 'motivation', text: 'ADVANCE', hintEn: 'Advance', hintZh: '前进' },
  { id: 'thrive', category: 'motivation', text: 'THRIVE', hintEn: 'Thrive', hintZh: '茁壮成长' },
  { id: 'elevate', category: 'motivation', text: 'ELEVATE', hintEn: 'Elevate', hintZh: '提升' },
  { id: 'fearless', category: 'motivation', text: 'FEARLESS', hintEn: 'Fearless', hintZh: '无畏' },
  { id: 'resilient', category: 'motivation', text: 'RESILIENT', hintEn: 'Resilient', hintZh: '坚韧' },

  // Short & Sweet
  { id: 'yes', category: 'short', text: 'YES', hintEn: 'Yes', hintZh: '是' },
  { id: 'cool', category: 'short', text: 'COOL', hintEn: 'Cool', hintZh: '酷' },
  { id: 'win', category: 'short', text: 'WIN', hintEn: 'Win', hintZh: '胜利' },
  { id: 'star', category: 'short', text: 'STAR', hintEn: 'Star', hintZh: '星星' },
  { id: 'magic', category: 'short', text: 'MAGIC', hintEn: 'Magic', hintZh: '魔法' },
  { id: 'smile', category: 'short', text: 'SMILE', hintEn: 'Smile', hintZh: '微笑' },
  { id: 'happy', category: 'short', text: 'HAPPY', hintEn: 'Happy', hintZh: '快乐' },
  { id: 'lucky', category: 'short', text: 'LUCKY', hintEn: 'Lucky', hintZh: '幸运' },
  { id: 'yeah', category: 'short', text: 'YEAH', hintEn: 'Yeah', hintZh: '耶' },
  { id: 'yay', category: 'short', text: 'YAY', hintEn: 'Yay', hintZh: '太好了' },
  { id: 'hey', category: 'short', text: 'HEY', hintEn: 'Hey', hintZh: '嘿' },
  { id: 'awe', category: 'short', text: 'AWE', hintEn: 'Awe', hintZh: '敬畏' },
  { id: 'nice', category: 'short', text: 'NICE', hintEn: 'Nice', hintZh: '不错' },
  { id: 'great', category: 'short', text: 'GREAT', hintEn: 'Great', hintZh: '很棒' },
  { id: 'super', category: 'short', text: 'SVPER', hintEn: 'Super (U unavailable)', hintZh: '超级 (U无法表达)' },
  { id: 'cheer', category: 'short', text: 'CHEER', hintEn: 'Cheer', hintZh: '加油' },
  { id: 'epic', category: 'short', text: 'EPIC', hintEn: 'Epic', hintZh: '史诗般的' },
  { id: 'fire', category: 'short', text: 'FIRE', hintEn: 'Fire', hintZh: '火' },

  // Quotes & Famous Lines (no B, J, O, X, Z letters needed!)
  { id: 'what-can-i-say', category: 'quotes', text: 'WHAT CAN I SAY MAN', hintEn: 'What can I say man', hintZh: '我能说什么呢' },
  { id: 'i-have-dream', category: 'quotes', text: 'I HAVE A DREAM', hintEn: 'Martin Luther King Jr.', hintZh: '马丁·路德·金' },
  { id: 'carpe-diem', category: 'quotes', text: 'CARPE DIEM', hintEn: 'Seize the day', hintZh: '及时行乐' },
  { id: 'think-different', category: 'quotes', text: 'THINK DIFFERENT', hintEn: 'Apple slogan', hintZh: '苹果广告语' },
  { id: 'yes-we-can', category: 'quotes', text: 'YES WE CAN', hintEn: 'Obama slogan', hintZh: '奥巴马竞选口号' },
  { id: 'keep-calm', category: 'quotes', text: 'KEEP CALM', hintEn: 'Keep Calm and Carry On', hintZh: '保持冷静' },
  { id: 'stay-wild', category: 'quotes', text: 'STAY WILD', hintEn: 'Stay wild and free', hintZh: '保持狂野' },
  { id: 'never-settle', category: 'quotes', text: 'NEVER SETTLE', hintEn: 'Never settle', hintZh: '永不妥协' },
  { id: 'make-it-happen', category: 'quotes', text: 'MAKE IT HAPPEN', hintEn: 'Make it happen', hintZh: '让它发生' },
  { id: 'dare-greatly', category: 'quotes', text: 'DARE GREATLY', hintEn: 'Dare greatly', hintZh: '勇敢尝试' },
  { id: 'keep-swimming', category: 'quotes', text: 'KEEP SWIMMING', hintEn: 'Finding Nemo', hintZh: '海底总动员' },
  { id: 'life-finds-way', category: 'quotes', text: 'LIFE FINDS A WAY', hintEn: 'Jurassic Park', hintZh: '侏罗纪公园' },
  { id: 'hakuna-matata', category: 'quotes', text: 'HAKVNA MATATA', hintEn: 'The Lion King (U unavailable)', hintZh: '狮子王 (U无法表达)' },
  { id: 'the-game', category: 'quotes', text: 'WIN THE GAME', hintEn: 'Win the game', hintZh: '赢得比赛' },
  { id: 'live-free', category: 'quotes', text: 'LIVE FREE', hintEn: 'Live free', hintZh: '自由生活' },
  { id: 'rise-shine', category: 'quotes', text: 'RISE AND SHINE', hintEn: 'Rise and shine', hintZh: '起床啦' },
];

// Category key to translation key mapping
export const CATEGORY_KEYS = ['holiday', 'love', 'bio', 'greeting', 'motivation', 'short', 'quotes'] as const;
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
