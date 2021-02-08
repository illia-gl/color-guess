const colorHeader = document.querySelector('h1');
const message = document.querySelector('h2');
const colorCards = document.querySelectorAll('.card');
const darkThemeBtn = document.querySelector('.darkmode-btn');
const resetBtn = document.querySelector('.restart-btn');
const resetBtnText = document.querySelector('.restart-btn-text');

    // Some messages for players
const msgWin = [
      "Correct!",
      "Rock On!",
      "Super job!",
      "Cool!",
      "Yeah!"
    ];
const msgLose = [
      "Nope",
      "Nah",
      "Wrong color",
      "Not this one"
    ];

let colors = randColorsArr();
let winColor = pickRandIndex(colors);
colorHeader.textContent = winColor.toUpperCase();

// Generate random index of argument array
function pickRandIndex(arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex]
}

// Generate random number between 0 and 255 for each RGB color chanel
function randColor() {
    const red = Math.floor(Math.random() * 256),
        green = Math.floor(Math.random() * 256),
        blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

// Generate array of 6 random colors
function randColorsArr() {
    const arr = [];
    for (let i = 0; i < 6; i++) {
        arr.push(randColor());
    }
    return arr
}

// Reset button
resetBtn.addEventListener('click', () => {

    message.textContent = 'Guess a color';
    if (document.body.classList.contains('darkmode')) {
        message.style.color = '#e8e8e8'
    } else {
        message.style.color = '#25282C';
    }
    resetBtnText.textContent = 'Retry';

    fullOpacity();

    colors = randColorsArr();
    winColor = pickRandIndex(colors);
    colorHeader.textContent = winColor.toUpperCase();
    addColors(colors);
    addBoxShadow(colors);
});

addColors(colors);
guessWinColor();

function addColors(arr) {
    for (let i = 0; i < colorCards.length; i++) {
        colorCards[i].style.backgroundColor = arr[i];
    }
}

function addBoxShadow(arr) {
    for (let i = 0; i < colorCards.length; i++) {
        colorCards[i].addEventListener('mouseover', function () {
            if (document.body.classList.contains('darkmode')) {
                this.style.boxShadow = 'none';
            } else {
                this.style.boxShadow = `0px 18px 34px -12px ${arr[i]}`;
            }
        });
        colorCards[i].addEventListener('mouseout', function () {
            this.style.boxShadow = 'none';
        })
    }
}

addBoxShadow(colors);

function guessWinColor() {
    for (let i = 0; i < colorCards.length; i++) {
        colorCards[i].addEventListener('click', function () {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === winColor) {

                message.textContent = pickRandIndex(msgWin);
                message.style.color = '#0D8936';
                resetBtnText.textContent = 'Play again?';

                changeColor(clickedColor);
                changeBoxShadow(clickedColor);
                fullOpacity();

            } else {
                this.style.opacity = '0';
                this.style.visibility = 'hidden';
                message.textContent = pickRandIndex(msgLose);
                message.style.color = '#d93c31';
            }
        })
    }
}


// Change colors of rest 5 cards to win color
function changeColor(color) {
    for (let card of colorCards) {
        card.style.backgroundColor = color;
    }
}

// Change opacity of all to 100%
function fullOpacity() {
    for (let card of colorCards) {
        card.style.opacity = '1';
        card.style.visibility = 'visible';

    }
}

// Change box-shadow color of rest 5 cards to win color
function changeBoxShadow(color) {
    for (let card of colorCards) {
        card.addEventListener('mouseover', function () {
            if (document.body.classList.contains('darkmode')) {
                this.style.boxShadow = 'none';
            } else {
                card.style.boxShadow = `0px 18px 34px -12px ${color}`;
            }
        });
        card.addEventListener('mouseout', function () {
            card.style.boxShadow = 'none';
        });
    }
}

darkThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle('darkmode');
    localStorage.setItem("activeState", document.body.classList);
    addDarkModeBtn();

})

function addDarkModeBtn() {
    if (document.body.classList.contains('darkmode')) {
        darkThemeBtn.setAttribute('data-tooltip', 'Light Mode');
        message.style.color = '#e8e8e8'
    } else {
        darkThemeBtn.setAttribute('data-tooltip', 'Dark Mode')
        message.style.color = '#25282C';
    }
}
document.body.classList = localStorage.getItem("activeState");
addDarkModeBtn();








