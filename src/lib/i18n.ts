export type Locale = 'en' | 'zh';

export const translations = {
  en: {
    // Header
    title: 'Codon Magic',
    subtitle: 'DNA Puzzle Generator',
    tagline: 'Turn text into DNA and challenge your biology friends!',

    // Tabs
    presets: 'Presets',
    custom: 'Custom',

    // Categories
    all: 'All',

    // Preset categories
    'cat.holiday': '🎄 Holidays',
    'cat.love': '❤️ Love',
    'cat.bio': '🧬 Biology',
    'cat.greeting': '👋 Greetings',
    'cat.motivation': '💪 Motivation',
    'cat.short': '✨ Short',

    // Cards
    codon: '🧬 Codon',
    answer: '🔮 Answer',
    copy: 'Copy',
    copied: '✓',
    clickToFlip: 'Click to flip →',
    clickBack: '← Back',

    // Info banners
    presetsInfo: 'Click a card to see the codon sequence, click again to reveal the answer',
    presetsHint: 'Copy the codon and share with biology friends to decode!',
    customInfo: 'Enter any English text to convert to codon sequence',
    customHint: 'Note: B, J, O, U, X, Z cannot be encoded (no amino acid)',

    // Encoder
    encodeMode: 'Text → Codon',
    decodeMode: 'Codon → Text',
    encodePlaceholder: 'Enter English text, e.g.: HELLO WORLD',
    decodePlaceholder: 'Enter codon sequence, e.g.: ATGGAACGT...',
    invalidLetters: 'Unavailable letters',
    invalidWarning: 'Contains letters that cannot be encoded',
    invalidHint: 'These letters have no amino acid code',
    generatedCodon: 'Generated codon sequence:',
    decodeResult: 'Decoded result:',
    baseCount: 'bases, encoding',
    aminoAcids: 'amino acids',
    generateCard: 'Generate Flashcard ✨',

    // Display toggle
    showAnswer: 'Show Answer',
    showCodon: 'Show Codon',

    // How it works
    howItWorks: 'How It Works',
    codonTitle: 'Codon',
    codonDesc: 'DNA consists of 4 bases: A, T, G, C. Every 3 bases form a codon that encodes one amino acid.',
    aminoTitle: 'Amino Acid Codes',
    aminoDesc: '20 natural amino acids each have a single-letter code (e.g., M=Methionine), forming readable sequences.',
    puzzleTitle: 'Decode the Puzzle',
    puzzleDesc: 'Those who know molecular biology can use the codon table to translate DNA sequences and reveal hidden messages!',

    // Codon table
    viewCodonTable: '📖 View Codon Table',

    // Footer
    footer: 'Made with 🧬 for biology enthusiasts',

    // Theme
    lightMode: 'Light',
    darkMode: 'Dark',

    // Unsupported letters
    unsupportedLetters: 'Unsupported Letters',
    unsupportedDesc: 'These letters cannot be encoded to amino acids:',

    // Toggle labels
    toggleLanguage: 'Language',
    toggleTheme: 'Theme',
    toggleDisplay: 'Display Mode',

    // My Cards
    myCards: 'My Cards',
    saveCard: 'Save Card',
    cardSaved: 'Saved!',
    deleteCard: 'Delete',
    noSavedCards: 'No saved cards yet',
    noSavedCardsHint: 'Create custom cards in the Custom tab and save them here',
    myCardsInfo: 'Your saved cards are stored locally in your browser',
    confirmDelete: 'Delete this card?',
    keepSpaces: 'Keep spaces',
  },
  zh: {
    // Header
    title: 'Codon Magic',
    subtitle: '密码子谜题生成器',
    tagline: '把文字变成DNA，让生物学朋友来破解！',

    // Tabs
    presets: '预设短语',
    custom: '自定义编码',

    // Categories
    all: '全部',

    // Preset categories
    'cat.holiday': '🎄 节日祝福',
    'cat.love': '❤️ 爱与情感',
    'cat.bio': '🧬 生物趣味',
    'cat.greeting': '👋 问候语',
    'cat.motivation': '💪 励志',
    'cat.short': '✨ 简短词汇',

    // Cards
    codon: '🧬 密码子',
    answer: '🔮 答案',
    copy: '复制',
    copied: '✓',
    clickToFlip: '点击翻转 →',
    clickBack: '← 返回',

    // Info banners
    presetsInfo: '点击卡片查看密码子序列，再次点击揭晓答案',
    presetsHint: '复制密码子分享给生物学朋友，让他们来破解！',
    customInfo: '输入任意英文文字，自动转换为密码子序列',
    customHint: '注意: B, J, O, U, X, Z 这些字母没有对应的氨基酸代码',

    // Encoder
    encodeMode: '文字 → 密码子',
    decodeMode: '密码子 → 文字',
    encodePlaceholder: '输入英文文字，例如: HELLO WORLD',
    decodePlaceholder: '输入密码子序列，例如: ATGGAACGT...',
    invalidLetters: '不可用字母',
    invalidWarning: '包含无法编码的字母',
    invalidHint: '这些字母没有对应的氨基酸单字母代码',
    generatedCodon: '生成的密码子序列:',
    decodeResult: '解码结果:',
    baseCount: '个碱基，编码',
    aminoAcids: '个氨基酸',
    generateCard: '生成闪卡 ✨',

    // Display toggle
    showAnswer: '显示答案',
    showCodon: '显示密码子',

    // How it works
    howItWorks: '原理说明',
    codonTitle: '密码子',
    codonDesc: 'DNA由A、T、G、C四种碱基组成，每3个碱基构成一个密码子，编码一种氨基酸。',
    aminoTitle: '氨基酸单字母代码',
    aminoDesc: '20种天然氨基酸各有一个单字母代码(如M=甲硫氨酸)，可以组成类似英文的序列。',
    puzzleTitle: '破解谜题',
    puzzleDesc: '学过分子生物学的人可以用密码子表，将DNA序列翻译成氨基酸，揭晓隐藏的信息！',

    // Codon table
    viewCodonTable: '📖 查看完整密码子对照表',

    // Footer
    footer: 'Made with 🧬 for biology enthusiasts',

    // Theme
    lightMode: '浅色',
    darkMode: '深色',

    // Unsupported letters
    unsupportedLetters: '不支持的字母',
    unsupportedDesc: '以下字母无法编码为氨基酸:',

    // Toggle labels
    toggleLanguage: '语言',
    toggleTheme: '主题',
    toggleDisplay: '显示模式',

    // My Cards
    myCards: '我的卡片',
    saveCard: '保存卡片',
    cardSaved: '已保存!',
    deleteCard: '删除',
    noSavedCards: '还没有保存的卡片',
    noSavedCardsHint: '在自定义编码中创建卡片并保存到这里',
    myCardsInfo: '你的卡片保存在浏览器本地',
    confirmDelete: '确定删除这张卡片?',
    keepSpaces: '保留空格',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
