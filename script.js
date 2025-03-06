// 确保 DOM 加载后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    // 汉字和拼画数据（按小关分配）
    const allWords = {
        'level-1-1': [
            { hanzi: '造', pinyin: 'zào', meaningCn: '制造', meaningEn: 'to make, to build', strokeCount: 12, animation: 'https://bishun.gjcha.com/9020.gif' },
            { hanzi: '纸', pinyin: 'zhǐ', meaningCn: '纸张', meaningEn: 'paper', strokeCount: 7, animation: 'https://bishun.gjcha.com/7EB8.gif' },
            { hanzi: '代', pinyin: 'dài', meaningCn: '代替', meaningEn: 'to replace, to substitute', strokeCount: 5, animation: 'https://bishun.gjcha.com/4EE3.gif' }
        ],
        'level-1-2': [
            { hanzi: '把', pinyin: 'bǎ', meaningCn: '握住', meaningEn: 'to hold, to grasp', strokeCount: 7, animation: 'https://bishun.gjcha.com/628A.gif' },
            { hanzi: '竹', pinyin: 'zhú', meaningCn: '竹子', meaningEn: 'bamboo', strokeCount: 6, animation: 'https://bishun.gjcha.com/7AF9.gif' },
            { hanzi: '片', pinyin: 'piàn', meaningCn: '薄片', meaningEn: 'slice, piece', strokeCount: 4, animation: 'https://bishun.gjcha.com/7247.gif' }
        ],
        'level-1-3': [
            { hanzi: '便', pinyin: 'biàn', meaningCn: '方便', meaningEn: 'convenient', strokeCount: 9, animation: 'https://bishun.gjcha.com/4FBF.gif' },
            { hanzi: '元', pinyin: 'yuán', meaningCn: '元', meaningEn: 'unit of currency, primary', strokeCount: 4, animation: 'https://bishun.gjcha.com/5143.gif' }
        ],
        'level-2-1': [
            { hanzi: '决', pinyin: 'jué', meaningCn: '决定', meaningEn: 'to decide', strokeCount: 7, animation: 'https://bishun.gjcha.com/51B3.gif' },
            { hanzi: '皮', pinyin: 'pí', meaningCn: '皮肤', meaningEn: 'skin', strokeCount: 5, animation: 'https://bishun.gjcha.com/76AE.gif' },
            { hanzi: '破', pinyin: 'pò', meaningCn: '打破', meaningEn: 'to break, to destroy', strokeCount: 10, animation: 'https://bishun.gjcha.com/7834.gif' }
        ],
        'level-2-2': [
            { hanzi: '布', pinyin: 'bù', meaningCn: '布料', meaningEn: 'cloth, fabric', strokeCount: 5, animation: 'https://bishun.gjcha.com/5E03.gif' },
            { hanzi: '打', pinyin: 'dǎ', meaningCn: '打击', meaningEn: 'to hit, to strike', strokeCount: 5, animation: 'https://bishun.gjcha.com/6253.gif' }
        ],
        'level-2-3': [
            { hanzi: '干', pinyin: 'gān', meaningCn: '干燥', meaningEn: 'dry', strokeCount: 3, animation: 'https://bishun.gjcha.com/5E72.gif' },
            { hanzi: '之', pinyin: 'zhī', meaningCn: '代词，表示“的”', meaningEn: 'possessive particle, "of"', strokeCount: 3, animation: 'https://bishun.gjcha.com/4E4B.gif' }
        ],
        'level-3-1': [
            { hanzi: '造', pinyin: 'zào', meaningCn: '制造', meaningEn: 'to make, to build', strokeCount: 12, animation: 'https://bishun.gjcha.com/9020.gif' },
            { hanzi: '纸', pinyin: 'zhǐ', meaningCn: '纸张', meaningEn: 'paper', strokeCount: 7, animation: 'https://bishun.gjcha.com/7EB8.gif' },
            { hanzi: '代', pinyin: 'dài', meaningCn: '代替', meaningEn: 'to replace, to substitute', strokeCount: 5, animation: 'https://bishun.gjcha.com/4EE3.gif' },
            { hanzi: '把', pinyin: 'bǎ', meaningCn: '握住', meaningEn: 'to hold, to grasp', strokeCount: 7, animation: 'https://bishun.gjcha.com/628A.gif' },
            { hanzi: '竹', pinyin: 'zhú', meaningCn: '竹子', meaningEn: 'bamboo', strokeCount: 6, animation: 'https://bishun.gjcha.com/7AF9.gif' }
        ],
        'level-3-2': [
            { hanzi: '片', pinyin: 'piàn', meaningCn: '薄片', meaningEn: 'slice, piece', strokeCount: 4, animation: 'https://bishun.gjcha.com/7247.gif' },
            { hanzi: '便', pinyin: 'biàn', meaningCn: '方便', meaningEn: 'convenient', strokeCount: 9, animation: 'https://bishun.gjcha.com/4FBF.gif' },
            { hanzi: '元', pinyin: 'yuán', meaningCn: '元', meaningEn: 'unit of currency, primary', strokeCount: 4, animation: 'https://bishun.gjcha.com/5143.gif' },
            { hanzi: '决', pinyin: 'jué', meaningCn: '决定', meaningEn: 'to decide', strokeCount: 7, animation: 'https://bishun.gjcha.com/51B3.gif' },
            { hanzi: '皮', pinyin: 'pí', meaningCn: '皮肤', meaningEn: 'skin', strokeCount: 5, animation: 'https://bishun.gjcha.com/76AE.gif' }
        ],
        'level-3-3': [
            { hanzi: '破', pinyin: 'pò', meaningCn: '打破', meaningEn: 'to break, to destroy', strokeCount: 10, animation: 'https://bishun.gjcha.com/7834.gif' },
            { hanzi: '布', pinyin: 'bù', meaningCn: '布料', meaningEn: 'cloth, fabric', strokeCount: 5, animation: 'https://bishun.gjcha.com/5E03.gif' },
            { hanzi: '打', pinyin: 'dǎ', meaningCn: '打击', meaningEn: 'to hit, to strike', strokeCount: 5, animation: 'https://bishun.gjcha.com/6253.gif' },
            { hanzi: '干', pinyin: 'gān', meaningCn: '干燥', meaningEn: 'dry', strokeCount: 3, animation: 'https://bishun.gjcha.com/5E72.gif' },
            { hanzi: '之', pinyin: 'zhī', meaningCn: '代词，表示“的”', meaningEn: 'possessive particle, "of"', strokeCount: 3, animation: 'https://bishun.gjcha.com/4E4B.gif' }
        ]
    };

    // 练习模式的所有汉字列表（去重）
    const allUniqueWords = [
        { hanzi: '造', pinyin: 'zào', meaningCn: '制造', meaningEn: 'to make, to build', strokeCount: 12, animation: 'https://bishun.gjcha.com/9020.gif' },
        { hanzi: '纸', pinyin: 'zhǐ', meaningCn: '纸张', meaningEn: 'paper', strokeCount: 7, animation: 'https://bishun.gjcha.com/7EB8.gif' },
        { hanzi: '代', pinyin: 'dài', meaningCn: '代替', meaningEn: 'to replace, to substitute', strokeCount: 5, animation: 'https://bishun.gjcha.com/4EE3.gif' },
        { hanzi: '把', pinyin: 'bǎ', meaningCn: '握住', meaningEn: 'to hold, to grasp', strokeCount: 7, animation: 'https://bishun.gjcha.com/628A.gif' },
        { hanzi: '竹', pinyin: 'zhú', meaningCn: '竹子', meaningEn: 'bamboo', strokeCount: 6, animation: 'https://bishun.gjcha.com/7AF9.gif' },
        { hanzi: '片', pinyin: 'piàn', meaningCn: '薄片', meaningEn: 'slice, piece', strokeCount: 4, animation: 'https://bishun.gjcha.com/7247.gif' },
        { hanzi: '便', pinyin: 'biàn', meaningCn: '方便', meaningEn: 'convenient', strokeCount: 9, animation: 'https://bishun.gjcha.com/4FBF.gif' },
        { hanzi: '元', pinyin: 'yuán', meaningCn: '元', meaningEn: 'unit of currency, primary', strokeCount: 4, animation: 'https://bishun.gjcha.com/5143.gif' },
        { hanzi: '决', pinyin: 'jué', meaningCn: '决定', meaningEn: 'to decide', strokeCount: 7, animation: 'https://bishun.gjcha.com/51B3.gif' },
        { hanzi: '皮', pinyin: 'pí', meaningCn: '皮肤', meaningEn: 'skin', strokeCount: 5, animation: 'https://bishun.gjcha.com/76AE.gif' },
        { hanzi: '破', pinyin: 'pò', meaningCn: '打破', meaningEn: 'to break, to destroy', strokeCount: 10, animation: 'https://bishun.gjcha.com/7834.gif' },
        { hanzi: '布', pinyin: 'bù', meaningCn: '布料', meaningEn: 'cloth, fabric', strokeCount: 5, animation: 'https://bishun.gjcha.com/5E03.gif' },
        { hanzi: '打', pinyin: 'dǎ', meaningCn: '打击', meaningEn: 'to hit, to strike', strokeCount: 5, animation: 'https://bishun.gjcha.com/6253.gif' },
        { hanzi: '干', pinyin: 'gān', meaningCn: '干燥', meaningEn: 'dry', strokeCount: 3, animation: 'https://bishun.gjcha.com/5E72.gif' },
        { hanzi: '之', pinyin: 'zhī', meaningCn: '代词，表示“的”', meaningEn: 'possessive particle, "of"', strokeCount: 3, animation: 'https://bishun.gjcha.com/4E4B.gif' }
    ];

    // 全局变量定义
    let score = 0;
    let totalScore = 0;
    let level1Score = 0;
    let level2Score = 0;
    let currentLevel = 1;
    let currentSubLevel = 1;
    let wrongWords = [];
    let level1WrongWords = [];
    let isFixingErrors = false;
    let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;
    let practiceIndex = 0;
    let practiceWords = [];
    let hanziWriter = null;
    let currentTab = 'stroke-tab';
    let isFlipped = false;

    // DOM 元素获取
    const modeSelection = document.getElementById('mode-selection');
    const currentScoreDisplay = document.getElementById('current-score');
    const totalScoreDisplay = document.getElementById('total-score');
    const levelDisplay = document.getElementById('level');
    const levelComplete = document.getElementById('level-complete');
    const levelScoreDisplay = document.getElementById('level-score');
    const levelTotal = document.getElementById('level-total');
    const levelTotalScoreDisplay = document.getElementById('level-total-score');
    const level1Errors = document.getElementById('level-1-errors');
    const wrongWordsList = document.getElementById('wrong-words-list');
    const hanziContainer = document.getElementById('hanzi-container');
    const pinyinContainer = document.getElementById('pinyin-container');
    const celebration = document.getElementById('celebration');
    const finalScoreDisplay = document.getElementById('final-score');
    const finalHighestScoreDisplay = document.getElementById('final-highest-score');
    const highestScoreDisplay = document.getElementById('highest-score');
    const practiceMode = document.getElementById('practice-mode');
    const gameMode = document.getElementById('game-mode');
    const practiceHanzi = document.getElementById('practice-hanzi');
    const practiceStrokes = document.getElementById('practice-strokes');
    const practiceAnimationGif = document.getElementById('practice-animation-gif');
    const animationFallback = document.getElementById('animation-fallback');
    const practiceAnimation = document.getElementById('practice-animation');
    const celebrateSound = document.getElementById('celebrate-sound');
    const controls = document.getElementById('controls');
    const flashcard = document.querySelector('.flashcard');
    const flashcardHanzi = document.getElementById('flashcard-hanzi');
    const flashcardPinyin = document.getElementById('flashcard-pinyin');
    const flashcardMeaning = document.getElementById('flashcard-meaning');

    // 检查关键 DOM 元素是否存在
    if (!highestScoreDisplay) {
        console.error("未找到 ID 为 'highest-score' 的元素，请检查 HTML！");
        return;
    }
    if (!modeSelection || !practiceMode || !gameMode) {
        console.error("缺少核心 DOM 元素（如 mode-selection, practice-mode, game-mode），请检查 HTML！");
        return;
    }

    // 初始化显示历史最高分数
    highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

    // 随机打乱数组
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 进入练习模式
    function startPracticeMode() {
        practiceIndex = 0;
        practiceWords = shuffle([...allUniqueWords]);
        modeSelection.style.display = 'none';
        gameMode.style.display = 'none';
        practiceMode.style.display = 'block';
        currentTab = 'stroke-tab';
        showTab(currentTab);
        showPracticeWord();
    }

    // 进入游戏模式
    function startGameMode() {
        modeSelection.style.display = 'none';
        practiceMode.style.display = 'none';
        gameMode.style.display = 'block';
        setLevel(currentLevel, currentSubLevel);
    }

    // 退出游戏模式
    function exitGameMode() {
        gameMode.style.display = 'none';
        practiceMode.style.display = 'none';
        modeSelection.style.display = 'block';
    }

    // 显示当前练习汉字
    function showPracticeWord() {
        const word = practiceWords[practiceIndex];
        
        practiceHanzi.textContent = word.hanzi;
        practiceStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;

        practiceAnimationGif.src = word.animation;
        practiceAnimationGif
