// 定义全局变量
const modeSelection = document.getElementById('mode-selection');
const articleMode = document.getElementById('article-mode');
const singleWordMode = document.getElementById('single-word-mode');
const practiceMode = document.getElementById('practice-mode');
const gameMode = document.getElementById('game-mode');
const singleWordList = document.getElementById('single-word-list');
const singleHanzi = document.getElementById('single-hanzi');
const singlePinyin = document.getElementById('single-pinyin');
const singleMeaning = document.getElementById('single-meaning');
const singleStrokes = document.getElementById('single-strokes');
const singleAnimationGif = document.getElementById('single-animation-gif');
const singleAnimationFallback = document.getElementById('single-animation-fallback');
let singleHanziWriter = null;
let practiceIndex = 0;
let practiceWords = [];
let currentLevel = 1;
let currentSubLevel = 1;

// 单词数据（示例，替换为你的实际数据）
const allUniqueWords = [
    { hanzi: '代', pinyin: 'dài', meaningCn: '代替', meaningEn: 'replace', strokeCount: 5, animation: 'https://example.com/代.gif' },
    { hanzi: '纸', pinyin: 'zhǐ', meaningCn: '纸张', meaningEn: 'paper', strokeCount: 7, animation: 'https://example.com/纸.gif' },
    // 添加更多单词...
];

// 状态变量
let hasPlayedArticle = false; // 标记是否播放过课文
let clickCountInModes = 0; // 跟踪单字/练习模式内的点击次数
let clickListener = null; // 存储全局监听器引用

// 停止所有音频
function stopAllAudio() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        if (audio) {
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.src = '';
                audio.load();
                audio.muted = true;
                console.log(`音频 ${audio.id || '无ID'} 已停止并重置，当前状态: paused=${audio.paused}`);
                setTimeout(() => audio.muted = false, 100);
            } catch (error) {
                console.error(`停止音频 ${audio.id || '无ID'} 失败:`, error);
            }
        }
    });
}

// 播放课文音频
function playArticleAudio() {
    const audio = document.getElementById('article-audio');
    const audioSrc = './audio/article.mp3';
    console.log("尝试加载课文音频:", audioSrc);
    
    stopAllAudio(); // 播放前停止所有音频
    audio.src = audioSrc;

    audio.onloadeddata = () => {
        console.log("课文音频加载成功");
        audio.play()
            .then(() => {
                console.log("课文音频开始播放");
                hasPlayedArticle = true; // 标记已播放
            })
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

// 播放单字音频
function playSingleWordAudio() {
    const selectedHanzi = singleHanzi.textContent;
    if (selectedHanzi) {
        const audio = document.getElementById('single-word-audio');
        const audioSrc = `./audio/${selectedHanzi}.mp3`;
        console.log(`加载单字音频: ${audioSrc}`);
        audio.src = audioSrc;
        audio.play().catch(error => {
            console.error(`播放 ${selectedHanzi} 失败:`, error);
            alert(`音频文件 ${selectedHanzi}.mp3 未找到，请联系管理员上传。`);
        });
    } else {
        console.error("未选择任何汉字");
    }
}

// 播放练习模式音频
function playPracticeWordAudio() {
    const audio = document.getElementById('practice-word-audio');
    const word = practiceWords[practiceIndex];
    const audioSrc = `./audio/${word.hanzi}.mp3`;
    console.log(`加载练习音频: ${audioSrc}`);
    audio.src = audioSrc;
    audio.play().catch(error => console.error("播放练习音频失败:", error));
}

// 动画笔顺
function animateSingleStrokeOrder() {
    if (singleHanziWriter) {
        singleHanziWriter.animateCharacter();
    }
}

// 显示课文内容
function showArticleContent() {
    const articleContent = document.getElementById('article-content');
    const text = "古代没有纸，人们常常把字写在竹片上，很不方便。公元一〇五年，中国有个叫蔡伦的人，决心造出一种又好又方便的东西，给人们写字。他做了很多试验，把树皮、草和破布泡在水里，打成纸浆，再把纸浆铺上竹帘上。纸浆干了以后，拿下来就成了纸。纸是蔡伦发明的。造纸术是中国古代四大发明之一。";
    articleContent.innerHTML = text.split('').map(char => {
        const word = allUniqueWords.find(w => w.hanzi === char);
        if (word) {
            return `<span class="word-wrapper"><span class="word-item"><span class="pinyin">${word.pinyin}</span><span class="hanzi">${char}</span></span></span>`;
        }
        return `<span class="non-hanzi">${char}</span>`;
    }).join('');
}

// 显示单字列表
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
                playSingleWordAudio();
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

// 显示练习模式单词
function showPracticeWord() {
    const flashcardHanzi = document.getElementById('flashcard-hanzi');
    const flashcardPinyin = document.getElementById('flashcard-pinyin');
    const flashcardMeaning = document.getElementById('flashcard-meaning');
    const word = practiceWords[practiceIndex];
    flashcardHanzi.textContent = word.hanzi;
    flashcardPinyin.textContent = `拼音: ${word.pinyin}`;
    flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
    const audio = document.getElementById('practice-word-audio');
    audio.src = `./audio/${word.hanzi}.mp3`;
}

// 翻转卡片
function flipCard() {
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.toggle('flipped');
}

// 下一个练习单词
function nextPracticeWord() {
    practiceIndex++;
    if (practiceIndex < practiceWords.length) {
        showPracticeWord();
        document.querySelector('.flashcard').classList.remove('flipped');
    } else {
        exitPracticeMode();
    }
}

// 模式切换函数
function startArticleMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'block';
    showArticleContent();
}

function startSingleWordMode() {
    console.log("开始切换到单字模式");
    if (hasPlayedArticle) {
        stopAllAudio(); // 离开课文模式停止音频
    }
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'block';
    showSingleWordList();
    console.log("完成切换到单字模式");
}

function startPracticeMode() {
    console.log("开始切换到练习模式");
    if (hasPlayedArticle) {
        stopAllAudio(); // 离开课文模式停止音频
    }
    practiceIndex = 0;
    practiceWords = shuffle([...allUniqueWords]);
    modeSelection.style.display = 'flex';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    practiceMode.style.display = 'block';
    showPracticeWord();
    console.log("完成切换到练习模式");
}

function startGameMode() {
    console.log("开始切换到游戏模式");
    if (hasPlayedArticle) {
        stopAllAudio(); // 离开课文模式停止音频
    }
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    gameMode.style.display = 'block';
    setLevel(currentLevel, currentSubLevel);
    console.log("完成切换到游戏模式");
}

function exitArticleMode() {
    console.log("开始退出课文模式");
    if (hasPlayedArticle) {
        stopAllAudio(); // 离开课文模式停止音频
    }
    articleMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
    console.log("完成退出课文模式");
}

function exitSingleWordMode() {
    singleWordMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function exitPracticeMode() {
    practiceMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function exitGameMode() {
    gameMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

// 游戏模式相关函数（示例）
function setLevel(level, subLevel) {
    // 实现游戏逻辑
    console.log(`设置关卡: ${level}-${subLevel}`);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 初始化全局点击监听器
function setupClickListener() {
    if (!clickListener) {
        clickListener = function(event) {
            const playButton = document.getElementById('play-pause-button');
            const singleWordMode = document.getElementById('single-word-mode');
            const practiceMode = document.getElementById('practice-mode');

            if (hasPlayedArticle) {
                if (event.target !== playButton && !playButton.contains(event.target)) {
                    console.log("检测到非播放课文按钮点击，停止所有音频");
                    stopAllAudio();
                } else {
                    console.log("点击课文播放按钮，不停止音频");
                }

                // 检查是否在单字或练习模式内第二次点击
                if ((singleWordMode.style.display === 'block' || practiceMode.style.display === 'block')) {
                    clickCountInModes++;
                    console.log("单字/练习模式内点击次数:", clickCountInModes);
                    if (clickCountInModes >= 2) {
                        console.log("第二次点击单字/练习模式内容，移除全局点击监听器");
                        document.removeEventListener('click', clickListener);
                        clickListener = null;
                    }
                }
            }
        };
        document.addEventListener('click', clickListener);
        console.log("全局点击监听器已启用");
    }
}

// 在页面加载时设置监听器
document.addEventListener('DOMContentLoaded', setupClickListener);
