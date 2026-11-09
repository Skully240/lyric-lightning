let cats = {};
let bags = {};

let score1 = 0;
let score2 = 0;

const WIN_SCORE = 15;

fetch("words.json")
.then(r => r.json())
.then(data => {

    cats = data;

    for(const category in cats){

        document.getElementById("cat")
            .innerHTML +=
            `<option>${category}</option>`;
    }
});

function shuffle(array){

    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--){

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

document
.getElementById("start")
.onclick = () => {

    document
        .getElementById("game")
        .classList
        .remove("hidden");

    document
        .getElementById("player1Name")
        .textContent =
        document
        .getElementById("p1")
        .value;

    document
        .getElementById("player2Name")
        .textContent =
        document
        .getElementById("p2")
        .value;

    document
        .getElementById("p1Point")
        .textContent =
        "✅ " +
        document
        .getElementById("p1")
        .value +
        " Got It";

    document
        .getElementById("p2Point")
        .textContent =
        "✅ " +
        document
        .getElementById("p2")
        .value +
        " Got It";
};

document
.getElementById("newWord")
.onclick = () => {

    const category =
    document
    .getElementById("cat")
    .value;

    const word =
    getNextWord(category);

    document
    .getElementById("word")
    .textContent =
    word;

    const item =
    document.createElement("div");

    item.className =
    "history-item";

    item.textContent =
    word;

    document
    .getElementById("history")
    .prepend(item);
};

function winner(name){

    const banner =
    document
    .getElementById(
        "winnerBanner"
    );

    banner.style.display =
    "block";

    banner.textContent =
    "🏆 " +
    name +
    " WINS!";
}

document
.getElementById("p1Point")
.onclick = () => {

    score1 += 3;

    document
    .getElementById("score1")
    .textContent =
    score1;

    if(score1 >= WIN_SCORE){

        winner(
            document
            .getElementById("p1")
            .value
        );
    }
};

document
.getElementById("p2Point")
.onclick = () => {

    score2 += 3;

    document
    .getElementById("score2")
    .textContent =
    score2;

    if(score2 >= WIN_SCORE){

        winner(
            document
            .getElementById("p2")
            .value
        );
    }
};

if("serviceWorker" in navigator){

    navigator
    .serviceWorker
    .register("sw.js");
}
