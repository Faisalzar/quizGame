const questions = [
    {
        question: "Which of the following is a dynamically-typed programming language?",
        answers: [
            {text: "Java", correct: false},
            {text: "Python", correct: true},
            {text: "C#", correct: false},
            {text: "C++", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Computer Style Sheets", correct: false},
            {text: "Creative Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Colorful Style Sheets", correct: false},
        ]
    },
    {
        question: "In JavaScript, what is a closure?",
        answers: [
            {text: "A method of closing a webpage", correct: false},
            {text: "A way to secure sensitive data", correct: false},
            {text: "A combination of functions and lexical scope", correct: true},
            {text: "A type of loop", correct: false},
        ]
    },
    {
        question: "Which of the following is a version control system?",
        answers: [
            {text: "Git", correct: true},
            {text: "Node.js", correct: false},
            {text: "MongoDB", correct: false},
            {text: "React", correct: false},
        ]
    },
    {
        question: "What is the purpose of the 'box-sizing' property in CSS?",
        answers: [
            {text: "To set the background color of a box", correct: false},
            {text: "To define the box model for an element", correct: true},
            {text: "To control the visibility of a box", correct: false},
            {text: "To add a shadow to a box", correct: false},
        ]
    },
    {
        question: "What is the role of 'npm' in Node.js?",
        answers: [
            {text: "Node Package Manager, used for installing and managing packages", correct: true},
            {text: "Node Performance Monitor, used for optimizing code execution", correct: false},
            {text: "Node Programming Module, used for creating custom modules", correct: false},
            {text: "Node Package Matcher, used for pattern matching in strings", correct: false},
        ]
    },
    {
        question: "In Java, what is the purpose of the 'final' keyword?",
        answers: [
            {text: "To declare a variable that can be changed later", correct: false},
            {text: "To indicate the end of a loop", correct: false},
            {text: "To specify that a class cannot be extended", correct: true},
            {text: "To force a method to be overridden in a subclass", correct: false},
        ]
    },
    {
        question: "What is the purpose of the 'await' keyword in JavaScript?",
        answers: [
            {text: "To indicate a function that returns a promise", correct: false},
            {text: "To pause the execution of asynchronous code until the promise is resolved", correct: true},
            {text: "To define a variable with block scope", correct: false},
            {text: "To catch errors in asynchronous code", correct: false},
        ]
    },
    {
        question: "Which of the following is not a valid data type in Python?",
        answers: [
            {text: "int", correct: false},
            {text: "float", correct: false},
            {text: "string", correct: false},
            {text: "void", correct: true},
        ]
    },
    {
        question: "What is the purpose of the 'useState' hook in React.js?",
        answers: [
            {text: "To fetch data from an API", correct: false},
            {text: "To manage state in functional components", correct: true},
            {text: "To create reusable components", correct: false},
            {text: "To handle form submissions", correct: false},
        ]
    }
];

let questionElement = document.getElementById("question")
let answerButtons = document.getElementById("answer-buttons")
let nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo= currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState(){
nextButton.style.display = "none"
while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
}
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz()