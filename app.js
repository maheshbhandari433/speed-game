const circles = document.querySelectorAll('.circle')
const closeButton = document.querySelector('#close')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const scoreSpan= document.querySelector('.score')
const scoreEnd= document.querySelector('.score-end')
const scoreEndMessage= document.querySelector('.score-end-message')
const overlay = document.querySelector('.overlay')

let score = 0
let active = 0
let timer
let pace = 1200
let rounds = 0

let startSound = new Audio('sounds/src_sounds_start.mp3')
let endSound = new Audio('sounds/src_sounds_end.mp3')
let clickSound = new Audio('sounds/src_sounds_click.mp3')


circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i))
})

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min
}

function clickCircle (i) {
    clickSound.play()

    if(i !== active) {
        return endGame()
    }

    score = score + 10
    scoreSpan.textContent = score
}

function enableCircles () {
    circles.forEach(circle => {
        circle.style.pointerEvents = 'auto'
    })
} 

function startGame () {
    if(rounds === 0) {
        startSound.play()   
    }
    if(rounds >= 20) {
        return endGame()
    }

    startButton.classList.add('hidden')
    endButton.classList.remove('hidden')

    enableCircles()

    const nextActive = pickNew(active)

    circles[nextActive].classList.toggle('active')
    circles[active].classList.remove('active')
    active = nextActive

    /* console.log(nextActive) */

    timer = setTimeout(startGame, pace)

    pace = pace - 10

    rounds ++

    function pickNew (active) {
        const nextActive = randomNumber(0, 3)

        if (nextActive !== active) {
            return nextActive
        }
         
            return pickNew(active)

    }
}

function endGame () {
    endSound.play()
    scoreEnd.textContent = score
    endButton.classList.remove('hidden')
    startButton.classList.add('hidden')
    overlay.style.visibility = 'visible'

    if (score < 20) {
        scoreEndMessage.textContent = "Your score is low, better luck next time!"
    }
    else if (score < 50) {
        scoreEndMessage.textContent = "Not so bad, you can still improve!"
    }
    else {
        scoreEndMessage.textContent = "Nice! You did great!"
    }

    clearTimeout(timer)
}

function resetGame () {
    window.location.reload()
}


startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
