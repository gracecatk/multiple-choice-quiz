const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "javascript", correct: false },
            { text: "footer", correct: false },
            { text: "scripting", correct: false },
            { text: "script", correct: true },
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "head only", correct: false },
            { text: "Both the head and Body sections", correct: true },
            { text: "body only", correct: false },
            { text: "link", correct: false },
        ]
    },
    {
        question: "What is the correct syntax for an external script called 'xxx.js' ?",
        answers: [
            { text: "script href='xxx.js'", correct: false },
            { text: "script src='xxx.js'", correct: true },
            { text: "script value='xxx.js'", correct: false },
            { text: "script name='xxx.js'", correct: false },
        ]
    },
    {
        question: "What does // do?",
        answers: [
            { text: "Adds default code", correct: false },
            { text: "Shortcut", correct: false },
            { text: "Closes the code", correct: false },
            { text: "Comment tag", correct: true },
        ]
    },
    {
        question: "Numbers, Strings & Booleans are: ",
        answers: [
            { text: "Data types", correct: true },
            { text: "Not in JavaScript", correct: false },
            { text: "In HTML", correct: false },
            { text: "In CSS", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("choice-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();