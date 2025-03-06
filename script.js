document.addEventListener('DOMContentLoaded', function() {
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
    const flashcard = document.querySelector('.flashcard');
    const flashcardHanzi = document.getElementById('flashcard-hanzi');
    const flashcardPinyin = document.getElementById('flashcard-pinyin');
    const flashcardMeaning = document.getElementById('flashcard-meaning');

    if (!highestScoreDisplay) {
        console.error("未找到 ID 为 'highest-score' 的元素，请检查 HTML！");
        return;
    }
    if (!modeSelection || !practiceMode || !gameMode) {
        console.error("缺少核心 DOM 元素（如 mode-selection, practice-mode, game-mode），请检查 HTML！");
        return;
    }

    highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

    // 初始化游戏模式
    setLevel(currentLevel, currentSubLevel);
    updateScoreDisplay();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

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

    function startGameMode() {
        modeSelection.style.display = 'none';
        practiceMode.style.display = 'none';
        gameMode.style.display = 'block';
        setLevel(currentLevel, currentSubLevel);
    }

    function exitGameMode() {
        gameMode.style.display = 'none';
        practiceMode.style.display = 'none';
        modeSelection.style.display = 'block';
    }

    function showPracticeWord() {
        const word = practiceWords[practiceIndex];
        
        practiceHanzi.textContent = word.hanzi;
        practiceStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;

        practiceAnimationGif.src = word.animation;
        practiceAnimationGif.style.display = 'block';
        animationFallback.style.display = 'none';

        if (typeof HanziWriter !== 'undefined') {
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
        } else {
            console.warn("HanziWriter 未加载，动画不可用");
        }

        flashcardHanzi.textContent = word.hanzi;
        flashcardPinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
        flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
        isFlipped = false;
        flashcard.classList.remove('flipped');
    }

    function showTab(tabId) {
        currentTab = tabId;
        const tabs = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tabs button');
        
        tabs.forEach(tab => tab.style.display = 'none');
        tabButtons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabId).style.display = 'block';
        const activeButton = Array.from(tabButtons).find(button => button.onclick.toString().includes(tabId));
        if (activeButton) activeButton.classList.add('active');
    }

    function flipCard() {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped', isFlipped);
    }

    function animateStrokeOrder() {
        if (hanziWriter) hanziWriter.animateCharacter();
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
        gameMode.style.display = 'block';
        modeSelection.style.display = 'block';
    }

    function updateScoreDisplay() {
        currentScoreDisplay.textContent = `当前关卡分数: ${score} (Current Level Score: ${score})`;
        totalScoreDisplay.textContent = `累计分数: ${totalScore} (Total Score: ${totalScore})`;
    }

    function saveGame() {
        const gameState = {
            score, totalScore, level1Score, level2Score,
            currentLevel, currentSubLevel, wrongWords,
            level1WrongWords, isFixingErrors
        };
        localStorage.setItem('chineseGameState', JSON.stringify(gameState));
        alert('游戏进度已保存！(Game Progress Saved!)');
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

        const hanziCards = Array.from(hanziContainer.children);
        const pinyinZones = Array.from(pinyinContainer.children);
        shuffle(hanziCards);
        shuffle(pinyinZones);
        hanziCards.forEach(card => hanziContainer.appendChild(card));
        pinyinZones.forEach(zone => pinyinContainer.appendChild(zone));

        bindDragAndDrop();
    }

    function setLevel(level, subLevel) {
        currentLevel = level;
        currentSubLevel = subLevel;
        levelDisplay.textContent = currentLevel === 3 
            ? `关卡 3：蔡伦造纸 ${currentSubLevel}/3 (Level 3: Cai Lun Invented the Paper ${currentSubLevel}/3)`
            : `当前关卡: ${currentLevel}-${currentSubLevel} (Current Level: ${currentLevel}-${currentSubLevel})`;
        
        let words = allWords[`level-${level}-${subLevel}`];
        if (wrongWords.length > 0) {
            words = [...words, ...wrongWords];
        }
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

        const hanziCards = Array.from(hanziContainer.children);
        const pinyinZones = Array.from(pinyinContainer.children);
        shuffle(hanziCards);
        shuffle(pinyinZones);
        hanziCards.forEach(card => hanziContainer.appendChild(card));
        pinyinZones.forEach(zone => pinyinContainer.appendChild(zone));

        bindDragAndDrop();
    }

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
                allWords['level-3-3'].forEach(word => correctMatch[word.hanzi] = word.pinyin);
                allWords['level-3-1'].forEach(word => correctMatch[word.hanzi] = word.pinyin);
                allWords['level-3-2'].forEach(word => correctMatch[word.hanzi] = word.pinyin);

                if (correctMatch[hanzi] === pinyin) {
                    score += 10;
                    zone.classList.add('correct');
                    zone.textContent = `${hanzi} - ${pinyin}`;
                    document.querySelector(`[data-hanzi="${hanzi}"]`).style.display = 'none';

                    const remainingCards = Array.from(cards).filter(card => card.style.display !== 'none');
                    if (remainingCards.length === 0) {
                        if (!isFixingErrors) {
                            totalScore += score;
                            if (currentLevel === 1) level1Score += score;
                            else if (currentLevel === 2) level2Score += score;
                        }

                        saveGame();

                        if (isFixingErrors) {
                            wrongWords = [];
                            level1WrongWords = [];
                            score = totalScore;
                            updateScoreDisplay();
                            levelTotal.style.display = 'block';
                            levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
                            setTimeout(() => setLevel(2, 1), 2000);
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
                                setTimeout(() => {
                                    celebration.style.display = 'none';
                                }, 3000);
                            }, 2000);
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
                                setTimeout(() => setLevel(2, 1), 2000);
                            }
                        } else if (currentLevel === 2 && currentSubLevel === 3) {
                            wrongWords = [];
                            score = totalScore;
                            updateScoreDisplay();
                            levelTotal.style.display = 'block';
                            levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
                            setTimeout(() => setLevel(3, 1), 2000);
                        } else {
                            let nextLevel = currentLevel;
                            let nextSubLevel = currentSubLevel + 1;
                            if (nextSubLevel > 3) {
                                nextLevel++;
                                nextSubLevel = 1;
                                wrongWords = [];
                                if (nextLevel === 2) {
                                    score = totalScore;
                                    updateScoreDisplay();
                                    levelTotal.style.display = 'block';
                                    levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
                                    setTimeout(() => setLevel(nextLevel, nextSubLevel), 2000);
                                    return;
                                } else if (nextLevel === 3) {
                                    score = totalScore;
                                    updateScoreDisplay();
                                    levelTotal.style.display = 'block';
                                    levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
                                    setTimeout(() => setLevel(nextLevel, nextSubLevel), 2000);
                                    return;
                                }
                            }
                            levelComplete.style.display = 'block';
                            levelScoreDisplay.textContent = `本关得分: ${score} (Sub-Level Score: ${score})`;
                            setTimeout(() => setLevel(nextLevel, nextSubLevel), 2000);
                        }
                    }
                } else {
                    score -= 5;
                    zone.classList.add('wrong');
                    setTimeout(() => zone.classList.remove('wrong'), 500);

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
});
