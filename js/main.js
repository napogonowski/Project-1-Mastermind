/*----- constants -----*/
const COLORS = {
    '-1': 'white',
    '0': "#D30000",
    '1': "#0a53c9",
    '2': "#09b009",
    '3': "#FFF200",
    '4': "#c40fd1", 
    '5': "#FF7415"
}

const PEGCOLORS = {
    "-1": 'lightgray',
    '1': 'red',
    '2': 'black'
}
/*----- state variables -----*/
let board; 
let pegs; 
let currentRow; 
let hasWon; 
let secretCode; 

/*----- cached elements  -----*/
const againBtn = document.getElementById('again');
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");
const messageEl = document.querySelector("h3")
const colorSquares = document.querySelectorAll("div.color-squares");
const pegCells = document.querySelectorAll("div.pegs > div");
const secretCodeCells = document.querySelectorAll("div.secret-code > div")

/*----- event listeners -----*/
againBtn.addEventListener('click', clearGame); 
submitBtn.addEventListener("click", checkChoice);
clearBtn.addEventListener("click", clearChoice);
colorSquares.forEach((colorSquare, colorIndex) => {
    colorSquare.addEventListener("click", (event) => addColor(event, colorIndex))
}); 
    
/*----- functions -----*/
init();
function init() {
    board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]; 

    pegs = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];
    currentRow = 0;
    hasWon = false; 
    secretCode = generateSecretCode();
    render();
}

function generateSecretCode() {
    const code = [
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6),
    ];

    const isUnique = code.every((marble, index) => (
        code.filter((m) => m === marble).length === 1
    ));
    if (!isUnique) {
        return generateSecretCode();
    }

    return code;
}

function render() {
    renderBoard();
    renderPegs();
    renderHiddenEls();
    renderMessage();
}

function renderBoard(){
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const cellId = `r${rowIdx}m${colIdx}`;
            const cellEl = document.getElementById(cellId);
            if (cellEl) {
                cellEl.style.backgroundColor = COLORS[cellVal];
            }
        });
    });
}

function renderPegs () {
    pegs.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const pegCellId = `r${rowIdx}p${colIdx}`;
            const pegCellEl = document.getElementById(pegCellId);
            if (pegCellEl) {
                pegCellEl.style.backgroundColor = PEGCOLORS[cellVal]
            }
        });
    }); 
}

function renderHiddenEls () {
   againBtn.style.visibility = hasWon || currentRow > 9 ? 'visible' :  "hidden";
   secretCode.forEach((cellVal, cellIdx) => {
        const secretCellId = `sc${cellIdx}`
        const secretCellEl = document.getElementById(secretCellId)

        secretCellEl.style.backgroundColor = hasWon || currentRow > 9 ? COLORS[cellVal] : "#A7ADBA"
        
   })
}
function renderMessage () {
    if (hasWon === false && currentRow === 0){
        messageEl.innerText = `Submit a Guess to Start The Game `;
    } else if (hasWon === false && currentRow > 0 && currentRow < 9 ){
        messageEl.innerText = `Can You Guess The Code ? `;
    } else if (hasWon === true){
        messageEl.innerText = `Congratulations You Cracked the Code !`;
    } else if (hasWon === false && currentRow > 9 ){
        messageEl.innerText = `Unlucky, Try again?`;
    }
}


function checkChoice(e) {
    secretCode.forEach((secretValue, secretValueIndex) => {
        if (board[currentRow][secretValueIndex] === secretValue){
            pegs[currentRow].push('2');
        } else if (board[currentRow].includes(secretValue)){
            pegs[currentRow].push('1');
        }
    });

    hasWon = checkForWin(); 
    nextRow(); 
    render();
};

function checkForWin () {
    if (pegs[currentRow] === null){
        return false;
    } else if (pegs[currentRow].toString() === [2, 2, 2, 2].toString()) {
        return true; 
    }  else {
        return false;
    }
}

function nextRow () {
    if (hasWon === true) {
        return; 
    }
    if (currentRow < 10) {
        currentRow++; 
    }
}

function addColor (e, colorIndex){
    if(board[currentRow].length >=4) return; 
    board[currentRow].push(colorIndex);
    render(); 
};
    
function clearChoice (e) {
   board[currentRow] = [-1, -1, -1, -1];
   render();
   board[currentRow] = [];
}

function clearGame (e) {
    board = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
    ];
    pegs = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
    ]
    render();
    init(); 
}
