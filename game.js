let buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedRes = [];
var level = 0;


$(document).keydown(function() {
  $("#level-title").text("Level " + level);
  nextSequence();
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedRes.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedRes.length - 1);
});

function checkAnswer(res) {
  // check if the user answer is the same as the game pattern.
  if (gamePattern[res] === userClickedRes[res]) {
    // If the user got the answer right, then check that they have finished their sequence with another if statement
    if (userClickedRes.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //restart  the gmae
    level = 0;
    gamePattern = [];
    started = false;
  }
}


function nextSequence() {
  userClickedRes = [];
  level++;
  $("h1").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
