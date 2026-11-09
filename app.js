const startBtn = document.getElementById("start");
const game = document.getElementById("game");

const cat = document.getElementById("cat");
const difficulty = document.getElementById("difficulty");

const word = document.getElementById("word");
const timerDisplay = document.getElementById("timerDisplay");

const p1Input = document.getElementById("p1");
const p2Input = document.getElementById("p2");

const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

const p1Point = document.getElementById("p1Point");
const p2Point = document.getElementById("p2Point");

const historyEl = document.getElementById("history");
const winnerBanner = document.getElementById("winnerBanner");
const newWordBtn = document.getElementById("newWord");

let cats = {};
let bags = {};

let score1 = 0;
let score2 = 0;

let timerInterval = null;

const WIN_SCORE = 15;

/* =========================
   LOAD WORD DATABASE
========================= */

fetch("words.json")
.then(response => response.json())
.then(data => {

    cats = data;

    cat.innerHTML = "";

    Object.keys(cats).forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        cat.appendChild(option);
    });

})
.catch(error => {

    console.error(
        "Failed to load words.json",
        error
    );

    alert(
        "Unable to load word database."
    );
});

/* =========================
   SHUFFLE BAG
========================= */

function shuffle(array){

    const arr = [...array];

    for(
        let i = arr.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [arr[i], arr[j]] =
        [arr[j], arr[i]];
    }

    return arr;
}

function getNextWord(category){

    if(
        !bags[category] ||
        bags[category].length === 0
    ){

        bags[category] =
            shuffle(
                cats[category]
            );
    }

    return bags[category].pop();
}

/* =========================
   RESET GAME
========================= */

function resetGame(){

    score1 = 0;
    score2 = 0;

    score1El.textContent = "0";
    score2El.textContent = "0";

    word.textContent = "READY";

    historyEl.innerHTML = "";

    winnerBanner.style.display =
        "none";

    winnerBanner.innerHTML = "";

    bags = {};

    clearInterval(
        timerInterval
    );

    timerDisplay.textContent =
        difficulty.value;

    timerDisplay.style.color =
        "white";

    localStorage.removeItem(
        "score1"
    );

    localStorage.removeItem(
        "score2"
    );
}

/* =========================
   WINNER SCREEN
========================= */

function winner(name){

    clearInterval(
        timerInterval
    );

    winnerBanner.style.display =
        "block";

    winnerBanner.innerHTML = `
        <div>
            <div style="
                font-size:48px;
            ">
                🏆
            </div>

            <div style="
                font-size:32px;
                font-weight:900;
                margin-top:10px;
            ">
                ${name} WINS!
            </div>

            <div style="
                margin-top:10px;
                font-size:20px;
            ">
                Final Score:
                ${score1} - ${score2}
            </div>

            <button
                id="playAgainBtn"
                style="
                    margin-top:20px;
                    padding:15px 25px;
                    background:#22c55e;
                    color:white;
                    border:none;
                    border-radius:12px;
                    font-size:18px;
                    font-weight:700;
                    cursor:pointer;
                ">
                🎮 Play Again
            </button>
        </div>
    `;

    document
        .getElementById(
            "playAgainBtn"
        )
        .addEventListener(
            "click",
            resetGame
        );
}

/* =========================
   START GAME
========================= */

startBtn.addEventListener(
    "click",
    () => {

        resetGame();

        game.classList.remove(
            "hidden"
        );

        player1Name.textContent =
            p1Input.value;

        player2Name.textContent =
            p2Input.value;

        p1Point.textContent =
            `✅ ${p1Input.value} Got It`;

        p2Point.textContent =
            `✅ ${p2Input.value} Got It`;
    }
);

/* =========================
   NEW WORD
========================= */

newWordBtn.addEventListener(
    "click",
    () => {

        if(
            !cat.value
        ){
            return;
        }

        const nextWord =
            getNextWord(
                cat.value
            );

        word.textContent =
            nextWord;

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "history-item";

        item.textContent =
            nextWord;

        historyEl.prepend(
            item
        );

        while(
            historyEl.children
                .length > 10
        ){

            historyEl.removeChild(
                historyEl.lastChild
            );
        }

        clearInterval(
            timerInterval
        );

        let timeRemaining =
            parseInt(
                difficulty.value
            );

        timerDisplay.textContent =
            timeRemaining;

        timerDisplay.style.color =
            "white";

        timerInterval =
            setInterval(
                () => {

                    timeRemaining--;

                    timerDisplay.textContent =
                        timeRemaining;

                    if(
                        timeRemaining <= 5
                    ){

                        timerDisplay.style.color =
                            "#ef4444";
                    }

                    if(
                        timeRemaining <= 0
                    ){

                        clearInterval(
                            timerInterval
                        );

                        timerDisplay.textContent =
                            "⏰";

                        timerDisplay.style.color =
                            "#ef4444";
                    }

                },
                1000
            );
    }
);

/* =========================
   PLAYER 1 SCORE
========================= */

p1Point.addEventListener(
    "click",
    () => {

        score1 += 3;

        score1El.textContent =
            score1;

        if(
            score1 >= WIN_SCORE
        ){

            winner(
                p1Input.value
            );
        }
    }
);

/* =========================
   PLAYER 2 SCORE
========================= */

p2Point.addEventListener(
    "click",
    () => {

        score2 += 3;

        score2El.textContent =
            score2;

        if(
            score2 >= WIN_SCORE
        ){

            winner(
                p2Input.value
            );
        }
    }
);

/* =========================
   SERVICE WORKER
========================= */

if(
    "serviceWorker"
    in navigator
){

    navigator
        .serviceWorker
        .register("sw.js")
        .catch(console.error);
}
