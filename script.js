let score = 0; // 当前小关分数
let totalScore = 0; // 累计总分
let level1Score = 0; // 关卡 1 总分
let level2Score = 0; // 关卡 2 总分
let currentLevel = 1; // 当前大关卡
let currentSubLevel = 1; // 当前小关卡
let wrongWords = []; // 记录错误汉字
let level1WrongWords = []; // 专门记录关卡 1 的错误汉字
let isFixingErrors = false; // 是否在修正关卡 1 错误模式
let highestScore = parseInt(localStorage.getItem('highestScore')) || 0; // 历史最高分数
let practiceIndex = 0; // 练习模式当前汉字索引
let practiceWords = []; // 练习模式汉字列表
let hanziWriter = null; // HanziWriter 实例
let currentTab = 'stroke-tab'; // 当前选项卡，默认为“笔画笔顺”
let isFlipped = false; // 字卡是否翻转

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
const highestScoreDiv = document.getElementById('highest-score');
const scoreDiv = document.getElementById('score');
const flashcard = document.querySelector('.flashcard');
const flashcardHanzi = document.getElementById('flashcard-hanzi');
const flashcardPinyin = document.getElementById('flashcard-pinyin');
const flashcardMeaning = document.getElementById('flashcard-meaning');

// 初始化显示历史最高分数
highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

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
    currentTab = 'stroke-tab'; // 默认显示“笔画笔顺”选项卡
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
    
    // 笔画笔顺选项卡内容
    practiceHanzi.textContent = word.hanzi;
    practiceStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;

    // 尝试加载 GIF 动画
    practiceAnimationGif.src = word.animation;
    practiceAnimationGif.style.display = 'block';
    animationFallback.style.display = 'none';

    // 初始化 Hanzi Writer（备用方案）
    if (hanziWriter) {
        hanziWriter.setCharacter(word.hanzi);
    } else {
        hanziWriter = HanziWriter.create('practice-animation', word.hanzi, {
            width: 150,
            height: 150,
            padding: 5,
            showOutline: true,
            strokeAnimationSpeed: 1,
            strokeHighlightSpeed: 0.5,
            highlightColor: '#FF0000'
        });
    }

    // 字卡选项卡内容
    flashcardHanzi.textContent = word.hanzi;
    flashcardPinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
    flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
    isFlipped = false;
    flashcard.classList.remove('flipped');
}

// 切换选项卡
function showTab(tabId) {
    currentTab = tabId;
    const tabs = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tabs button');
    
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).style.display = 'block';
    const activeButton = Array.from(tabButtons).find(button => button.onclick.toString().includes(tabId));
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// 翻转字卡
function flipCard() {
    isFlipped = !isFlipped;
    if (isFlipped) {
        flashcard.classList.add('flipped');
    } else {
        flashcard.classList.remove('flipped');
    }
}

// 播放笔顺动画（Hanzi Writer）
function animateStrokeOrder() {
    if (hanziWriter) {
        hanziWriter.animateCharacter();
    }
}

// 下一个练习汉字
function nextPracticeWord() {
    practiceIndex++;
    if (practiceIndex < practiceWords.length) {
        showPracticeWord();
    } else {
        exitPracticeMode();
    }
}

// 退出练习模式
function exitPracticeMode() {
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    modeSelection.style.display = 'block';
}

// 更新分数显示
function updateScoreDisplay() {
    currentScoreDisplay.textContent = `当前关卡分数: ${score} (Current Level Score: ${score})`;
    totalScoreDisplay.textContent = `累计分数: ${totalScore} (Total Score: ${totalScore})`;
}

// 保存游戏进度
function saveGame() {
    const gameState = {
        score: score,
        totalScore: totalScore,
        level1Score: level1Score,
        level2Score: level2Score,
        currentLevel: currentLevel,
        currentSubLevel: currentSubLevel,
        wrongWords: wrongWords,
        level1WrongWords: level1WrongWords,
        isFixingErrors: isFixingErrors
    };
    localStorage.setItem('chineseGameState', JSON.stringify(gameState));
    alert('游戏进度已保存！(Game Progress Saved!)');
}

// 加载游戏进度
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

        if (isFixingErrors) {
            fixLevel1Errors();
        } else {
            setLevel(currentLevel, currentSubLevel);
        }
        updateScoreDisplay();
    } else {
        alert('没有找到保存的进度！(No Saved Progress Found!)');
    }
}

// 重新开始游戏
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

// Try Again 功能：刷新页面
function tryAgain() {
    localStorage.removeItem('chineseGameState');
    location.reload();
}

// Done 功能：关闭网页
function done() {
    window.close();
}

// 修正关卡 1 的错误汉字
function fixLevel1Errors() {
    isFixingErrors = true;
    levelDisplay.textContent = `关卡 1 错误整理 (Level 1 Error Correction)`;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'block';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';

    // 显示错误汉字列表
    wrongWordsList.textContent = level1WrongWords.map(word => word.hanzi).join(' ');

    // 清空容器
    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';

    // 生成错误汉字卡片和拼音区域
    const shuffledWords = shuffle([...level1WrongWords]);
    shuffledWords.forEach(word => {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);

        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });

    // 打乱显示顺序
    const hanziCards = Array.from(hanziContainer.children);
    const pinyinZones = Array.from(pinyinContainer.children);
    shuffle(hanziCards);
    shuffle(pinyinZones);
    hanziCards.forEach(card => hanziContainer.appendChild(card));
    pinyinZones.forEach(zone => pinyinContainer.appendChild(zone));

    // 绑定拖放事件
    bindDragAndDrop();
}

// 设置关卡
function setLevel(level, subLevel) {
    currentLevel = level;
    currentSubLevel = subLevel;
    if (currentLevel === 3) {
        levelDisplay.textContent = `关卡 3：蔡伦造纸 ${currentSubLevel}/3 (Level 3: Cai Lun Invented the Paper ${currentSubLevel}/3)`;
    } else {
        levelDisplay.textContent = `当前关卡: ${currentLevel}-${currentSubLevel} (Current Level: ${currentLevel}-${currentSubLevel})`;
    }
    let words = allWords[`level-${level}-${subLevel}`];
    
    // 添加上一小关的错误汉字
    if (wrongWords.length > 0) {
        words = [...words, ...wrongWords];
    }
    wrongWords = []; // 重置错误汉字，准备记录当前小关的错误

    isFixingErrors = false;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'none';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';

    // 清空容器
    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';

    // 生成汉字卡片和拼音区域
    const shuffledWords = shuffle([...words]);
    shuffledWords.forEach(word => {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);

        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });

    // 打乱显示顺序
    const hanziCards = Array.from(hanziContainer.children);
    const pinyinZones = Array.from(pinyinContainer.children);
    shuffle(hanziCards);
    shuffle(pinyinZones);
    hanziCards.forEach(card => hanziContainer.appendChild(card));
    pinyinZones.forEach(zone => pinyinContainer.appendChild(zone));

    // 绑定拖放事件
    bindDragAndDrop();
}

// 拖放逻辑
function bindDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const dropZones = document.querySelectorAll('.drop-zone');

    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', card.getAttribute('data-hanzi'));
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => e.preventDefault());
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const hanzi = e.dataTransfer.getData('text');
            const pinyin = zone.getAttribute('data-pinyin');
            const correctMatch = {};
            // 使用关卡3-3的数据作为匹配基准
            allWords['level-3-3'].forEach(word => {
                correctMatch[word.hanzi] = word.pinyin;
            });
            allWords['level-3-1'].forEach(word => {
                correctMatch[word.hanzi] = word.pinyin;
            });
            allWords['level-3-2'].forEach(word => {
                correctMatch[word.hanzi] = word.pinyin;
            });

            if (correctMatch[hanzi] === pinyin) {
                score += 10;
                zone.classList.add('correct');
                zone.textContent = `${hanzi} - ${pinyin}`;
                document.querySelector(`[data-hanzi="${hanzi}"]`).style.display = 'none';

                // 检查是否全部匹配完成
                const remainingCards = Array.from(cards).filter(card => card.style.display !== 'none');
                if (remainingCards.length === 0) {
                    if (!isFixingErrors) {
                        totalScore += score; // 仅在非修正模式下累加总分
                        if (currentLevel === 1) {
                            level1Score += score; // 累加关卡 1 总分
                        } else if (currentLevel === 2) {
                            level2Score += score; // 累加关卡 2 总分
                        }
                    }

                    saveGame(); // 每次小关完成时自动保存

                    if (isFixingErrors) {
                        // 修正模式完成，进入关卡 2
                        wrongWords = [];
                        level1WrongWords = [];
                        score = totalScore; // 恢复总分到关卡 2
                        updateScoreDisplay();
                        levelTotal.style.display = 'block';
                        levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
                        setTimeout(() => {
                            setLevel(2, 1);
                        }, 2000);
                    } else if (currentLevel === 3 && currentSubLevel === 3) {
                        // 最后一小关完成，显示庆祝和最终分数
                        levelTotal.style.display = 'block';
                        levelTotalScoreDisplay.textContent = `关卡 3 总分: ${totalScore} (Level 3 Total Score: ${totalScore})`;
                        setTimeout(() => {
                            celebration.style.display = 'block';
                            levelTotal.style.display = 'none';
                            finalScoreDisplay.textContent = `最终分数: ${totalScore} (Final Score: ${totalScore})`;
                            // 更新历史最高分数
                            if (totalScore > highestScore) {
                                highestScore = totalScore;
                                localStorage.setItem('highestScore', highestScore);
                                highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
                            }
                            finalHighestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
                            celebrateSound.play();
                            // 3秒后停止音效
                            setTimeout(() => {
                                celebrateSound.pause();
                                celebrateSound.currentTime = 0; // 重置音效到开头
                            }, 3000);
                        }, 2000);
                    } else if (currentLevel === 1 && currentSubLevel === 3) {
                        // 关卡 1-3 完成，整理错误汉字
                        if (level1WrongWords.length > 0) {
                            fixLevel1Errors();
                        } else {
                            // 没有错误，直接进入关卡 2
                            wrongWords = [];
                            level1WrongWords = [];
                            score = totalScore; // 关卡 1 总分传递到关卡 2
                            updateScoreDisplay();
                            levelTotal.style.display = 'block';
                            levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
                            setTimeout(() => {
                                setLevel(2, 1);
                            }, 2000);
                        }
                    } else if (currentLevel === 2 && currentSubLevel === 3) {
                        // 关卡 2-3 完成，直接进入关卡 3
                        wrongWords = [];
                        score = totalScore; // 关卡 2 总分传递到关卡 3
                        updateScoreDisplay();
                        levelTotal.style.display = 'block';
                        levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
                        setTimeout(() => {
                            setLevel(3, 1);
                        }, 2000);
                    } else {
                        // 进入下一小关
                        let nextLevel = currentLevel;
                        let nextSubLevel = currentSubLevel + 1;
                        if (nextSubLevel > 3) {
                            nextLevel++;
                            nextSubLevel = 1;
                            wrongWords = []; // 大关卡切换时清空错误汉字
                            if (nextLevel === 2) {
                                score = totalScore; // 关卡 1 总分传递到关卡 2
                                updateScoreDisplay();
                                levelTotal.style.display = 'block';
                                levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
                                setTimeout(() => {
                                    setLevel(nextLevel, nextSubLevel);
                                }, 2000);
                                return;
                            } else if (nextLevel === 3) {
                                score = totalScore; // 关卡 2 总分传递到关卡 3
                                updateScoreDisplay();
                                levelTotal.style.display = 'block';
                                levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
                                setTimeout(() => {
                                    setLevel(nextLevel, nextSubLevel);
                                }, 2000);
                                return;
                            }
                        }
                        // 显示当前小关分数，2秒后进入下一关
                        levelComplete.style.display = 'block';
                        levelScoreDisplay.textContent = `本关得分: ${score} (Sub-Level Score: ${score})`;
                        setTimeout(() => {
                            setLevel(nextLevel, nextSubLevel);
                        }, 2000);
                    }
                }
            } else {
                score -= 5;
                zone.classList.add('wrong');
                setTimeout(() => zone.classList.remove('wrong'), 500);

                // 记录错误汉字
                const wrongWord = Object.values(correctMatch).find(word => word.hanzi === hanzi);
                if (!wrongWords.some(w => w.hanzi === hanzi)) {
                    wrongWords.push({ hanzi, pinyin });
                }
                if (currentLevel === 1 && !level1WrongWords.some(w => w.hanzi === hanzi)) {
                    level1WrongWords.push({ hanzi, pinyin });
                }
            }
            updateScoreDisplay();
        });
    });
}
