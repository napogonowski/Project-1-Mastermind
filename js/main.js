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
    "0": 'grey',
    '1': 'white',
    '2': 'red'
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
const marbelRows = document.querySelectorAll("div.marbles > div");
const colorSquares = document.querySelectorAll("div.color-squares");
const clearBtn = document.querySelector("#clear");
const submitBtn = document.querySelector("#submit");

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

    pegs = [];
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

function render() {
    board[0].forEach((value, idx) => {    
    marbelRows[idx].style.backgroundColor = COLORS[value];
    })
};

function checkChoice(e){

};

// ioncrement current row ++; 
// when clicked, the users code choice is checked 


function addColor(e, colorIndex){
    if(board[0].length >=4) return; 
  board[0].push(colorIndex);
  render(); 
};
    
// when the user clicks a color selector
// the color chosen should fill the firrst available row cell 

function clearChoice(e){
   board[0] = [-1, -1, -1, -1];
   render();
   board[0] = [];
};

// when clicked, the function should clear all previously filled marble cells. 
// any time state is changed; call reneder 