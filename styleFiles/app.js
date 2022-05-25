const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')
const restartBtn = document.querySelector('.restart')
const scoreScreen = document.querySelector('.primary')
const hiddenElements = document.querySelectorAll('.hidden')
let circle = null
let score = 0
let time = 0
let timeInter = null


function setUpDisplay(){
    const widthClient = window.innerWidth
    const heightClient = window.innerHeight
    const widthBoard = (widthClient * 10) / 12
    const heightBoard = (heightClient * 10) / 12
    if (widthClient < 550) {
        board.style.width = `${widthBoard}px`
    } else board.style.width = '500px'
    if (heightClient < 600) {
        board.style.height = `${heightBoard}px`
    } else board.style.height = '500px'
}

setUpDisplay()

window.addEventListener('resize', () => {
    setUpDisplay()
}, true)



startBtn.addEventListener('click', (event) => {
    screens.forEach((element) => {
        element.style.transition = 'margin 0.5s ease-out'
    })
    score = 0
    event.preventDefault()//отменяем переход на ссылку
    screens[0].classList.add('up')//добавляем переход далее
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        //если у элемента на который мы кликнули есть класс 
        //event.target.getAttribute('data-time') получить значение атрибута
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

restartBtn.addEventListener('click', () => {
    screens[2].classList.add('up')

    setTimeout(() => {
        screens.forEach((element) => {
            element.style.transition = 'none'
            element.classList.remove('up')
        })
    }, 600)
})

function startGame() {
    screens[1].classList.add('up')
    hiddenElements.forEach((element) => {
        element.classList.add('hidden')
    })
    createRandomCircle()
    timeInter = setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
        clearInterval(timeInter)
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    circle.classList.remove('circle')
    hiddenElements.forEach((element) => {
        element.classList.remove('hidden')
    })
    // timeEl.parentNode.remove()//удаляем родителя
    scoreScreen.textContent = `${score}`
}

board.addEventListener('click', event => {//добавляем событие на всю доску
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()//прошлый кружок убираем
        createRandomCircle()//создаем новый
    }
})

//getBoundingClientRect
function createRandomCircle() {//создание шарика
    circle = document.createElement('div')
    circle.classList.add('circle')
    const { width, height } = board.getBoundingClientRect()
    const size = getRandomNumber(15, (width)/8)
    console.log(size)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    // circle.style.transform = `scale${size}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}