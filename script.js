var btn = document.getElementById("convertModalButton");

var convertModal = document.getElementById("converterModal");

var close = document.getElementsByClassName("close")[0];

var convertBtn = document.getElementById("convertButton");

btn.onclick = function(){
    convertModal.style.display = "block";
}

close.onclick = function(){
    convertModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == convertModal) {
      convertModal.style.display = "none";
    }
  }

function convert() {
  var fromBase = document.getElementById("FromBase").value;
  var toBase = document.getElementById("ToBase").value;
  var input = document.getElementById("Number").value;
  if(fromBase < 11){
    for(let i = 0; i < input.length; i++){
      if(input.charCodeAt(i) < 48 || input.charCodeAt(i) > 48 + fromBase - 1){
        //error
        return;
      }
    }
  } else {
    for(let i = 0; i < input.length; i++){
      if(input.charCodeAt(i) < 48 || (input.charCodeAt(i) > 57 && input.charCodeAt(i) < 65) || input.charCodeAt(i) > 54 + fromBase ){
        //error
        return;
      }
    }
  }
  var result = toTen(input,fromBase);
  result = fromTen(result,toBase);
  document.getElementById("Result").value = result;
}

function toTen(input,base) {
  var output = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    var c;
    if(base < 11)
      c = input.charCodeAt(i) - 48;
    else 
      c = input.charCodeAt(i) - 55;
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