// user input display DOMS
const userInput = document.querySelector('.users-inputs')
const inputTitle = document.querySelector('#text-input')
const inputDate = document.querySelector('#date-input')
const startBtn = document.querySelector('#start-btn')

// actionContainer display DOMS
const actionContainer = document.querySelector('.action-container')
const displayDay = document.querySelector('#day-text')
const displayHour = document.querySelector('#hour-text')
const displayMinute = document.querySelector('#minute-text')
const displaySecond = document.querySelector('#second-text')
const userTitle = document.getElementById('user-title')
const resetBtn = document.getElementById('reset-btn')

let intervalset;

// countDown function
function countDown(inpDate, inpText) {
    const estmatesTime = new Date(`${inpDate}`).getTime()
    const currentTime = new Date().getTime()

    // gap between currentTime and EstimatedTime
    let gap = estmatesTime - currentTime

    // get all time formate
    let second = 1000
    let minute = second * 60
    let hour = minute * 60
    let day = hour * 24

    // when it's estimated time finished
     if (gap < 10) {
    displayDay.textContent = '00'
    displayHour.textContent = '00'
    displayMinute.textContent = '00'
    displaySecond.textContent = '00'
        
    userInput.style.display = 'none'
    actionContainer.style.display = 'block' 
    userTitle.textContent = 'completed!'
    userTitle.classList.add('fadeout')
    return 
    }
    
    // calculat the gap and the foramted date
    let dayText = Math.floor(gap / day)
    let hourText = Math.floor((gap % day) / hour)
    let minuteText = Math.floor((gap % hour) / minute)
    let secondText = Math.floor((gap % minute) / second)

    // make the 10 digit formate
    dayText = addZero(dayText)
    hourText = addZero(hourText)
    minuteText = addZero(minuteText)
    secondText = addZero(secondText)

    // add doms here
    displayDay.textContent = dayText
    displayHour.textContent = hourText
    displayMinute.textContent = minuteText
    displaySecond.textContent = secondText
    userTitle.textContent = inpText
}
function addZero(num) {
    return num < 10 ? '0' + num : num
}

// add event listner here and make it functional
function startTasks() {
    let valueDate = inputDate.value
    let valueTitle = inputTitle.value

    // lets store them in local storage to make 
    // them display untile resteBtn clicked
    localStorage.setItem('displayCountD', valueDate)
    localStorage.setItem('displayCountT', valueTitle)

    if (valueDate == '' || valueTitle == '') {
        alert('Set all inputs first')
        location.reload()
    }


    // lets create setIntarval to make it work well
    clearInterval(intervalset)
    intervalset = setInterval(() => {
        countDown(valueDate, valueTitle)
    }, 1000)
}

startBtn.addEventListener('click', () => {
    userInput.style.display = 'none'
    actionContainer.style.display = 'block' 
    actionContainer.classList.add('transform') 
    startTasks()
})

// lets make it visible even if refresh the page
window.addEventListener('load', function updateDates() {
    let setInpDate = localStorage.getItem('displayCountD')
    let setInpTitle = localStorage.getItem('displayCountT')

    if (setInpDate && setInpTitle) {
    //   lets empty the dom first to see the countDown directly
       countDown(setInpDate, setInpTitle)

      userInput.style.display = 'none'
      actionContainer.style.display = 'block' 

      intervalset = setInterval(() => {
        countDown(setInpDate, setInpTitle)
      }, 1000);
    }
})

// create reset button to clear and add another countDown
resetBtn.addEventListener('click', () => {
    clearInterval(intervalset)
    localStorage.clear()
    userInput.style.display = 'block'
    userInput.classList.add('scale')
    actionContainer.style.display = 'none'
    inputDate.value = ''
    inputTitle.value = ''
})