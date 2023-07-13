# GA Project 1: **Mastermind**
## Game Overview
Mastermind is a code breaking board game invented in 1970. The goal of this game is to crack a secret code, usually set by the other player. My version of the game sees the user battle the mighty computer, who is in charge of setting the secret code. 

## About Me
Hi, I'm Nicholas Pogonowski. I'm a SEI student at General Assembly. I am currently in my 3rd week of my bootcamp and for my first project, i've chosen to make the game Mastermind.  This has been a challenging but fun project to complete.

 Hope you enjoy !

## Game Screenshots



## Technology Used 
* JavaScript
* HTML
* CSS

## Getting Started 
Please click the link below to access the game: 
(URL)

## Game Rules 
A secret 4-color code has been set. It is your job to crack the code. To start the game, you must enter a code submission. To do this, you click on the colors in the color selector grid. The order in which you click the colors is the order in which they appear on the grid (going from left to right). 

If you are happy with your color code, simply press the "Submit Code" button to recieve your clues.  Clues will appear on 4 smaller cells (Pegs) adjacent to your code. They come in 2 varieties:

    1. Black Pegs:  These pegs indicate that one of your guesses is correct in both color and position.

    2. Red Pegs: These pegs indicate that one of your guesses is correct but in the incorrect position.

If you wish to change your code attempt (before submission), simply press the clear button. This will clear the current row and allow you to try again. 

Once you have cracked the code, the secret code will appear at the top of the board. 

Good luck!

## Challenges faced during the project

The toughest challenge if faced in this project was getting the "checkChoice" function to work correctly. A vital part of Mastermind is the clue pegs you recieve. These are vital as they infrom your next guess / strategy.  

In theory it seems quite simply. Check the guess array against the secret code. if a match was found, push values into the peg cells to render the clues. However, as you will discover, it was not so simple. 

My first checking function had 2 parts. The first checked for exact value and index match against the secret code, and the second part checked generally for matching values in the array.  The first problem i ran into was the fucntions overlapped. A correct answer (both in position and color) was being caught in the first check, but as also being caught in the second check. This meant that 1 correct answer was recieving 2 pegs, which is incorrect. 

"Not to worry" i thought naively. My solution to this problem was replace the first check with a map array method and defining a new array. The new array would recieve the values that didn't exactly match any secret code value, and replace the ones that did with a null value, to insure the index of the guess' remained the same.   This new array would then go through the second check, eliminating any overlap.  This soultion was successful as there was no longer any overlap in peg values and 1 correct guess was receiving only 1 clue. Satisfied with my solution, i demoed the game gleefully, only to run into the next iteration of this Hyrda like problem. 

```JavaScript
ExampleSecretArray = [1,2,3,4]

ExampleGuessArray = [1,1,0,0]

ModifiedExampleArray =[null, 1, 0, 0]
```
The above code, is a recreation of the next problem i had to tackle. The modified array did in fact remove the "value & index match". However in this example, if the user guessed the number 1 twice, the second check would still give that number a peg clue, despite the secret code only containing a single 1. On the brink of insanity, it occured to me that i would going about the checking process all wrong. Instead of checking the guess code against the secret code, I needed to flip it, check the secret code against the guess and remove the secret values once a match was found. 

```JavaScript

function checkChoice(e) {
    secretCode.forEach((secretValue, secretValueIndex) => {
        if (board[currentRow][secretValueIndex] === secretValue){
            pegs[currentRow].push('2');
        } else if (board[currentRow].includes(secretValue)){
            pegs[currentRow].push('1');
        }
    }); 
    hasWon = checkForWin(); 
    currentRow ++; 
    render();
};
```

Through this approach, I could also combine both checks and push the values attributed to different ranked clues directly into the pegs array. 

There were a lot of key takeaways from dealing with this problem:  The first being, that there is many different and equally correct ways to approach a problem. And the Second is that sometimes failing can lead you to correct solution. 

## Next steps

If i had more time, I would have liked to add a difficulty scale / mode.  This would present the user with an option before the game starts of either Easy/medium/hard.

 Their choice would result in: 
 1.  Change the number of rows being rendered. Either 14 rows for easy. 10 rows for medium.  6 row for hard. 
 2. Change the number of colors on offer. Either 4 colors for easy.  6 colors for medium. 8 colors for hard. 
 
 
 I think this feature would be a fun way to challenge user, to keep them playing and truly test their code breaking skills. 