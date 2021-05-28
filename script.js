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

convertBtn.onclick() = function(event) {
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
    if(input.charCodeAt(i) < 48 || (input.charCodeAt(i) > 57 && input.charCodeAt(i) < 65) || input.charCodeAt(i) > 54 + fromBase ){
      //error
      return;
    }
  }
  var result = toTen(input,fromBase);
  result = fromTen(result,toBase);
  return result;
}

function toTen(input,base) {
  var output = 0;
  for (let i = 0; i < input.length; i++) {
    output += input.charAt(i) * Math.pow(base,i);
  }
  return output;
}

function fromTen(input,base){
  var output;
  var remainder = input % base;
  var quotient = input / base;
  while(quotient > 0){
    output = remainder + output;
    quotient = quotient / base;
    remainder = quotient % base;
  }
  return output;
}