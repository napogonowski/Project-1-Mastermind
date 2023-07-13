# GA Project 1: **Mastermind**
## Game Overview
Mastermind is a code breaking board game invented in 1970. The goal of this game is to crack a secret code, usually set by the other player. My version of the game sees the user battle the mighty computer, who is in charge of setting the secret code. 

## About Me
Hi, I'm Nicholas Pogonowski. I'm a SEI student at General Assembly. I am currently in my 3rd week of my bootcamp and for my first project, i've chosen to make the game Mastermind.  This has been a challenging but fun project to complete.

 Hope you enjoy !

## Game Screenshots
![Imgur](https://i.imgur.com/lNfptqn.png)


## Technologies Used 
* JavaScript
* HTML
* CSS

## Getting Started 
Please click the link to access the game: https://napogonowski.github.io/Project-1-Mastermind/

## Game Rules 
A secret 4-color code has been set. It is your job to crack the code. To start the game, you must enter a code submission. To do this, you click on the colors in the color selector grid. The order in which you click the colors is the order in which they appear on the grid (going from left to right). 

If you are happy with your color code, simply press the "Submit Code" button to recieve your clues.  Clues will appear on 4 smaller cells (Pegs) adjacent to your code. They come in 2 varieties:

    1. Black Pegs:  These pegs indicate that one of your guesses is correct in both color and position.

    2. Red Pegs: These pegs indicate that one of your guesses is correct but in the incorrect position.

If you wish to change your code attempt (before submission), simply press the clear button. This will clear the current row and allow you to try again. 

Once you have cracked the code, the secret code will appear at the top of the board. 

Good luck!

## Challenges faced during the project

The toughest challenge i faced in this project was getting the "checkChoice" function to work correctly. A vital part of Mastermind is the clue pegs you recieve. These are important as they infrom your next guess / strategy.  

In theory it seems quite simply. Check the guess array against the secret code. if a match was found, push values into the peg cells to render the clues('2' = black peg, '1' = red peg). However, as you will discover, it was not so simple. 

My first checking function had 2 parts. The first checked for exact value and index match against the secret code, and the second part checked generally for matching values in the array.  The first problem i ran into was the fucntions overlapped. A correct answer (both in position and color) was being caught in the first check, but as also being caught in the second check. This meant that 1 correct answer was recieving 2 pegs, which is incorrect. 

"Not to worry" i thought naively. After a couple of other attempts to get this working, it occured to me that perhaps i was looking at this wrong. So instead, i checked the Secret code against the players guess and combined my previous two checks, forming a For Each code block As you can see below: 

``` JavaScript
function checkChoice(e) {
    secretCode.forEach((secretValue, secretValueIndex) => {
        if (board[currentRow][secretValueIndex] === secretValue){
            pegs[currentRow].push('2');
        } else if (board[currentRow].includes(secretValue)){
            pegs[currentRow].push('1');
        }
    });
};
``` 
This function was successful in stopping the overlapping, and I gleefully demoed my game, convinced it was finished. During my testing, the secret code was fixed at [0,1,2,3]. However for the project submission, i reinstated the random number generator, and with live conditions, I quickly found another problem. The computer could also have multiples of the same number.  Here we go again. After hours of researching how other, smarter programmers resolved this problem, i figured it would be easier to filter the random numbers to all have unique values and call this saga finished. 

## Next steps

If i had more time, I would have liked to add a difficulty scale / mode.  This would present the user with an option before the game starts of either Easy/medium/hard.

 Their choice would result in: 
 1.  Change the number of rows being rendered. Either 14 rows for easy. 10 rows for medium.  6 row for hard. 
 2. Change the number of colors on offer. Either 4 colors for easy.  6 colors for medium. 8 colors for hard. 
 
 
 I think this feature would be a fun way to challenge user, to keep them playing and truly test their code breaking skills. 