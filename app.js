const startBtn = document.getElementById("start");
const game = document.getElementById("game");
const cat = document.getElementById("cat");
const word = document.getElementById("word");

const player1Input = document.getElementById("p1");
const player2Input = document.getElementById("p2");

const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

const p1Point = document.getElementById("p1Point");
const p2Point = document.getElementById("p2Point");

const historyEl = document.getElementById("history");
const winnerBanner = document.getElementById("winnerBanner");
const newWordBtn = document.getElementById("newWord");

let score1 = 0;
let score2 = 0;
let bags = {};
let cats = {};

const WIN_SCORE = 15;

fetch("words.json")
.then(r => r.json())
.then(data => {

    cats = data;

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
        "words.json failed to load",
        error
    );
});

function shuffle(array){

    const arr = [...array];

    for(
        let i = arr.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() * (i + 1)
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
            shuffle(cats[category]);
    }

    return bags[category].pop();
}

startBtn.addEventListener(
    "click",
    () => {

        game.classList.remove("hidden");

        player1Name.textContent =
            player1Input.value;

        player2Name.textContent =
            player2Input.value;

        p1Point.textContent =
            `✅ ${player1Input.value} Got It`;

        p2Point.textContent =
            `✅ ${player2Input.value} Got It`;
    }
);

newWordBtn.addEventListener(
    "click",
    () => {

        if(!cat.value){
            return;
        }

        const next =
            getNextWord(cat.value);

        word.textContent =
            next;

        const item =
            document.createElement("div");

        item.textContent =
            next;

        historyEl.prepend(item);
    }
);

function showWinner(name){

    winnerBanner.style.display =
        "block";

    winnerBanner.textContent =
        `🏆 ${name} WINS!`;
}

p1Point.addEventListener(
    "click",
    () => {

        score1 += 3;

        score1El.textContent =
            score1;

        if(
            score1 >= WIN_SCORE
        ){
            showWinner(
                player1Input.value
            );
        }
    }
);

p2Point.addEventListener(
    "click",
    () => {

        score2 += 3;

        score2El.textContent =
            score2;

        if(
            score2 >= WIN_SCORE
        ){
            showWinner(
                player2Input.value
            );
        }
    }
);

if(
    "serviceWorker"
    in navigator
){

    navigator.serviceWorker
        .register("./sw.js")
        .catch(console.error);
}
const item =
document.createElement("div");

item.className =
"history-item";

item.textContent =
word;

historyEl.prepend(item);

while(historyEl.children.length > 10){

    historyEl.removeChild(
        historyEl.lastChild
    );
}
