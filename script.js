// ドキュメントが読み込まれた後に処理開始
document.addEventListener('DOMContentLoaded', function () {
    // 各HTML要素を変数にバインド
    const splashScreen = document.getElementById('splash-screen');
    const quizContainer = document.querySelector('.quiz-container');
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');
    const finalScreen = document.getElementById('final-screen');
    const finalScoreDisplay = document.getElementById('finalScoreDisplay');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const clickSound = document.getElementById('click-sound');

    let currentQuestionIndex = 0;
    let score = 0;
    let countdown;

    // クイズ問題＆選択肢＆解答＆解説文＆関連画像をオブジェクトティブと配列で定義
    let questions = [
        {
            question: "バカチンガーはどこのキャラクター？",
            choices: ["NHK", "福岡市", "FBS", "NASA"],
            answer: "FBS",
            explanation: "FBS福岡放送のキャラクターです！",
            imageUrl: "./bakachin-material/image/FBS_bakachinga.jpg"
        },
        {
            question: "バカチンガーがNGなものとは？",
            choices: ["おばけ", "高い場所", "アドリブ", "地上波"],
            answer: "地上波",
            explanation: "社長の許可がもらえず地上波以外で活躍中！",
            imageUrl: "./bakachin-material/image/TV-NG.jpg"
        },
        {
            question: "念のため許可をもらっている芸能人は？",
            choices: ["武田鉄矢", "長州小力", "アンミカ", "トム・クルーズ"],
            answer: "武田鉄矢",
            explanation: "某金八先生にちゃんと許可を取得済み！",
            imageUrl: "./bakachin-material/image/kin-pachi.jpg"
        },
        {
            question: "今年3月に就任した“一日〇〇”とは？",
            choices: ["総理", "駅長", "署長", "アイドル"],
            answer: "駅長",
            explanation: "博多駅の一日駅長に就任しました！",
            imageUrl: "./bakachin-material/image/hakata-ekicho.jpg"
        },
        {
            question: "挑戦したことのあるスポーツは？",
            choices: ["水泳", "サッカー", "野球", "プロレス"],
            answer: "プロレス",
            explanation: "九州プロレスのリングにあがりました！",
            imageUrl: "./bakachin-material/image/wrestling.png"
        }

    ];

    // クイズ問題表示関数
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = `Q.${currentQuestionIndex + 1}  ${question.question}`;
        choicesElement.innerHTML = '';
        question.choices.forEach(function (choice) {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', function () { checkAnswer(choice); });
            choicesElement.appendChild(li);
        });
        resetTimer();
    }

    // タイマーリセット＆タイマースタート関数
    function resetTimer() {
        clearInterval(countdown);
        let timeLeft = 10;
        timeElement.textContent = timeLeft;
        countdown = setInterval(function () {
            timeLeft--;
            timeElement.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(countdown);
                displayExplanation(false);
            }
        }, 1000);
    }

    // 解答チェック＆正誤判定関数
    function checkAnswer(choice) {
        clearInterval(countdown);
        const correct = choice === questions[currentQuestionIndex].answer;
        if (correct) {
            score += 20;
            correctSound.play();
            displayExplanation(true);
        } else {
            wrongSound.play();
            displayExplanation(false);
        }
    }

    // 解説表示＆タイマー設定関数
    function displayExplanation(correct) {
        timerElement.style.display = 'none';
        scoreElement.style.display = 'none';
        const explanation = questions[currentQuestionIndex].explanation;
        const imageUrl = questions[currentQuestionIndex].imageUrl;
        questionElement.textContent = correct ? `正解！` : `不正解...`;
        questionElement.className = correct ? 'correct' : 'incorrect';
        choicesElement.innerHTML = `<p>${explanation}</p><img src="${imageUrl}" alt="Image related to answer" style="max-width:100%;height:auto;">`;
        setTimeout(nextQuestion, 4000);
    }

    // 次質問表示関数
    function nextQuestion() {
        timerElement.style.display = '';
        scoreElement.style.display = '';
        questionElement.className = ''; // スタイルクラスをリセット
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showFinalScreen();
        }
    }

    // 最終結果画面表示関数
    function showFinalScreen() {
        quizContainer.style.display = 'none';
        finalScoreDisplay.textContent = score;
        finalScreen.style.display = 'block';
    }

    // 再挑戦ボタンイベントリスナー
    restartQuizBtn.addEventListener('click', function () {
        clickSound.play();
        currentQuestionIndex = 0;
        score = 0;
        finalScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion();
    });

    // スプラッシュスクリーンフェードアウト＆クイズ開始
    setTimeout(function () {
        splashScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion();
    }, 5000);
});