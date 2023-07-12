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
    "-1": 'lightgray', // think this is irellevant
    '1': 'red',
    '2': 'black'
}
/// probably wont use this 
// const LEVELS ={
//     '0': '12',
//     '1': '9',
//     '2': '6'
//} 

/*----- state variables -----*/
let board; // player choices per turn 
let pegs; // indicating if the choices are included in the secret code 
let currentRow; 
let win; // 4 positions 
let secretCode; // code chosen by random computer 


/*----- cached elements  -----*/
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");
const colorSquares = document.querySelectorAll("div.color-squares");
const pegCells = document.querySelectorAll("div.pegs > div");

/*----- event listeners -----*/
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
// index of starting row 
    currentRow = 0;
    win = false; 
    secretCode = [1,2,3,4]; 
    // secretCode = [
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6),
    //     Math.floor(Math.random()* 6)
    // ];
    //console.log(secretCode);
    render();
}

function render() {
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const cellId = `r${rowIdx}m${colIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal]
        
        });
    }); 
    
    pegs.forEach((rowArr, rowIdx) => {
       // console.log(`this is the rowarr ${rowArr} this is the row index ${rowIdx}`)
        rowArr.forEach((cellVal, colIdx) => {
            //console.log(rowIdx, colIdx, cellVal)
            const pegCellId = `r${rowIdx}p${colIdx}`;
            //console.log(pegCellId)
            const pegCellEl = document.getElementById(pegCellId);
            pegCellEl.style.backgroundColor = PEGCOLORS[cellVal]
        
        });
    }); 
}

function checkChoice(e) {
// checking if code matches exactly
  board[currentRow].forEach((value, index) => {
    if (value === secretCode[index]){
        pegs[currentRow].push('2')
    };
  }) 
  if (board[currentRow].includes(secretCode[0])) {
    pegs[currentRow].push('1');
    } else if (board[currentRow].includes(secretCode[0])) {
     pegs[currentRow].push('1');
    } else if (board[currentRow].includes(secretCode[0])) {
    pegs[currentRow].push('1');
     } else if (board[currentRow].includes(secretCode[0])) {
    pegs[currentRow].push('1');
    }
    checkWin(); 
    currentRow ++; 
    render();
};

function checkWin () {
    if (pegs[currentRow] === [2,2,2,2]) {
        win = true; 
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