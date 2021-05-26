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

function toTen(input,base) {
  var i,output;
  for (i = 0; i < input.length; i++) {
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