var convertModalBtn = document.getElementById("convertModalButton");

var convertModal = document.getElementById("converterModal");

var close = document.getElementsByClassName("close");

var convertBtn = document.getElementById("convertButton");

var number = document.getElementById("Number");


var secondBtn = document.getElementById("secondButton");

var secondModal = document.getElementById("secondModal");

var secondModalContent = document.getElementById("secondModalContent");

let boxes = document.getElementsByClassName("box");

var playAgainBtn = document.getElementById("playAgainBtn");

var currentBox = 0;

var currentRow = 1;

var possibleWords = [];

var guessableWords = [];

var answer;

var finished = false;

var playAgainBtn = document.getElementById("playAgainBtn");

var possibleRequest = new XMLHttpRequest();
possibleRequest.open('GET', 'https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/5d752e5f0702da315298a6bb5a771586d6ff445c/wordle-answers-alphabetical.txt');
possibleRequest.onload = function(){
    possibleWords = this.responseText.split(/\n/);
};
possibleRequest.send();

var guessableRequest = new XMLHttpRequest();
guessableRequest.open('GET', 'https://gist.githubusercontent.com/cfreshman/cdcdf777450c5b5301e439061d29694c/raw/de1df631b45492e0974f7affe266ec36fed736eb/wordle-allowed-guesses.txt');
guessableRequest.onload = function(){
    guessableWords = this.responseText.split(/\n/);
};
guessableRequest.send();


window.addEventListener("keydown", function (e){
    if(secondModal.style.display == "block"){
        if(e.key >= 'a' && e.key <= 'z')
            addLetter(e.key);
        if(e.key == 'Backspace' || e.key == 'Delete')
            deleteLetter();
        if(e.key == 'Enter')
            submitGuess();
    }
});

function addLetter(e){
    if(currentBox < currentRow * 5 && !finished){
        boxes[currentBox].innerHTML = e.toUpperCase();
        boxes[currentBox].style.border = "2px solid rgb(130, 130, 130)";
        currentBox++;
    }
}

function deleteLetter(){
    if(currentBox % 5 != 0 || currentRow * 5 == currentBox && !finished){
        if(currentBox > 0)
            currentBox--;
        boxes[currentBox].innerHTML = "";
        boxes[currentBox].style.border = "1px solid rgb(168, 168, 168)";
    }
}

function submitGuess(){
    var guess = "";
    var letters = [];
    // 5 letter guess
    if(currentBox % 5 == 0 && currentBox != 0){
        letters = Array.from(boxes).slice(currentBox - 5, currentBox);
        guess = letters.map(box => box.innerHTML).join('');
    }
    // check if word is in guessable list
    if(guessableWords.includes(guess.toLowerCase()) || possibleWords.includes(guess.toLowerCase())){
        letters.forEach(box => box.setAttribute("style", "color: #ffffff;"));
        // correct guess
        if(guess.toLowerCase() === answer){
            letters.forEach(box => box.setAttribute("style", "background-color: #64b95c; color: #ffffff"));
            finished = true;
        } else {
            // incorrect guess
            for(let i = 0; i < 5; i++){
                if(guess.charAt(i).toLowerCase() == answer.charAt(i))
                    letters[i].style.backgroundColor = "#64b95c";
                else if(answer.includes(guess.charAt(i).toLowerCase()))
                    letters[i].style.backgroundColor = "#e0ca69";
                else
                    letters[i].style.backgroundColor = "#717678"
            }
            currentRow++;
        }
        
    } else {
        // invalid guess (abcde)
    }
}

playAgainBtn.onclick = function(){
    finished = false;
    answer = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    for(let i = 0; i <= currentBox; i++){
        boxes[i].innerHTML = '';
        boxes[i].style.backgroundColor = "#ffffff";
        boxes[i].style.color = "#000000";
    }
    currentBox = 0;
    currentRow = 1;
}


convertModal.addEventListener("keydown", function(e){
  if(e.code === "Enter"){
    convert();
  }
});

number.addEventListener("keydown", function(e){
  if(e.code === "Enter"){
    convert();
  }
});

convertModalBtn.onclick = function(){
    convertModal.style.display = "block";
}

secondBtn.onclick = function(){
    secondModal.style.display = "block";
    if(!finished)
        answer = possibleWords[Math.floor(Math.random() * possibleWords.length)];
}

for(var i = 0; i < close.length; i++){
    close[i].onclick = function(){
      convertModal.style.display = "none";
      secondModal.style.display = "none";
    }
}

window.onmousedown = function(event) {
    if (event.target == convertModal || event.target == secondModal) {
      convertModal.style.display = "none";
      secondModal.style.display = "none";
    }
}

function convert() {
  var fromBase = +document.getElementById("FromBase").value;
  var toBase = document.getElementById("ToBase").value;
  var input = document.getElementById("Number").value;
  var error = document.getElementById("error");
  if(fromBase < 11){
    for(let i = 0; i < input.length; i++){
      if(input.charCodeAt(i) < 48 || input.charCodeAt(i) > 48 + fromBase - 1){
        error.textContent = "Please enter a valid number";
        error.style.color = "red";
        return;
      }
    }
  } else {
    for(let i = 0; i < input.length; i++){
      if(input.charCodeAt(i) < 48 || (input.charCodeAt(i) > 57 && input.charCodeAt(i) < 65) || input.charCodeAt(i) > 54 + fromBase ){
        error.textContent = "Please enter a valid number";
        error.style.color = "red";
        return;
      }
    }
  }
  error.textContent = "";
  var result = toTen(input,fromBase);
  result = fromTen(result,toBase);
  document.getElementById("Result").value = result;
}

function toTen(input,base) {
  var output = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    var c;
    c = input.charCodeAt(i) - 48;
    if(c > 9)
      c-=7;
    output = output + (c * Math.pow(base, input.length - i - 1));
  }
  return output;
}

function fromTen(input,base){
  var output = "";
  var remainder = input;
  var quotient = input;
  if (base < 11){ 
    while(quotient > 0){
      remainder = quotient % base;
      quotient = Math.floor(quotient / base);
      output = remainder.toString() + output;
    }
  } else {
    while(quotient > 0){
      remainder = quotient % base;
      quotient = Math.floor(quotient / base);
      if(remainder < 9)
        output = remainder.toString() + output;
      else
        output = String.fromCharCode(remainder + 55) + output;
    }
  }
  return input == 0? 0:output;
}