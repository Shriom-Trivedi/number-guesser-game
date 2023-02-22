/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Lest player choose to play again
*/

//Game Values 
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
   
//UI Variables
const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');    
const guessInput = document.querySelector('#guess-input');    
const message = document.querySelector('.message');    

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
}); 

//event listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max) {

   setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if(guess === winningNum) {
    //disable input
    guessInput.disabled = true;;
    //border is green
    guessInput.style.borderColor = 'green';
    //set message
    setMessage(`${winningNum} is correct, YOU WON !`, 'green');
 
    //play again
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';
  } else {
    //wrong Number
    guessesLeft = guessesLeft - 1;

    if(guessesLeft === 0) {
    //game over - lost
    //disable input
    guessInput.disabled = true;;
    //border is green
    guessInput.style.borderColor = 'red';
    //set message
    setMessage(`Game over, You lost, The correct number is ${winningNum}`, 'red');    

     //play again
      guessBtn.value = 'Play Again';
      guessBtn.className += 'play-again';

  } else {
    guessInput.style.borderColor = 'red';
    //game continues - answer wrong 
    setMessage(`${guess} is incorrect, ${guessesLeft} chances are left`, 'red');    

    //clear input
    guessInput.value = '';  
  }
}


});

//set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;


  
}

//get winning num
function getRandomNum(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}