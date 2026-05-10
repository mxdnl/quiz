const quizCard = document.querySelector("main")
const submitBtn = document.querySelector(".submit-btn")

export const selectOption = () => {
    let optionsContainer = document.querySelector(".choices")
    let optionsBtn = Array.from(optionsContainer.children)
    
    optionsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            optionsBtn.forEach((option) => {
                option.style.backgroundColor = "#e6e7e8"
                option.style.color = "black"
            })
            
            btn.style.backgroundColor = "#0f508d"
            btn.style.color = "white"
        })
    })
}

export const generateQnA = (question, options, itemNum, correctAnswerIndex) => {
    console.log(options)
    quizCard.innerHTML = `
        <div class="item-num">
            <div class="bar">
                <div class="highlight"></div>
            </div>
            <p class="current-item">Question ${itemNum + 1} of 10</p>
        </div>

        <div class="question">
            <h1>${question}</h1>
        </div>

        <div class="choices">
            <button class="option" id="option1">${options[0]}</button>
            <button class="option" id="option2">${options[1]}</button>
            <button class="option" id="option3">${options[2]}</button>
            <button class="option" id="option4">${options[3]}</button>
        </div>

        <div class="submit">
            <button class="submit-btn">Submit Answer</button>
        </div>
    `

    selectOption()
    
    let choices = Array.from(document.querySelector(".choices").children)

    return choices[correctAnswerIndex]

}

export const updateProgressBar = (currentItem) => {
    let progressBar = document.querySelector(".highlight")

    progressBar.style.width = `${currentItem / 10 * 100}%`
}

export const resetUI = () => {
    quizCard.innerHTML = `
        <div class="difficulty-text">
            <h1>Pick a difficulty</h1>
        </div>

        <div class="choices">
            <button class="option" id="easy">Easy</button>
            <button class="option" id="medium">Medium</button>
            <button class="option" id="hard">Hard</button>
        </div>

        <div class="submit">
            <button class="submit-btn" id="start">Start Quiz</button>
        </div>
    `
}