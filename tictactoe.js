const boxes = document.querySelectorAll('.box');
for (let box of boxes) {
    box.innerText = ' ';
}
let turn = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let music = new Audio("tictactoe/ting.mp3");
let gameover = new Audio('tictactoe/gameover.mp3');
let count = 0;
function checkWin() {
    count++;
    const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let w = 0; w < 8; w++) {
        const [a, b, c] = win[w];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            return true;
        }
        if (boardState[0] === boardState[4] && boardState[4] === boardState[8]) {
            return true;
        }
        if (boardState[2] === boardState[4] && boardState[4] === boardState[6]) {
            return true;
        }
        else {
            return false;
        }
    }
}
function changeTurn(turn) {
    if (turn === 'X') {
        document.querySelector('.text').innerText = "O's Turn";
        return 'O';
    }
    else {
        document.querySelector('.text').innerText = "X's Turn";
        return 'X';
    }
}
for (let box of boxes) {
    box.addEventListener('click', (e) => {
        box.innerText = turn;
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        boardState[clickedCellIndex] = turn;
        music.play();
        if (checkWin()) {
            document.querySelector('#gif').style.display = 'block';
            document.querySelector('.text').innerText = `Game Over ${turn} won`;
            gameover.play();

        }
        else {
            turn = changeTurn(turn);
            if (count === 9) {
                document.querySelector('.text').innerText = `IT'S A DRAW`;
                gameover.play();
            }
        }

    })
}
const reset = document.querySelector('#reset');
reset.addEventListener('click', e => {
    for (let box of boxes) {
        box.innerText = ' ';
    }
    document.querySelector('.text').innerText = "X's Turn";
    document.querySelector('#gif').style.display = 'none';
    turn = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    count=0;
})