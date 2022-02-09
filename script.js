var convertModalBtn = document.getElementById("convertModalButton");

var convertModal = document.getElementById("converterModal");

var close = document.getElementsByClassName("close");

var convertBtn = document.getElementById("convertButton");

var number = document.getElementById("Number");


var secondBtn = document.getElementById("secondButton");

var secondModal = document.getElementById("secondModal");

var secondModalContent = document.getElementById("secondModalContent");

var boxes = document.getElementsByClassName("box");

var currentBox = 0;


window.addEventListener("keydown", function (e){
  if(secondModal.style.display == "block" && (e.key >= 'a' && e.key <= 'z')){
    boxes[currentBox].innerHTML = e.key.toUpperCase();
    boxes[currentBox].style.border = "2px solid rgb(130, 130, 130)";
    currentBox++;
  }
});

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