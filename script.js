let html5QrCode = null;
let currentQrCode = null;
let currentPage = 1;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const devMode = true;

const ASSETS = {
    page_start: "assets/page_start.png",
    orange:     "assets/bad_guy/orange.png",
    cake:       "assets/bad_guy/cake.png",
    chips:      "assets/bad_guy/chips.png",
    chocolate:  "assets/bad_guy/chocolate.png",
    cookie:     "assets/bad_guy/cookie.png",
    milktea:    "assets/bad_guy/milktea.png",
    candy:      "assets/bad_guy/candy.png",
    juice:      "assets/bad_guy/juice.png",
    soda:       "assets/bad_guy/soda.png",
    background:   "assets/background.webm",
    waving: "assets/waving.webm",
    de:     "assets/de.webm",
    dialog:    "assets/dialog.png",
    game_start: "assets/game_start.png",
    game_bg:    "assets/game_bg.png",
    score_0:    "assets/score/score_0.png",
    score_1:    "assets/score/score_1.png",
    score_2:    "assets/score/score_2.png",
    score_3:    "assets/score/score_3.png",
    score_4:    "assets/score/score_4.png",
    score_5:    "assets/score/score_5.png",
    game_result: "assets/game_result.png",
    bar1:    "assets/bar/bar1.png",
    bar2:    "assets/bar/bar2.png",
    bar3:    "assets/bar/bar3.png",
    bar4:    "assets/bar/bar4.png",
    bar5:    "assets/bar/bar5.png",
    question_bg: "assets/question_bg.png",
    home_button: "assets/home_icon.png",
    q1_0: "assets/q1/q1_0.png",
    q1_1: "assets/q1/q1_1.png",
    q1_2: "assets/q1/q1_2.png",
    q2_0: "assets/q2/q2_0.png",
    q2_1: "assets/q2/q2_1.png",
    q2_2: "assets/q2/q2_2.png",
    q3_0: "assets/q3/q3_0.png",
    q3_1: "assets/q3/q3_1.png",
    q3_2: "assets/q3/q3_2.png",
    q4_0: "assets/q4/q4_0.png",
    q4_1: "assets/q4/q4_1.png",
    q4_2: "assets/q4/q4_2.png",
    q5_0: "assets/q5/q5_0.png",
    q5_1: "assets/q5/q5_1.png",
    q5_2: "assets/q5/q5_2.png",
    end: "assets/end.webm",
    music_1: "assets/music_1.mp3",
    music_2: "assets/music_2.mp3",
    music_game: "assets/music_game.mp3",
    button_click: "assets/button_click.mp3"

};

const audio = {
    music1: new Audio(ASSETS.music_1),
    music2: new Audio(ASSETS.music_2),
    musicGame: new Audio(ASSETS.music_game),
    buttonClick: new Audio(ASSETS.button_click)
};

audio.music1.loop = true;
audio.music2.loop = true;
audio.musicGame.loop = true;
audio.buttonClick.volume = 1;
audio.music1.volume = 0.7;
audio.music2.volume = 0.7;
audio.musicGame.volume = 0.7;

const questions = [
  {
    question: "為了守護牙齒王國，點心時間哪一個決定最能阻止壞蛋進攻？",
    options: ["A. 含住棒棒糖，直到它在嘴裡融化 ",
              "B. 吃餅乾後，再配奶茶增加味道", 
              "C. 吃完蛋捲後，再喝白開水"
            ],
    correct: 2,
    responses: [
      {
        text: "不！壞蛋入侵",
        explain: "含住棒棒糖只會加速壞蛋們進攻的速度！吃完點心後要先喝白開水，減少口腔糖份並帶走食物殘渣！"
      },
      {
        text: "不！壞蛋入侵",
        explain: "餅乾碎屑會先卡在牙齒縫隙中，這時再來一杯甜滋滋的奶茶，壞蛋只會更容易進攻...吃完東西線漱口吧"
      },
      {
        text: "你答對了！",
        explain: "喝白開水能減少口腔內的糖分並帶走食物殘渣。有效降低酸性，阻止壞蛋聚集在牙齒表面！"
      }
    ]
  },
  {
    question: "在牙齒王國裡，最堅硬、保護房屋不被破壞的「外牆」材料是什麼？",
    options: ["A. 琺瑯質",
              "B. 象牙質", 
              "C. 牙髓"
            ],
    correct: 0,
    responses: [
      {
        text: "你答對了！",
        explain: "琺瑯質屋頂是人體最堅硬的材料！如果這層牆壁被酸腐蝕壞了，牙齒房屋內部就會失去保護。"
      },
      {
        text: "再複習一次！",
        explain: "琺瑯質屋頂是人體最堅硬的材料！如果這層牆壁被酸腐蝕壞了，牙齒房屋內部就會失去保護。"
      },
      {
        text: "再複習一次！",
        explain: "琺瑯質屋頂是人體最堅硬的材料！如果這層牆壁被酸腐蝕壞了，牙齒房屋內部就會失去保護。"
      }
    ]
  },
  {
    question: "偵探在案發現場發現了隱形腳印！這些不容易被察覺的腳印其實是什麼?",
    options: ["A. 牙膏",
              "B. 牙線", 
              "C. 牙菌斑"
            ],
    correct: 2,
    responses: [
      {
        text: "再複習一次！",
        explain: "牙菌斑是透明、有黏性的細菌膜，肉眼難看到，但用紫外光一照，就能追蹤壞蛋在牙齒王國的蹤跡！"
      },
      {
        text: "再複習一次！",
        explain: "牙菌斑是透明、有黏性的細菌膜，肉眼難看到，但用紫外光一照，就能追蹤壞蛋在牙齒王國的蹤跡！"
      },
      {
        text: "你答對了！",
        explain: "牙菌斑是透明、有黏性的細菌膜，肉眼難看到，但用紫外光一照，就能追蹤壞蛋在牙齒王國的蹤跡！"
      }
    ]
  },
  {
    question: "為什麼酸酸又甜甜的食物壞蛋最危險？",
    options: ["A. 因為他們會侵蝕舌頭",
              "B. 因為它們會吸引細菌聚集", 
              "C. 因為他們會讓牙齒房屋隱形"
            ],
    correct: 1,
    responses: [
      {
        text: "再複習一次！",
        explain: "糖分會吸引細菌，並提供能量產生酸；而酸性食物會直接軟化琺瑯質，讓牙齒防禦力下降！"
      },
      {
        text: "你答對了！",
        explain: "糖分會吸引細菌，並提供能量產生酸；而酸性食物會直接軟化琺瑯質，讓牙齒防禦力下降！"
      },
      {
        text: "再複習一次！",
        explain: "糖分會吸引細菌，並提供能量產生酸；而酸性食物會直接軟化琺瑯質，讓牙齒防禦力下降！"
      }
    ]
  },
  {
    question: "小偵探！我們完成了所有搜查。請問在調查過程中，你覺得守護牙齒王國「最基本、也最重要」的方法是什麼？",
    options: ["A. 注意生活飲食，不讓壞蛋用酸性物質來破壞牙齒房屋",
              "B. 每天吃很多糖果，再找最強的牙醫來修補屋頂", 
              "C. 每天用力刷牙一百次，把外牆刷得亮晶晶"
            ],
    correct: 0,
    responses: [
      {
        text: "你很有概念",
        explain: "最基本的方法就是注意飲食習慣，減少酸性物質長時間對牙齒屋頂的直接侵蝕！你學會了呢！"
      },
      {
        text: "不！不是這樣",
        explain: "最基本的方法就是注意飲食習慣、減少酸性物質長時間對牙齒屋頂的直接侵蝕！請你記住！"
      },
      {
        text: "不！請仔細讀",
        explain: "每天刷牙固然重要，但是最基本的還是注意飲食，減少酸性物質長時間對牙齒屋頂的直接侵蝕！"
      }
    ]
  }
];

function preloadAssets() {
    Object.values(ASSETS).forEach(src => new Image().src = src);
}

const imageMap = {
    "orange": ASSETS.orange,
    "cake": ASSETS.cake,
    "chips": ASSETS.chips,
    "chocolate": ASSETS.chocolate,
    "cookie": ASSETS.cookie,
    "milktea": ASSETS.milktea,
    "candy": ASSETS.candy,
    "juice": ASSETS.juice,
    "soda": ASSETS.soda
};

document.addEventListener("DOMContentLoaded", () => {
    preloadAssets();
    document.getElementById("startPageImage").src = ASSETS.page_start;

    const startPageImage = document.getElementById("startPageImage");
    const restartBtn = document.getElementById("restartBtn");
    const stopBtn = document.getElementById("stopBtn");
    const gameStartBtn = document.getElementById("gameStartBtn");
    const pageScreen = document.getElementById("pageScreen");

    startPageImage.addEventListener("click", startScanFlow);
    restartBtn.addEventListener("click", resetToStart);
    stopBtn.addEventListener("click", stopScanning);
    gameStartBtn.addEventListener("click", startGame);
    pageScreen.addEventListener("click", nextPage);

    // home button
    const homeBtn = document.getElementById("homeBtn");
    homeBtn.querySelector("img").src = ASSETS.home_button;
    homeBtn.addEventListener("click", resetToStart);
});

function startScanFlow() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("scannerScreen").style.display = "flex";

    if (devMode) {
        simulateScan("orange");
    } else {
        startScanning();
    }
}

function simulateScan(decodedText) {
    setTimeout(() => onScanSuccess(decodedText), 600);
}

function startScanning() {
    html5QrCode = new Html5Qrcode("scanner");
    const config = { fps: 12, qrbox: { width: 280, height: 280 }, aspectRatio: 1.0 };

    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, () => {})
        .catch(() => {
            alert("無法開啟鏡頭！");
            resetToStart();
        });
}

function onScanSuccess(decodedText) {
    stopScanning();

    const imgSrc = imageMap[decodedText] || ASSETS.test_result;
    document.getElementById("displayImage").src = imgSrc;

    document.getElementById("message").innerHTML = `
        掃描成功！<br>
        <strong>QR 內容：</strong> ${decodedText}<br><br>
        <small style="opacity:0.7;">點擊圖片區域進入下一頁</small>
    `;

    document.getElementById("scannerScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "flex";

    const resultContent = document.querySelector("#resultScreen .result-content");
    resultContent.style.cursor = "pointer";

    resultContent.onclick = (e) => {
        if (e.target.id === "restartBtn") return;

        document.getElementById("resultScreen").style.display = "none";
        document.getElementById("pageScreen").style.display = "flex";
        showCurrentPage();
    };
}

function onScanError() { }

function stopScanning() {
    if (html5QrCode) {
        html5QrCode.stop().catch(() => {});
        html5QrCode = null;
    }
}


// 打字機效果 - 支援 <br> 換行
function typeWriter(element, htmlText, speed = 55, callback) {
    element.innerHTML = '';
    let i = 0;
    const text = htmlText.replace(/<br>/g, '\n');  // 把 <br> 轉成換行符號

    function type() {
        if (i < text.length) {
            let char = text.charAt(i);
            
            if (char === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += char;
            }
            
            i++;
            setTimeout(type, speed);
        } else if (callback) {
          callback();
        }
    }
    type();
}

function showCurrentPage() {
    const pageScreen = document.getElementById("pageScreen");
    const gameStartBtn = document.getElementById("gameStartBtn");
    const bgVideo = document.getElementById("bgVideo");
    const wavingVideo = document.getElementById("wavingVideo");
    const dialogImage = document.getElementById("dialogImage");
    const dialogText = document.getElementById("dialogText");
    const pageImage = document.getElementById("pageImage");

    gameStartBtn.style.display = "none";

    pageScreen.style.background = "";
    pageScreen.style.backgroundImage = "";
    pageScreen.style.backgroundColor = "#000";

    bgVideo.style.display = "none";
    wavingVideo.style.display = "none";
    dialogImage.style.display = "none";
    dialogText.style.display = "none";
    pageImage.style.display = "none";

    console.log(`currentPage: ${currentPage}`);

    if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
        if (currentPage === 1) {
            audio.music1.currentTime = 0;
            audio.music1.play().catch(() => {});
        }

        bgVideo.style.display = "block";
        wavingVideo.style.display = "block";
        dialogImage.style.display = "block";
        dialogText.style.display = "block";

        bgVideo.src = ASSETS.background;
        if (currentPage === 3) {
            wavingVideo.src = ASSETS.de;
            wavingVideo.style.bottom = "5%";
        }
        else {
            wavingVideo.src = ASSETS.waving;
            wavingVideo.style.bottom = "-10%";
        }
        dialogImage.src = ASSETS.dialog;

        bgVideo.play();
        wavingVideo.play();

        const dialogContents = {
            1: { name: "歐羅：", content: "恭喜你抓到破壞王國的小壞蛋！<br>他們看似可愛、好吃，實則具有破壞力..." },
            2: { name: "歐羅：", content: "接下來有個測驗能知道你的偵探能力，<br>你要試試看嗎?" },
            3: { name: "你：", content: "當然！ 經過一連串的搜查，<br>我對自己的偵探能力有自信！" }
        };

        const currentDialog = dialogContents[currentPage];
        if (currentDialog) {
            const nameHTML = `<span class="name">${currentDialog.name}</span>`;
            let contentElement = dialogText.querySelector('.content');
            
            if (!contentElement) {
                contentElement = document.createElement('span');
                contentElement.className = 'content';
                dialogText.appendChild(contentElement);
            }

            dialogText.innerHTML = nameHTML;
            dialogText.appendChild(contentElement);

            const pageScreen = document.getElementById("pageScreen");
            pageScreen.style.pointerEvents = "none";

            typeWriter(contentElement, currentDialog.content, 55, () => {
                pageScreen.style.pointerEvents = "auto";
            });
        }

        pageScreen.style.pointerEvents = "auto";

    } else if (currentPage === 4) {
        console.log("進入遊戲開始頁面");
        audio.music1.pause();
        
        pageImage.src = ASSETS.game_start;
        pageImage.style.display = "block";
        
        gameStartBtn.style.display = "block";
        
        pageScreen.style.pointerEvents = "none";
        gameStartBtn.style.pointerEvents = "auto";

    } else if (currentPage === 5) {
        pageImage.style.display = "block";
        pageImage.style.zIndex = "5";
    } else if (currentPage === 6) {
        pageImage.style.display = "block";
        pageImage.src = ASSETS.game_result;
        pageImage.style.zIndex = "5";

        let tableContainer = document.getElementById("resultTable");
        if (tableContainer) tableContainer.remove();

        tableContainer = document.createElement("div");
        tableContainer.id = "resultTable";
        tableContainer.style.position = "absolute";
        tableContainer.style.top = "26%"; //越大越往下
        tableContainer.style.left = "49%";
        tableContainer.style.transform = "translateX(-50%)";
        tableContainer.style.width = "80%"; //越大越寬
        tableContainer.style.maxWidth = "1300px";
        tableContainer.style.zIndex = "20";
        tableContainer.style.fontFamily = "'GenSenRounded-H', sans-serif";
        tableContainer.style.color = "#62372C";
        tableContainer.style.lineHeight = "1.45";
        
        let html = `<table style="width:100%; border-collapse:collapse; font-size:32px;">`;

        questions.forEach((q, index) => {
            const ansIndex = userAnswers[index] !== undefined ? userAnswers[index] : -1;
            const userAnswerText = ansIndex >= 0 ? q.options[ansIndex] : "未作答";
            const isCorrect = ansIndex === q.correct;
            const rowColor = isCorrect ? "#62372C" : "#E63946";
            
            let rowHeight = "160px";
            if (index === 1) rowHeight = "120px";
            else if (index === 2) rowHeight = "120px";
            else if (index === 3) rowHeight = "120px";
            else if (index === 4) rowHeight = "140px";
            console.log("index:", index, "rowHeight:", rowHeight);
            html += `
                <tr style="height: ${rowHeight};">
                    <!-- 題號（位置固定） -->
                    <td style=" padding: 16px 8px; width:17%; text-align:center; font-weight:900; vertical-align:middle; color:${rowColor};background-color:rgba(0, 240, 0, 0.3);">
                        ${index+1}
                    </td>
                    <!-- 題目（右移 + 加寬） -->
                    <td style=" padding: 16px 8px; width: 48%; text-align:left; vertical-align:middle; color:${rowColor};background-color: rgba(255, 0, 0, 0.3);">
                        ${q.question}
                    </td>
                    <!-- 答案（右移 + 加寬） -->
                    <td style="padding: 16px 8px; width: 35%; text-align:left; font-weight:900; vertical-align:middle; color:${rowColor};background-color: rgba(0, 0, 255, 0.3);">
                        ${userAnswerText}
                    </td>
                </tr>
            `;
        });

        html += `</table>`;
        tableContainer.innerHTML = html;
        pageScreen.appendChild(tableContainer);

        dialogImage.style.display = "none";
    }
    else if (currentPage === 7 || currentPage === 8 || currentPage === 9) {
        document.getElementById("analysisBtn").style.display = "none";

        if (currentPage === 7) {
            audio.music2.currentTime = 0;
            audio.music2.play().catch(() => {});
        }

        pageImage.style.zIndex = "5";

        dialogImage.style.display = "block";
        dialogText.style.display = "block";
        pageImage.style.display = "none";
        bgVideo.style.display = "block";

        let tableContainer = document.getElementById("resultTable");
        if (tableContainer) tableContainer.remove();

        bgVideo.src = ASSETS.end;
        bgVideo.loop = true;
        bgVideo.muted = true;
        bgVideo.play();

        dialogImage.src = ASSETS.dialog;
        dialogImage.style.zIndex = "15";
        dialogText.style.zIndex = "20";

        const dialogContents = {
            7: { name: "歐羅：", content: "恭喜你完成這些挑戰！<br>看來調查的過程讓你收穫很多知識呢！" },
            8: { name: "歐羅：", content: "記住，壞蛋隨時會捲土重來，要記住飲食的重要性，<br>每天認真守護你的牙齒房屋喔！" },
            9: { name: "歐羅：", content: "任務完成！ 牙齒偵探結訓！<br>       <br>" }
        };

        const currentDialog = dialogContents[currentPage];
        if (currentDialog) { 
            const nameHTML = `<span class="name">${currentDialog.name}</span>`;
            let contentElement = dialogText.querySelector('.content');
            
            if (!contentElement) {
                contentElement = document.createElement('span');
                contentElement.className = 'content';
                dialogText.appendChild(contentElement);
            }

            dialogText.innerHTML = nameHTML;
            dialogText.appendChild(contentElement);

            const pageScreen = document.getElementById("pageScreen");
            pageScreen.style.pointerEvents = "none";
            
            typeWriter(contentElement, currentDialog.content, 55, () => {
                pageScreen.style.pointerEvents = "auto";
            });
        }

        pageScreen.style.pointerEvents = "auto";

    }
}

function nextPage() {
    if (pageScreen.style.pointerEvents === "none") {
        return;
    }
    currentPage++;
    if (currentPage > 9) {
      console.log("currentPage超出範圍，reset\n");
      resetToStart();
      return;
    }
    showCurrentPage();
}

function startGame() {
    console.log("開始遊戲\n");

    audio.music1.pause();
    audio.musicGame.currentTime = 0;
    audio.musicGame.play().catch(() => {});

    const pageScreen = document.getElementById("pageScreen");
    const gameStartBtn = document.getElementById("gameStartBtn");
    gameStartBtn.style.display = "none";
    pageScreen.addEventListener("click", nextPage);

    document.getElementById("pageScreen").style.display = "none";
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "flex";

    gameScreen.style.backgroundImage = `url(${ASSETS.game_bg})`;
    gameScreen.style.backgroundSize = "cover";
    gameScreen.style.backgroundPosition = "center";

    const feedbackDiv = document.getElementById("feedbackDiv");
    feedbackDiv.style.display = "none";

    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    console.log("秀出題目:", currentQuestionIndex);
    console.log("currentPage:", currentPage);
    const q = questions[currentQuestionIndex];
    if (!q) return;

    const gameScreen = document.getElementById("gameScreen");

    gameScreen.style.backgroundImage = `url(${ASSETS.game_bg})`;
    gameScreen.style.backgroundSize = "cover";
    gameScreen.style.backgroundPosition = "center";
    gameScreen.style.backgroundRepeat = "no-repeat";

    gameScreen.onclick = null;

    const options = [
        document.getElementById("optionA"),
        document.getElementById("optionB"),
        document.getElementById("optionC")
    ];
    
    options.forEach(btn => {
        btn.classList.remove("selected");
        btn.disabled = false;
    });

    document.getElementById("nextQuestionBtn").style.display = "none";
    document.getElementById("questionText").style.display = "block";
    document.querySelector(".options-container").style.display = "flex";
    document.getElementById("feedbackDiv").style.display = "none";

    const questionText = document.getElementById("questionText");
    const questionContent = document.getElementById("questionContent");

    questionText.style.display = "flex";
    questionText.style.backgroundImage = `url(${ASSETS.question_bg})`;

    questionContent.textContent = q.question;

    document.getElementById("optionA").textContent = q.options[0];
    document.getElementById("optionB").textContent = q.options[1];
    document.getElementById("optionC").textContent = q.options[2];

    const currentStep = currentQuestionIndex + 1;
    const progressImage = document.getElementById("progressImage");
    
    const barSrc = ASSETS[`bar${currentStep}`];
    console.log(`載入進度條: ${barSrc}`);

    if (barSrc) {
        progressImage.src = barSrc;
        progressImage.style.display = "block";
    }

    setupOptionButtons(q);
}

function setupOptionButtons(q) {
    const options = [
        document.getElementById("optionA"),
        document.getElementById("optionB"),
        document.getElementById("optionC")
    ];

    options.forEach((btn, index) => {
        btn.onclick = () => handleAnswer(index, q);
        btn.disabled = false;
    });
}

function handleAnswer(selectedIndex, q) {
    audio.buttonClick.currentTime = 0;
    audio.buttonClick.play().catch(() => {});

    const questionIndex = currentQuestionIndex;
    const isCorrect = selectedIndex === q.correct;

    userAnswers[questionIndex] = selectedIndex;

    const options = [
        document.getElementById("optionA"),
        document.getElementById("optionB"),
        document.getElementById("optionC")
    ];
    options[selectedIndex].classList.add("selected");

    options.forEach(btn => btn.disabled = true);

    const gameScreen = document.getElementById("gameScreen");
    const nextBtn = document.getElementById("nextQuestionBtn");
    const imgSrc = `assets/q${questionIndex + 1}/q${questionIndex + 1}_${selectedIndex}.png`;

    if (isCorrect) score++;

    gameScreen.onclick = null;

    setTimeout(() => {

        document.getElementById("questionText").style.display = "none";
        document.querySelector(".options-container").style.display = "none";
        document.getElementById("progressImage").style.display = "none";

        gameScreen.style.backgroundImage = `url(${imgSrc})`;
        gameScreen.style.backgroundSize = "contain";
        gameScreen.style.backgroundPosition = "center";
        gameScreen.style.backgroundRepeat = "no-repeat";
        gameScreen.style.backgroundColor = "#000";

        nextBtn.style.display = "block";

        nextBtn.onclick = () => {
            nextBtn.style.display = "none";
            goToNextQuestion();
        };
    }, 500);
}

function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        console.log("結束答題，分數為 ", score);

        showGameResult();

        return;
    }

    document.getElementById("feedbackDiv").style.display = "none";
    showQuestion();
}

function showGameResult() {

    audio.musicGame.pause();

    const gameScreen = document.getElementById("gameScreen");
    const pageScreen = document.getElementById("pageScreen");
    const pageImage = document.getElementById("pageImage");
    const analysisBtn = document.getElementById("analysisBtn");

    gameScreen.style.display = "none";
    pageScreen.style.display = "flex";

    const bgVideo = document.getElementById("bgVideo");
    const wavingVideo = document.getElementById("wavingVideo");
    const dialogImage = document.getElementById("dialogImage");
    const dialogText = document.getElementById("dialogText");
    const gameStartBtn = document.getElementById("gameStartBtn");

    if (bgVideo) bgVideo.style.display = "none";
    if (wavingVideo) wavingVideo.style.display = "none";
    if (dialogImage) dialogImage.style.display = "none";
    if (dialogText) dialogText.style.display = "none";
    if (gameStartBtn) gameStartBtn.style.display = "none";

    pageImage.style.display = "block";
    pageImage.style.zIndex = "10";

    switch(score){
      case 0: pageImage.src = ASSETS.score_0; break;
      case 1: pageImage.src = ASSETS.score_1; break;
      case 2: pageImage.src = ASSETS.score_2; break;
      case 3: pageImage.src = ASSETS.score_3; break;
      case 4: pageImage.src = ASSETS.score_4; break;
      case 5: pageImage.src = ASSETS.score_5; break;
      default: pageImage.src = ASSETS.score_5; break;
    }

    analysisBtn.style.display = "block";

    analysisBtn.onclick = () => {
        analysisBtn.style.display = "none";
        currentPage = 5;
        showCurrentPage();
    };

    pageScreen.style.pointerEvents = "auto";
    pageScreen.removeEventListener("click", nextPage);
    pageScreen.addEventListener("click", nextPage);

    currentPage = 6;
}

function resetToStart() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("scannerScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("pageScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    score = 0;
    currentPage = 1;
    currentQrCode = null;

    audio.music1.pause();
    audio.music2.pause();
    audio.musicGame.pause();
    audio.buttonClick.pause();
}
