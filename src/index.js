import "./styles.css"
import { selectOption } from "./dom.js"
import { generateQnA } from "./dom.js"
import { updateProgressBar  } from "./dom.js"
import { resetUI } from "./dom.js"

let difficulty, questions
let startBtn = document.querySelector("#start")
const quizCard = document.querySelector("main")

let counter = 0
let chosenAnswer

// question format 
/*
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science &amp; Nature',
    question: 'What is the elemental symbol for mercury?',
    correct_answer: 'Hg',
    incorrect_answers: [ 'Me', 'Mc', 'Hy' ]
  }
*/

function quiz() {
    if (counter === 10) {
        alert("Quiz is done")
        alert("Resetting quiz") 
        resetQuiz()
        
        return null
    }
    
    let item = questions[counter]
    let choices = [...item.incorrect_answers]
    let randomNum = Math.floor(Math.random() * (item.incorrect_answers.length + 1))

    choices.splice(randomNum, 0, item.correct_answer)
    let parsedCorrectAnswer = generateQnA(item.question, choices, counter, randomNum)
    updateProgressBar(counter + 1)
    console.log(parsedCorrectAnswer.textContent)

    let newSubmitBtn = document.querySelector(".submit-btn")
    newSubmitBtn.addEventListener("click", () => {
        let diffOptions = document.querySelectorAll(".option")
        diffOptions.forEach((option) => {
            if (option.style.backgroundColor === 'rgb(15, 80, 141)') {
                chosenAnswer = option.textContent
            }
        })

        if (checkAnswer(chosenAnswer, parsedCorrectAnswer.textContent)) {
            alert("Correct!")
            counter++
            quiz()
        } else {
            alert("Incorrect")
        }
    })
}

async function generateQuestions() {
    let url = `https://opentdb.com/api.php?amount=10&category=17&difficulty=${difficulty}&type=multiple`
    
    try {
        const response = await fetch(url)
        questions = await response.json()

        return questions.results
    } catch (error) {
        console.error(error)
    }
}   

const start = () => {
    startBtn.addEventListener("click", () => {
        let diffOptions = document.querySelectorAll(".option")
        
        diffOptions.forEach((option) => {
            if (option.style.backgroundColor === 'rgb(15, 80, 141)') {
                difficulty = option.id

                generateQuestions()
                    .then(response => {
                        questions = response
                        console.log(questions)
                        return questions
                    })
                    .then(questions => {
                        selectOption()
                        quiz()
                })
            }
        })

        if (!difficulty) {
            alert("Please pick a difficulty")
        }
    })
}

function checkAnswer(chosenAnswer, correctAnswer) {
    if (chosenAnswer === correctAnswer) {
        return true
    }

    return false
}

function resetQuiz() {
    difficulty = null
    counter = 0
    questions = null
    chosenAnswer = null

    resetUI()
    startBtn = document.querySelector("#start")
    start()
    selectOption()
}

selectOption()
start()