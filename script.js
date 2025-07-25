document.querySelector('.rules-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.rules-popup').classList.toggle('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
    document.querySelector('.rules-popup').classList.remove('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});

let gameItemsCont = Array.from(document.querySelectorAll("div[class^='game-body__circle-container'"));
let tempoV;
let tempoArr = [];
let stateFlag = false;
let score = document.querySelector('.header__value');

setScore(state = 'init', tar = score);
gameItemsCont.forEach((e) => {
    e.addEventListener('click', function () {
        tempoV = e;
        swipe(flag = stateFlag, arr = gameItemsCont, slim = tempoV, tmpArr = tempoArr);
        stateFlag = true;
    });
});

function swipe(flag, arr, slim, tmpArr) {
    if (flag === true) {

    }
    else {
        document.querySelector('.bg-triangle').classList.add('bg-triangle--s2');
        document.querySelector('.choosed-item--com__bg-circle').classList.add('choosed-item--com__bg-circle--s2');

        arr.filter((e) => {
            if (slim !== arr[arr.indexOf(e)]) {
                tmpArr.push(e);
            }
        });

        let comItem = tmpArr[Math.floor(Math.random() * 2)];
        slim.classList.add('choosed-item--user');
        tmpArr.forEach((e) => {
            e.classList.add('unchoosed-item');
        });
        
        setTimeout(() => {
            comItem.classList.remove('unchoosed-item');
            comItem.classList.add('choosed-item--com');
        }, 1000)
        setTimeout(() => {
            document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
        }, 1000)

        let headingUser = document.createElement('h3');
        let headingUserContent = document.createTextNode('You Picked');
        headingUser.classList.add('you-picked');
        headingUser.append(headingUserContent);
        slim.append(headingUser);
        let headingCom = document.createElement('h3');
        let headingComContent = document.createTextNode('The house Picked');
        headingCom.append(headingComContent);
        headingCom.classList.add('you-picked');
        comItem.append(headingCom);


        if (slim.className.includes('paper')) {
            if (comItem.className.includes('rock')) {
                gameOver(state = 'win', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'win', tar = score); }, 1500)
                setTimeout(() => { highlightEffect(slim = slim); }, 1250);
            } else {
                gameOver(state = 'lose', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'lose', tar = score); }, 1500)
                setTimeout(() => { highlightEffect(slim = comItem); }, 1250);
            }
        } else if (slim.className.includes('rock')) {
            if (comItem.className.includes('scissors')) {
                gameOver(state = 'win', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'win', tar = score); }, 1500);
                setTimeout(() => { highlightEffect(slim = slim); }, 1250);
            } else {
                gameOver(state = 'lose', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'lose', tar = score); }, 1500);
                setTimeout(() => { highlightEffect(slim = comItem); }, 1250);
            }
        } else if (slim.className.includes('scissors')) {
            if (comItem.className.includes('rock')) {
                gameOver(state = 'lose', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'lose', tar = score); }, 1500);
                setTimeout(() => { highlightEffect(slim = comItem); }, 1250);
            } else {
                gameOver(state = 'win', hUser1 = headingUser, hCom1 = headingCom);
                setTimeout(() => { setScore(state = 'win', tar = score); }, 1500);
                setTimeout(() => { highlightEffect(slim = slim); }, 1250);
            }
        }
    }
}


function highlightEffect(slim) {
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c3 = document.createElement('div');
    slim.append(c1);
    slim.append(c2);
    slim.append(c3);
    c1.classList.add('circle');
    c1.classList.add('circle--1');
    c2.classList.add('circle');
    c2.classList.add('circle--2');
    c3.classList.add('circle');
    c3.classList.add('circle--3');
}

function gameOver(state, hUser1, hCom1) {
    let heading = document.createElement('h2');
    let playAgain = document.createElement('button');
    let gameOverCont = document.createElement('div');
    let playAgainSen = document.createTextNode('Play Again');
    let winSen = document.createTextNode('You Win');
    let loseSen = document.createTextNode('You Lose');
    heading.classList.add('gameoversen');
    playAgain.classList.add('btn');
    gameOverCont.classList.add('game-over-container')
    playAgain.append(playAgainSen);
    if (state == 'win') {
        heading.append(winSen);
    } else if (state == 'lose') {
        heading.append(loseSen);
    }
    gameOverCont.append(heading);
    gameOverCont.append(playAgain);
    setTimeout(() => {
        document.querySelector('main').insertBefore(gameOverCont, document.querySelector('.rules-btn'));
        document.querySelector('.choosed-item--user').classList.add('choosed-item--user--s4');
        document.querySelector('.choosed-item--com').classList.add('choosed-item--com--s4');
        Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e) => {
            e.classList.add('game-body__big-circle--s4');
        });
        Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e) => {
            e.classList.add('game-body__tiny-circle--s4');
        });

    }, 1500)
    playAgain.addEventListener('click', () => { initGame(btn = playAgain, heading = heading, hUser = hUser1, hCom = hCom1, gmovCon = gameOverCont) });
}

function initGame(btn, heading, hUser, hCom, gmovCon) {
    document.querySelector('.bg-triangle').classList.remove('bg-triangle--s2');
    document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
    document.querySelector('.choosed-item--user').classList.remove('choosed-item--user--s4');
    document.querySelector('.choosed-item--com').classList.remove('choosed-item--com--s4');
    Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e) => {
        e.classList.remove('game-body__big-circle--s4');
    });
    Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e) => {
        e.classList.remove('game-body__tiny-circle--s4');
    });
    gameItemsCont.forEach((e) => {
        if (e.className.includes('choosed-item--user')) {
            for (let i = 1; i <= 3; i++) {
                document.querySelector(`.circle--${i}`).remove();
            }
            e.classList.remove('choosed-item--user');
        } else if (e.className.includes('choosed-item--com')) {
            e.classList.remove('choosed-item--com');
        } else {
            e.classList.remove('unchoosed-item');
        }
    });
    btn.remove();
    heading.remove();
    gmovCon.remove();
    hUser.remove();
    hCom.remove();
    stateFlag = false;
    tempoArr = [];
}

function setScore(state, tar) {
    if (state == 'win') {
        tar.textContent++;
    } else if (state == 'lose') {
        if (tar.textContent > 0) {
            tar.textContent--;
        }
    } else if (state == 'init') {
        tar.textContent = 0;
    }
}