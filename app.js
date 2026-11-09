let cats = {};
let bags = {};

fetch("words.json")
  .then(response => response.json())
  .then(data => {

    cats = data;

    for (const c in cats) {
      cat.innerHTML += `<option>${c}</option>`;
    }

  })
  .catch(err => {
    console.error("Failed to load words.json", err);
  });

function sh(a) {
  a = [...a];

  for (let i = a.length - 1; i > 0; i--) {

    let j = Math.floor(
      Math.random() * (i + 1)
    );

    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

start.onclick = () => {
  game.style.display = "block";
};

newWord.onclick = () => {

  let category = cat.value;

  if (
    !bags[category] ||
    bags[category].length === 0
  ) {

    bags[category] = sh(
      cats[category]
    );
  }

  word.textContent =
    bags[category].pop();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(
    "sw.js"
  );
}
.scoreboard{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
    margin-bottom:20px;
}

.score-card{
    background:#334155;
    padding:15px;
    border-radius:15px;
    text-align:center;
}

.score-card div:first-child{
    font-weight:bold;
}

.score-card div:last-child{
    font-size:42px;
    font-weight:900;
}

.score-btn{
    width:100%;
    margin-top:10px;
    padding:15px;
    font-size:18px;
    font-weight:bold;
}

#winnerBanner{
    margin-top:20px;
    background:#facc15;
    color:#111827;
    padding:20px;
    border-radius:15px;
    text-align:center;
    font-size:28px;
    font-weight:900;
}
let score1 = 0;
let score2 = 0;

const WIN_SCORE = 15;

function checkWinner() {

    if(score1 >= WIN_SCORE){

        showWinner(
            document.getElementById("p1").value
        );
    }

    if(score2 >= WIN_SCORE){

        showWinner(
            document.getElementById("p2").value
        );
    }
}

function showWinner(name){

    let banner =
        document.getElementById(
            "winnerBanner"
        );

    if(!banner){

        banner =
            document.createElement("div");

        banner.id = "winnerBanner";

        document
            .getElementById("game")
            .appendChild(banner);
    }

    banner.innerHTML =
        "🏆 " +
        name +
        " WINS!";
}

document
    .getElementById("p1Point")
    .addEventListener(
        "click",
        () => {

            score1 += 3;

            document
                .getElementById(
                    "score1"
                )
                .textContent = score1;

            checkWinner();
        }
    );

document
    .getElementById("p2Point")
    .addEventListener(
        "click",
        () => {

            score2 += 3;

            document
                .getElementById(
                    "score2"
                )
                .textContent = score2;

            checkWinner();
        }
    );
