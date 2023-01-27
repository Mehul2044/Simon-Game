const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let j = 0;
let started = false;
let level = 0;
let gameActive = true;

function playAudio(filename) {
    new Audio("assets/sounds/" + filename + ".mp3").play().then(null);
}

function resetGame() {
    $(".container").hide();
    let score = level - 1;
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over!!<br><br>Total Levels Cleared:" + score + "<br><br>Press any key to restart!");
    $(document).on("keydown", function () {
        if (!gameActive) {
            $(".container").show();
            changeLevel();
            setTimeout(function () {
                startLevel();
                gameActive = true;
            }, 500);
        }
    });
}

function startLevel() {
    gamePattern.push(Math.floor(Math.random() * 4));
    if (level > 0) {
        let randomColor = buttonColors[gamePattern[level - 1]];
        randomChooseAnimation(randomColor);
        playAudio(randomColor);
    }
}

$("." + "btn").on("click", function () {
    $(this).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 150);
    playAudio($(this).attr("id"));
    if (started) {
        let userChosenColor = $(this).attr("id");
        if (userChosenColor === buttonColors[gamePattern[j]]) {
            j++;
            if (j === level) {
                setTimeout(function () {
                    changeLevel();
                    startLevel();
                }, 500);

            }
        } else {
            gameActive = false;
            resetGame();
        }
    }
});

function randomChooseAnimation(chosenId) {
    $("#" + chosenId).fadeIn(100).fadeOut(100).fadeIn(100);
}

function changeLevel() {
    level++;
    $("h1").text("Level " + level);
    j = 0;
}

$("body").on("keydown", function () {
    if (!started) {
        started = true;
        level++;
        $("h1").text("Level " + level);
        startLevel();
    }
});