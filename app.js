let count = 1;
let idx = 0; // Index to track the current position in the gamePattern
let body = document.querySelector("body");
let gamePattern = [];
let gameStarted = false;
let audioGameStart = new Audio("./assets/mixkit-arabian-mystery-harp-notification-2489.wav");
let audioGameOver = new Audio("./assets/mixkit-arcade-retro-game-over-213.wav");
let audioBox = new Audio("./assets/mixkit-arcade-game-jump-coin-216.wav");
let audioVictory = new Audio("./assets/11l-victory_sound_with_t-1749487402950-357606.mp3");
body.addEventListener("keypress", function (){
    if(gameStarted) {
        return;
    }
    audioGameStart.currentTime = 0; // Reset audio to start
    audioGameStart.play();
    // let heading = document.querySelector("#level-heading");
    gameStarted = true;
    alert("Game Started! Remember the sequence of colors.");
    setTimeout(function() {
        startGame();
    }, 1000);    
});
function randomNumber() {
    return Math.floor(Math.random() * 4)+1;
}
function flashColor(btn) {
    btn.classList.add("flash");
        setTimeout(function() {
            btn.classList.remove("flash");
        }, 500);
}
let containers = document.querySelector(".container");
containers.addEventListener("click", function(event) {
    audioBox.currentTime = 0; // Reset audio to start
    audioBox.play();
    if(event.target.tagName === "BUTTON") {
        flashColor(event.target);
    } 
    if(gameStarted){
        let clickedColor = event.target.id;
        if(clickedColor === gamePattern[idx]) {
            idx++;
            if(idx === gamePattern.length) {
                setTimeout(function() {
                    count++;
                    startGame();
                }, 1000);
                idx = 0; // Reset index for next round
            }
        } else {
            document.querySelector("#level-heading").innerHTML = "Game Over! You reached Level " + count;
            body.classList.add("gameOver");
            audioGameOver.currentTime = 0; // Reset audio to start
            audioGameOver.play();
            alert("Wrong color! Game Over! You reached Level " + count);
            showScoreCard(count); 
        }
    }   
});
function startGame() {
    document.querySelector("#level-heading").innerHTML = "Level " + count;
    let randomColor = randomNumber();
        if(randomColor == 1) {
            gamePattern.push("box1");
            let box1 = document.querySelector("#box1");
            flashColor(box1);
        }else if(randomColor == 2){
            gamePattern.push("box2");
            let box2 = document.querySelector("#box2");
            flashColor(box2);
        }else if(randomColor == 3){
            gamePattern.push("box3");
            let box3 = document.querySelector("#box3");
            flashColor(box3);
        } else if(randomColor == 4){
            gamePattern.push("box4");
            let box4 = document.querySelector("#box4");
            flashColor(box4);
        }
}
function showScoreCard(score) {
    audioVictory.currentTime = 0;
    audioVictory.play();
    let card = document.createElement("div");
    card.id = "score-card";

    const quotes = [
        "Oops! Try again, you got this! 💪",
        "Don't worry, even superheroes fail sometimes! 🦸‍♂️",
        "Level up next time! 🚀",
        "Keep calm and play again! 🎮"
    ];
    let quote = quotes[Math.floor(Math.random() * quotes.length)];

    card.innerHTML = `<strong>Score: ${score}</strong><br>${quote}`;
    document.body.appendChild(card);

    setTimeout(() => card.style.opacity = 1, 100);

    setTimeout(() => {
        card.style.opacity = 0;
        setTimeout(() => card.remove(), 500);
    }, 5000);
}

