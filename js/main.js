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
    '1': 'white',
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
//const marbelCells = document.querySelectorAll("div.marbles > div");
const colorSquares = document.querySelectorAll("div.color-squares");
const pegCells = document.querySelectorAll("div.pegs > div");

/*----- event listeners -----*/
// submitting selection
submitBtn.addEventListener("click", checkChoice)
//clearing seleciton 
clearBtn.addEventListener("click", clearChoice)


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
        [],
    ];
// index of starting row 
    currentRow = 0;
    win = false; 
    secretCode = [
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6),
        Math.floor(Math.random()* 6)
    ];
    //console.log(secretCode);
    render();
}
// board[currentRow].forEach((value, idx) => {    
//     marbelCells[idx * currentRow].style.backgroundColor = COLORS[value];
// })

function render() {
    board.forEach(function (rowArr, rowIdx){
        rowArr.forEach(function (cellVal, colIdx){
            const cellId = `r${rowIdx}m${colIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal]

        
            //cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
};

 function checkChoice(e){

 };

// essentially winning logic 
// we want to compare arrays to secret arrays 
// if === win = true 
// if correct vals (colors)/ in wrong spot = 1+s 
// if correct val in correct idx = 2 
// then push that array and render the pegs 


function addColor(e, colorIndex){
    if(board[currentRow].length >=4) return; 
    board[currentRow].push(colorIndex);
    render(); 
};
    
function clearChoice(e){
   board[currentRow] = [-1, -1, -1, -1];
   render();
   board[currentRow] = [];
};

