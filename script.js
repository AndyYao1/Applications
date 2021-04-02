var btn = document.getElementById("convertButton");

var convertModal = document.getElementById("converterModal");

var close = document.getElementsByClassName("close")[0];

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

function customInput(that) {
    if (that.value == "Custom") {
        document.getElementById("Custom").style.display = "block";
    } else {
        document.getElementById("Custom").style.display = "none";
    }
}