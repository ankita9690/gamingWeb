//detecting sounds
var num = document.querySelectorAll(".drum").length;
for (var i = 0; i < num; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var switchvar = this.innerHTML;
    switching(switchvar);
    animation(switchvar);
  });
}

//detecting keypress
document.addEventListener("keypress", function(event) {
  switching(event.key);
  animation(event.key);
});


//switching function
function switching(k) {
  switch (k) {
    case "w":
      var audio = new Audio("/sounds/drumkit_mp3/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("/sounds/drumkit_mp3/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("/sounds/drumkit_mp3/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("/sounds/drumkit_mp3/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("/sounds/drumkit_mp3/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("/sounds/drumkit_mp3/crash.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("/sounds/drumkit_mp3/kick-bass.mp3");
      audio.play();
      break;
    default:
      console.log(switchvar);
  }
}

//animation
function animation(currentKey) {
var activebtn= document.querySelector("." + currentKey);
activebtn.classList.add("pressed");
setTimeout (function(){
activebtn.classList.remove("pressed");
},200);

}
