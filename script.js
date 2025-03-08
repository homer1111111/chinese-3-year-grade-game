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
let singleHanziWriter = null;
let isFlipped = false;

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
const flashcard = document.querySelector('.flashcard');
const flashcardHanzi = document.getElementById('flashcard-hanzi');
const flashcardPinyin = document.getElementById('flashcard-pinyin');
const flashcardMeaning = document.getElementById('flashcard-meaning');
const singleWordMode = document.getElementById('single-word-mode');
const singleWordList = document.getElementById('single-word-list');
const singleHanzi = document.getElementById('single-hanzi');
const singlePinyin = document.getElementById('single-pinyin');
const singleMeaning = document.getElementById('single-meaning');
const singleStrokes = document.getElementById('single-strokes');
const singleAnimationGif = document.getElementById('single-animation-gif');
const singleAnimationFallback = document.getElementById('single-animation-fallback');
const singleAnimation = document.getElementById('single-animation');
const articleMode = document.getElementById('article-mode');
const articleContent = document.getElementById('article-content');
const celebrateSound = document.getElementById('celebrate-sound');

highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startArticleMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'block';
    showArticleContent();
}

function showArticleContent() {
    let text = "古代没有纸，人们常常把字写在竹片上，很不方便。公元一〇五年，中国有个叫蔡伦的人，决心造出一种又好又方便的东西，给人们写字。他做了很多试验，把树皮、草和破布泡在水里，打成纸浆，再把纸浆铺上竹帘上。纸浆干了以后，拿下来就成了纸。纸是蔡伦发明的。造纸术是中国古代四大发明之一。";
    text = text.replace("树皮草", "树皮、草");
    const pinyinMap = {
        '古': 'gǔ', '代': 'dài', '没': 'méi', '有': 'yǒu', '纸': 'zhǐ', '人': 'rén', '们': 'men', '常': 'cháng', '把': 'bǎ', '字': 'zì', 
        '写': 'xiě', '在': 'zài', '竹': 'zhú', '片': 'piàn', '上': 'shàng', '很': 'hěn', '不': 'bù', '便': 'biàn', '公': 'gōng', '元': 'yuán', 
        '一': 'yī', '〇': 'líng', '五': 'wǔ', '年': 'nián', '中': 'zhōng', '国': 'guó', '个': 'gè', '叫': 'jiào', '蔡': 'cài', '伦': 'lún', 
        '决': 'jué', '心': 'xīn', '造': 'zào', '出': 'chū', '种': 'zhǒng', '又': 'yòu', '好': 'hǎo', '方': 'fāng', '便': 'biàn', '的': 'de', 
        '东': 'dōng', '西': 'xī', '给': 'gěi', '他': 'tā', '做': 'zuò', '了': 'le', '多': 'duō', '试': 'shì', '验': 'yàn', '树': 'shù', 
        '皮': 'pí', '草': 'cǎo', '和': 'hé', '破': 'pò', '布': 'bù', '泡': 'pào', '水': 'shuǐ', '里': 'lǐ', '打': 'dǎ', '成': 'chéng', 
        '浆': 'jiāng', '再': 'zài', '铺': 'pù', '帘': 'lián', '干': 'gān', '以': 'yǐ', '后': 'hòu', '拿': 'ná', '下': 'xià', '来': 'lái', 
        '就': 'jiù', '是': 'shì', '发': 'fā', '明': 'míng', '术': 'shù', '四': 'sì', '大': 'dà', '之': 'zhī'
    };
    const isChineseChar = char => /[\u4E00-\u9FFF]/.test(char);
    const chars = text.split('');
    let result = '';
    let lineCount = 0;
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (isChineseChar(char)) {
            const pinyin = pinyinMap[char] || '未知 (unknown)';
            result += `<span class="word-wrapper"><span class="word-item" data-hanzi="${char}"><span class="pinyin">${pinyin}</span><span class="hanzi">${char}</span></span></span>`;
        } else {
            result += `<span class="word-wrapper"><span class="non-hanzi">${char}</span></span>`;
        }
        if (window.innerWidth > 600) {
            lineCount++;
            if (lineCount === 17 && i < chars.length - 1) {
                result += '<br>';
                lineCount = 0;
            }
        }
    }
    articleContent.innerHTML = result;
}

// ... 其他变量和函数保持不变 ...

function stopArticleAudio() {
    const audio = document.getElementById('article-audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        console.log("课文音频已停止");
    }
}

function playArticleAudio() {
    const audio = document.getElementById('article-audio');
    const audioSrc = './audio/article.mp3';
    console.log("尝试加载课文音频:", audioSrc);
    
    audio.pause();
    audio.currentTime = 0;
    audio.src = audioSrc;

    audio.onloadeddata = () => {
        console.log("课文音频加载成功");
        audio.play()
            .then(() => console.log("课文音频开始播放"))
            .catch(error => console.error("播放课文失败:", error));
    };

    audio.onerror = () => {
        console.error("课文音频加载失败，可能路径错误或文件损坏");
    };

    audio.onended = () => {
        console.log("课文音频播放结束");
    };

    audio.load();
}

function startArticleMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'block';
    showArticleContent();
}

function startSingleWordMode() {
    stopArticleAudio();
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'block';
    showSingleWordList();
}

function startPracticeMode() {
    stopArticleAudio();
    practiceIndex = 0;
    practiceWords = shuffle([...allUniqueWords]);
    modeSelection.style.display = 'flex';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    practiceMode.style.display = 'block';
    showPracticeWord();
}

function startGameMode() {
    stopArticleAudio();
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    gameMode.style.display = 'block';
    setLevel(currentLevel, currentSubLevel);
}

function exitArticleMode() {
    stopArticleAudio();
    articleMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

// ... 其他函数保持不变 ...
function startSingleWordMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'block';
    showSingleWordList();
}

function showSingleWordList() {
    singleWordList.innerHTML = allUniqueWords.map(word => `
        <div class="word-item" data-hanzi="${word.hanzi}">
            <span class="pinyin">${word.pinyin}</span>
            <span class="hanzi">${word.hanzi}</span>
        </div>
    `).join('');
    singleHanzi.textContent = '';
    singlePinyin.textContent = '';
    singleMeaning.textContent = '';
    singleStrokes.textContent = '';
    singleAnimationGif.style.display = 'none';
    singleAnimationFallback.style.display = 'none';
    const wordItems = singleWordList.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        item.addEventListener('click', () => {
            const hanzi = item.getAttribute('data-hanzi');
            const word = allUniqueWords.find(w => w.hanzi === hanzi);
            if (word) {
                wordItems.forEach(i => i.classList.remove('highlight'));
                item.classList.add('highlight');
                singleHanzi.textContent = word.hanzi;
                singlePinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
                singleMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
                singleStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;
                singleAnimationGif.src = word.animation;
                singleAnimationGif.style.display = 'block';
                singleAnimationFallback.style.display = 'none';
                const audio = document.getElementById('single-word-audio');
                audio.src = `./audio/${word.hanzi}.mp3`;
                console.log(`加载音频: ./audio/${word.hanzi}.mp3`);
                audio.play().catch(error => console.error(`播放 ${word.hanzi} 失败:`, error));
                if (singleHanziWriter) {
                    singleHanziWriter.setCharacter(word.hanzi);
                } else {
                    singleHanziWriter = HanziWriter.create('single-animation', word.hanzi, {
                        width: window.innerWidth > 600 ? 150 : Math.min(150, window.innerWidth * 0.35),
                        height: window.innerWidth > 600 ? 150 : Math.min(150, window.innerWidth * 0.35),
                        padding: 5,
                        showOutline: true,
                        strokeAnimationSpeed: 1,
                        strokeHighlightSpeed: 0.5,
                        highlightColor: '#FF0000'
                    });
                }
            }
        });
    });
}

function animateSingleStrokeOrder() {
    if (singleHanziWriter) singleHanziWriter.animateCharacter();
}

function playSingleWordAudio() {
    const selectedHanzi = singleHanzi.textContent;
    if (selectedHanzi) {
        const audio = document.getElementById('single-word-audio');
        audio.src = `./audio/${selectedHanzi}.mp3`;
        console.log(`加载音频: ./audio/${selectedHanzi}.mp3`);
        audio.play().catch(error => console.error(`播放 ${selectedHanzi} 失败:`, error));
    } else {
        console.error("未选择任何汉字");
    }
}

function exitSingleWordMode() {
    singleWordMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function startPracticeMode() {
    practiceIndex = 0;
    practiceWords = shuffle([...allUniqueWords]);
    modeSelection.style.display = 'flex';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    practiceMode.style.display = 'block';
    showPracticeWord();
}

function showPracticeWord() {
    const word = practiceWords[practiceIndex];
    flashcardHanzi.textContent = word.hanzi;
    flashcardPinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
    flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
    const audio = document.getElementById('practice-word-audio');
    audio.src = `./audio/${word.hanzi}.mp3`;
    console.log(`加载音频: ./audio/${word.hanzi}.mp3`);
    isFlipped = false;
    flashcard.classList.remove('flipped');
}

function flipCard() {
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
}

function playPracticeWordAudio() {
    const audio = document.getElementById('practice-word-audio');
    console.log(`加载音频: ${audio.src}`);
    audio.play().catch(error => console.error("播放练习音频失败:", error));
}

function nextPracticeWord() {
    practiceIndex++;
    if (practiceIndex < practiceWords.length) {
        showPracticeWord();
    } else {
        exitPracticeMode();
    }
}

function exitPracticeMode() {
    practiceMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function startGameMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    gameMode.style.display = 'block';
    setLevel(currentLevel, currentSubLevel);
}

function exitGameMode() {
    gameMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function updateScoreDisplay() {
    currentScoreDisplay.textContent = `当前关卡分数: ${score} (Current Level Score: ${score})`;
    totalScoreDisplay.textContent = `累计分数: ${totalScore} (Total Score: ${totalScore})`;
}

function saveGame() {
    const gameState = { score, totalScore, level1Score, level2Score, currentLevel, currentSubLevel, wrongWords, level1WrongWords, isFixingErrors };
    localStorage.setItem('chineseGameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = localStorage.getItem('chineseGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        score = gameState.score;
        totalScore = gameState.totalScore;
        level1Score = gameState.level1Score;
        level2Score = gameState.level2Score;
        currentLevel = gameState.currentLevel;
        currentSubLevel = gameState.currentSubLevel;
        wrongWords = gameState.wrongWords;
        level1WrongWords = gameState.level1WrongWords;
        isFixingErrors = gameState.isFixingErrors;
        if (isFixingErrors) fixLevel1Errors();
        else setLevel(currentLevel, currentSubLevel);
        updateScoreDisplay();
    } else {
        alert('没有找到保存的进度！(No Saved Progress Found!)');
    }
}

function startOver() {
    localStorage.removeItem('chineseGameState');
    score = 0;
    totalScore = 0;
    level1Score = 0;
    level2Score = 0;
    currentLevel = 1;
    currentSubLevel = 1;
    wrongWords = [];
    level1WrongWords = [];
    isFixingErrors = false;
    setLevel(1, 1);
}

function tryAgain() {
    localStorage.removeItem('chineseGameState');
    location.reload();
}

function done() {
    window.close();
}

function fixLevel1Errors() {
    isFixingErrors = true;
    levelDisplay.textContent = `关卡 1 错误整理 (Level 1 Error Correction)`;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'block';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';
    wrongWordsList.textContent = level1WrongWords.map(word => word.hanzi).join(' ');
    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';
    const shuffledHanzi = shuffle([...level1WrongWords]);
    const shuffledPinyin = shuffle([...level1WrongWords]);
    shuffledHanzi.forEach(word => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);
    });
    shuffledPinyin.forEach(word => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });
    bindTapEvents();
}

function setLevel(level, subLevel) {
    currentLevel = level;
    currentSubLevel = subLevel;
    levelDisplay.textContent = currentLevel === 3 ? 
        `关卡 3：蔡伦造纸 ${currentSubLevel}/3 (Level 3: Cai Lun Invented the Paper ${currentSubLevel}/3)` : 
        `当前关卡: ${currentLevel}-${currentSubLevel} (Current Level: ${currentLevel}-${currentSubLevel})`;
    
    let words = allWords[`level-${level}-${subLevel}`];
    if (wrongWords.length > 0) words = [...words, ...wrongWords];
    wrongWords = [];

    isFixingErrors = false;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'none';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';

    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';

    const shuffledHanzi = shuffle([...words]);
    const shuffledPinyin = shuffle([...words]);

    shuffledHanzi.forEach(word => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);
    });

    shuffledPinyin.forEach(word => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });

    bindTapEvents();
}

function bindTapEvents() {
    const cards = document.querySelectorAll('.card');
    const dropZones = document.querySelectorAll('.drop-zone');
    let selectedCard = null;
    let selectedZone = null;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (selectedCard) selectedCard.classList.remove('selected');
            if (selectedZone) selectedZone.classList.remove('selected');
            selectedCard = card;
            selectedZone = null;
            card.classList.add('selected');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('click', () => {
            if (!selectedCard) {
                if (selectedZone) selectedZone.classList.remove('selected');
                selectedZone = zone;
                zone.classList.add('selected');
                return;
            }

            const hanzi = selectedCard.getAttribute('data-hanzi');
            const pinyin = zone.getAttribute('data-pinyin');
            const correctMatch = {};
            Object.keys(allWords).forEach(level => {
                allWords[level].forEach(word => {
                    correctMatch[word.hanzi] = word.pinyin;
                });
            });

            if (correctMatch[hanzi] === pinyin) {
                score += 10;
                const remainingCards = Array.from(cards).filter(c => c.style.display !== 'none');

                if (remainingCards.length === 1) {
                    selectedCard.classList.remove('selected');
                    selectedCard.classList.add('correct');
                    zone.classList.remove('selected');
                    zone.classList.add('correct');
                    zone.textContent = `${hanzi} - ${pinyin}`;
                    selectedCard.style.display = 'none';
                    selectedCard = null;

                    setTimeout(() => {
                        saveGame();
                        handleLevelComplete();
                    }, 1000);
                } else {
                    selectedCard.classList.remove('selected');
                    selectedCard.classList.add('correct');
                    zone.classList.remove('selected');
                    zone.classList.add('correct');
                    zone.textContent = `${hanzi} - ${pinyin}`;
                    selectedCard.style.display = 'none';
                    selectedCard = null;

                    if (remainingCards.length - 1 === 0) {
                        handleLevelComplete();
                    }
                }
            } else {
                score -= 5;
                zone.classList.add('wrong');
                setTimeout(() => zone.classList.remove('wrong'), 500);

                const wrongWord = allUniqueWords.find(w => w.hanzi === hanzi);
                if (wrongWord && !wrongWords.some(w => w.hanzi === hanzi)) wrongWords.push(wrongWord);
                if (currentLevel === 1 && wrongWord && !level1WrongWords.some(w => w.hanzi === hanzi)) level1WrongWords.push(wrongWord);
                selectedCard.classList.remove('selected');
                selectedCard = null;
            }
            updateScoreDisplay();
        });
    });
}

function handleLevelComplete() {
    if (!isFixingErrors) {
        totalScore += score;
        if (currentLevel === 1) level1Score += score;
        else if (currentLevel === 2) level2Score += score;
    }

    if (isFixingErrors) {
        wrongWords = [];
        level1WrongWords = [];
        score = totalScore;
        updateScoreDisplay();
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
        setTimeout(() => setLevel(2, 1), 1000);
    } else if (currentLevel === 3 && currentSubLevel === 3) {
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 3 总分: ${totalScore} (Level 3 Total Score: ${totalScore})`;
        setTimeout(() => {
            celebration.style.display = 'block';
            levelTotal.style.display = 'none';
            finalScoreDisplay.textContent = `最终分数: ${totalScore} (Final Score: ${totalScore})`;
            if (totalScore > highestScore) {
                highestScore = totalScore;
                localStorage.setItem('highestScore', highestScore);
                highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
            }
            finalHighestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
            celebrateSound.play();
            setTimeout(() => { celebrateSound.pause(); celebrateSound.currentTime = 0; }, 3000);
        }, 1000);
    } else if (currentLevel === 1 && currentSubLevel === 3) {
        if (level1WrongWords.length > 0) {
            fixLevel1Errors();
        } else {
            wrongWords = [];
            level1WrongWords = [];
            score = totalScore;
            updateScoreDisplay();
            levelTotal.style.display = 'block';
            levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
            setTimeout(() => setLevel(2, 1), 1000);
        }
    } else if (currentLevel === 2 && currentSubLevel === 3) {
        wrongWords = [];
        score = totalScore;
        updateScoreDisplay();
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
        setTimeout(() => setLevel(3, 1), 1000);
    } else {
        let nextLevel = currentLevel;
        let nextSubLevel = currentSubLevel + 1;
        if (nextSubLevel > 3) {
            nextLevel++;
            nextSubLevel = 1;
            wrongWords = [];
            if (nextLevel === 2 || nextLevel === 3) {
                score = totalScore;
                updateScoreDisplay();
                levelTotal.style.display = 'block';
                levelTotalScoreDisplay.textContent = `关卡 ${nextLevel - 1} 总分: ${nextLevel === 2 ? level1Score : totalScore} (Level ${nextLevel - 1} Total Score: ${nextLevel === 2 ? level1Score : totalScore})`;
                setTimeout(() => setLevel(nextLevel, nextSubLevel), 1000);
                return;
            }
        }
        levelComplete.style.display = 'block';
        levelScoreDisplay.textContent = `本关得分: ${score} (Sub-Level Score: ${score})`;
        setTimeout(() => setLevel(nextLevel, nextSubLevel), 1000);
    }
}
