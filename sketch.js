// 設定測驗題目
const questions = [
  {
    // 第一題
    question: "哪一個函式會在 p5.js 程式開始時執行一次？",

    // 第一題選項
    options: ["draw()", "setup()", "start()", "begin()"],

    // 正確答案
    answer: 1
  },
  {
    // 第二題
    question: "哪一個函式會在 p5.js 中不斷重複執行？",

    // 第二題選項
    options: ["loop()", "repeat()", "draw()", "run()"],

    // 正確答案
    answer: 2
  },
  {
    // 第三題
    question: "哪一個指令可以建立畫布？",

    // 第三題選項
    options: ["makeCanvas()", "createCanvas()", "newCanvas()", "canvas()"],

    // 正確答案
    answer: 1
  },
  {
    // 第四題
    question: "哪一個指令可以設定背景顏色？",

    // 第四題選項
    options: [
      "background()",
      "bgColor()",
      "setBackground()",
      "colorBackground()"
    ],

    // 正確答案
    answer: 0
  },
  {
    // 第五題
    question: "哪一個指令可以畫出圓形？",

    // 第五題選項
    options: ["circle()", "ellipse()", "round()", "drawCircle()"],

    // 正確答案
    answer: 1
  }
];

// 設定目前題目編號
let currentQuestion = 0;

// 設定答對題數
let score = 0;

// 設定是否已作答
let answered = false;

// 設定使用者選擇的選項
let selectedOption = -1;

// 設定下一題按鈕
let nextButton;

// 設定重新測驗按鈕
let restartButton;

// p5.js 初始化函式
function setup() {
  // 建立畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定文字字型
  textFont("Arial");

  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕樣式
  nextButton.style("font-size", "20px");

  // 設定下一題按鈕內距
  nextButton.style("padding", "10px 30px");

  // 設定下一題按鈕背景
  nextButton.style("background-color", "#0077b6");

  // 設定下一題按鈕文字顏色
  nextButton.style("color", "white");

  // 移除下一題按鈕外框
  nextButton.style("border", "none");

  // 設定下一題按鈕圓角
  nextButton.style("border-radius", "8px");

  // 設定下一題按鈕點擊事件
  nextButton.mousePressed(nextQuestion);

  // 建立重新測驗按鈕
  restartButton = createButton("重新測驗");

  // 設定重新測驗按鈕樣式
  restartButton.style("font-size", "20px");

  // 設定重新測驗按鈕內距
  restartButton.style("padding", "10px 30px");

  // 設定重新測驗按鈕背景
  restartButton.style("background-color", "#0077b6");

  // 設定重新測驗按鈕文字顏色
  restartButton.style("color", "white");

  // 移除重新測驗按鈕外框
  restartButton.style("border", "none");

  // 設定重新測驗按鈕圓角
  restartButton.style("border-radius", "8px");

  // 設定重新測驗按鈕點擊事件
  restartButton.mousePressed(restartQuiz);

  // 隱藏重新測驗按鈕
  restartButton.hide();

  // 設定按鈕位置
  updateButtonPosition();
}

// 每一幀執行
function draw() {
  // 設定背景顏色
  background("#f1faee");

  // 判斷是否完成所有題目
  if (currentQuestion >= questions.length) {
    // 顯示結果
    drawResult();

    // 隱藏下一題按鈕
    nextButton.hide();

    // 顯示重新測驗按鈕
    restartButton.show();

    // 結束函式
    return;
  }

  // 顯示測驗畫面
  drawQuiz();

  // 判斷是否已經作答
  if (answered) {
    // 顯示下一題按鈕
    nextButton.show();
  } else {
    // 隱藏下一題按鈕
    nextButton.hide();
  }

  // 更新按鈕位置
  updateButtonPosition();
}

// 繪製測驗畫面
function drawQuiz() {
  // 取得目前題目
  const quiz = questions[currentQuestion];

  // 設定標題文字大小
  textSize(32);

  // 設定文字粗體
  textStyle(BOLD);

  // 設定標題顏色
  fill("#023047");

  // 顯示標題
  text("p5.js 程式設計簡易測驗", width / 2, 50);

  // 設定題數文字大小
  textSize(20);

  // 顯示題數
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + questions.length + " 題",
    width / 2,
    95
  );

  // 設定題目文字大小
  textSize(25);

  // 設定題目顏色
  fill("#264653");

  // 顯示題目，固定在畫面中央
  text(quiz.question, width / 2, 150);

  // 設定選項寬度
  const optionWidth = min(width - 80, 800);

  // 設定選項高度
  const optionHeight = 70;

  // 設定選項間隔
  const optionGap = 25;

  // 設定選項起始位置
  const startY = 220;

  // 繪製四個選項
  for (let i = 0; i < quiz.options.length; i++) {
    // 計算選項位置
    let optionY = startY + i * (optionHeight + optionGap);

    // 判斷是否要讓正確答案跳動
    if (
      answered &&
      selectedOption !== quiz.answer &&
      i === quiz.answer
    ) {
      // 讓正確答案上下跳動
      optionY += sin(frameCount * 0.12) * 8;
    }

    // 設定選項背景顏色
    if (
      answered &&
      selectedOption !== quiz.answer &&
      i === quiz.answer
    ) {
      // 答錯時，正確答案使用淡藍色
      fill("#caf0f8");
    } else if (
      answered &&
      selectedOption === quiz.answer &&
      i === selectedOption
    ) {
      // 答對時，使用淡綠色
      fill("#b7e4c7");
    } else if (
      answered &&
      selectedOption !== quiz.answer &&
      i === selectedOption
    ) {
      // 答錯時，使用淡紅色
      fill("#ffb4a2");
    } else {
      // 尚未作答時使用白色
      fill("white");
    }

    // 設定選項外框
    stroke("#219ebc");

    // 設定外框粗細
    strokeWeight(3);

    // 繪製選項方框
    rect(
      width / 2 - optionWidth / 2,
      optionY,
      optionWidth,
      optionHeight,
      12
    );

    // 設定選項文字顏色
    fill("#023047");

    // 設定選項文字大小
    textSize(25);

    // 設定選項文字粗體
    textStyle(BOLD);

    // 顯示選項文字
    text(
      String.fromCharCode(65 + i) + ". " + quiz.options[i],
      width / 2,
      optionY + optionHeight / 2
    );
  }

  // 判斷是否已作答
  if (answered) {
    // 設定提示文字大小
    textSize(22);

    // 判斷答案是否正確
    if (selectedOption === quiz.answer) {
      // 設定答對文字顏色
      fill("#2a9d8f");

      // 顯示答對訊息
      text("答對了！", width / 2, height - 60);
    } else {
      // 設定答錯文字顏色
      fill("#e76f51");

      // 顯示答錯訊息
      text("答錯了！正確答案已標示。", width / 2, height - 60);
    }
  }
}

// 繪製測驗結果
function drawResult() {
  // 設定標題文字大小
  textSize(40);

  // 設定標題粗體
  textStyle(BOLD);

  // 設定標題顏色
  fill("#023047");

  // 顯示完成文字
  text("測驗完成！", width / 2, height * 0.3);

  // 設定分數文字大小
  textSize(30);

  // 設定分數文字顏色
  fill("#2a9d8f");

  // 顯示答對題數
  text(
    "你答對了 " + score + " 題，共 " + questions.length + " 題",
    width / 2,
    height * 0.45
  );

  // 設定評語文字大小
  textSize(24);

  // 設定評語文字顏色
  fill("#264653");

  // 顯示評語
  if (score === questions.length) {
    // 顯示滿分評語
    text("太棒了！全部答對！", width / 2, height * 0.58);
  } else if (score >= 3) {
    // 顯示中高分評語
    text("表現很好，繼續加油！", width / 2, height * 0.58);
  } else {
    // 顯示鼓勵評語
    text("再練習幾次，一定會進步！", width / 2, height * 0.58);
  }
}

// 處理滑鼠點擊
function mousePressed() {
  // 如果測驗完成，不處理點擊
  if (currentQuestion >= questions.length) {
    // 結束函式
    return;
  }

  // 如果已經作答，不允許再次選擇
  if (answered) {
    // 結束函式
    return;
  }

  // 取得目前題目
  const quiz = questions[currentQuestion];

  // 設定選項寬度
  const optionWidth = min(width - 80, 800);

  // 設定選項高度
  const optionHeight = 70;

  // 設定選項間隔
  const optionGap = 25;

  // 設定選項起始位置
  const startY = 220;

  // 檢查每個選項
  for (let i = 0; i < quiz.options.length; i++) {
    // 計算選項位置
    const optionY = startY + i * (optionHeight + optionGap);

    // 計算選項左邊位置
    const optionX = width / 2 - optionWidth / 2;

    // 判斷是否點擊選項
    if (
      mouseX >= optionX &&
      mouseX <= optionX + optionWidth &&
      mouseY >= optionY &&
      mouseY <= optionY + optionHeight
    ) {
      // 記錄使用者選擇
      selectedOption = i;

      // 設定已經作答
      answered = true;

      // 判斷是否答對
      if (selectedOption === quiz.answer) {
        // 答對題數加一
        score++;
      }

      // 結束迴圈
      break;
    }
  }
}

// 進入下一題
function nextQuestion() {
  // 如果尚未作答，不進入下一題
  if (!answered) {
    // 結束函式
    return;
  }

  // 題目編號加一
  currentQuestion++;

  // 重設作答狀態
  answered = false;

  // 清除選項紀錄
  selectedOption = -1;
}

// 重新開始測驗
function restartQuiz() {
  // 回到第一題
  currentQuestion = 0;

  // 分數歸零
  score = 0;

  // 重設作答狀態
  answered = false;

  // 清除選項紀錄
  selectedOption = -1;

  // 隱藏重新測驗按鈕
  restartButton.hide();
}

// 更新按鈕位置
function updateButtonPosition() {
  // 確認下一題按鈕已建立
  if (nextButton) {
    // 將下一題按鈕放在畫面底部中央
    nextButton.position(width / 2 - 55, height - 50);
  }

  // 確認重新測驗按鈕已建立
  if (restartButton) {
    // 將重新測驗按鈕放在畫面中央下方
    restartButton.position(width / 2 - 70, height * 0.7);
  }
}

// 視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 更新按鈕位置
  updateButtonPosition();
}