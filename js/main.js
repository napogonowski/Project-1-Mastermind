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
    '1': 'red',
    '2': 'black'
}

/*----- state variables -----*/
let board; // player choices per turn 
let pegs; // indicating if the choices are included in the secret code 
let currentRow; 
let win; // 4 positions 
let secretCode; // code chosen by random computer 


/*----- cached elements  -----*/
const againBtn = document.getElementById('again');
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");
const colorSquares = document.querySelectorAll("div.color-squares");
const pegCells = document.querySelectorAll("div.pegs > div");
const secretCodeCells = document.querySelectorAll("div.secret-code > div")

/*----- event listeners -----*/
againBtn.addEventListener('click', init); 
// submitting selection
submitBtn.addEventListener("click", checkChoice);
//clearing seleciton 
clearBtn.addEventListener("click", clearChoice);

colorSquares.forEach((colorSquare, colorIndex) => {
    colorSquare.addEventListener("click", (event) => addColor(event, colorIndex))
}); 
    
/*----- functions -----*/
init();
// initialise all state, then call render; 
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
    ];
    currentRow = 0;
    win = false; 
    secretCode = [0,1,2,3]; 
    // secretCode = [
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6)
    // ];
    render();
}

function render() {
    renderBoard();
    renderPegs();
    renderHiddenEls();
}

function renderBoard(){
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const cellId = `r${rowIdx}m${colIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal]
        
        });
    }); 
}

function renderPegs () {
    pegs.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const pegCellId = `r${rowIdx}p${colIdx}`;
            const pegCellEl = document.getElementById(pegCellId);
            pegCellEl.style.backgroundColor = PEGCOLORS[cellVal]
        });
    }); 
}

function renderHiddenEls () {
   againBtn.style.visibility = win ? 'visible' :  "hidden";
   secretCodeCells.forEach(function (cellVal, cellIdx) {
        const secretCellId = `sc${cellIdx}`
        const secretCellEl = document.getElementById(secretCellId)
        secretCellEl.style.backgroundColor = win ? COLORS[cellVal] : "#A7ADBA"
   })

}

function checkChoice(e) {
    let secondCheckArray;
    // console.log(board[currentRow]);
  board[currentRow].forEach((value, index) => {
    if (value === secretCode[index]){
        pegs[currentRow].push('2');
        secondCheckArray = board[currentRow].map(function (value) {
             if( value !== secretCode[index]){
                return value;
             } else {
                return null;
             }
        })
    };
  }) 
    console.log(secondCheckArray)
  if (secondCheckArray.includes(secretCode[0])) {
        pegs[currentRow].push('1');
    } else if (secondCheckArray.includes(secretCode[1])) {
        pegs[currentRow].push('1');
    } else if (secondCheckArray.includes(secretCode[2])) {
        pegs[currentRow].push('1');
     } else if (secondCheckArray.includes(secretCode[3])) {
        pegs[currentRow].push('1');
    }
    checkWin(); 
    currentRow ++; 
    render();
};

function checkWin () {
    if (pegs[currentRow] === [2,2,2,2]) {
        win = true; 
    // reveal secret code at the top 
    // render message congrats 
    // reveal play again button , which will initalise the game over again 
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


/// if win = true "congrats ! you did it "
// if win = false && currentrow > 9 "You couldn't guess the code, hit play again "