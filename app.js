let cats = {};
let bags = {};

let score1 = 0;
let score2 = 0;

const WIN_SCORE = 15;

fetch("words.json")
  .then(response => response.json())
  .then(data => {

    cats = data;

    for (const c in cats) {
      cat.innerHTML += `<option>${c}</option>`;
    }
  })
  .catch(err => {
    console.error("Error loading words.json", err);
  });

function shuffle(array) {

  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [arr[i], arr[j]] =
      [arr[j], arr[i]];
  }

  return arr;
}

function getNextWord(category) {

  if (
    !bags[category] ||
    bags[category].length === 0
  ) {

    bags[category] =
      shuffle(cats[category]);
  }

  return bags[category].pop();
}

start.onclick = () => {

  game.style.display = "block";

  document.getElementById(
    "player1Name"
  ).textContent = p1.value;

  document.getElementById(
    "player2Name"
  ).textContent = p2.value;

  document.getElementById(
    "p1Point"
  ).textContent =
    "✅ " + p1.value + " Got It";

  document.getElementById(
    "p2Point"
  ).textContent =
    "✅ " + p2.value + " Got It";
};

newWord.onclick = () => {

  const currentCategory =
    cat.value;

  const wordValue =
    getNextWord(currentCategory);

  word.textContent =
    wordValue;

  addHistory(wordValue);
};

function addHistory(wordText) {

  const history =
    document.getElementById(
      "history"
    );

  const item =
    document.createElement(
      "div"
    );

  item.textContent =
    wordText;

  history.prepend(item);

  while (
    history.children.length > 10
  ) {

    history.removeChild(
      history.lastChild
    );
  }
}

function checkWinner() {

  if (score1 >= WIN_SCORE) {

    showWinner(
      p1.value
    );
  }

  if (score2 >= WIN_SCORE) {

    showWinner(
      p2.value
    );
  }
}

function showWinner(winnerName) {

  const winner =
    document.getElementById(
      "winnerBanner"
    );

  winner.innerHTML =
    "🏆 " +
    winnerName +
    " WINS!";

  winner.style.display =
    "block";

  localStorage.setItem(
    "winner",
    winnerName
  );
}

document
  .getElementById(
    "p1Point"
  )
  .onclick = () => {

    score1 += 3;

    document.getElementById(
      "score1"
    ).textContent =
      score1;

    localStorage.setItem(
      "score1",
      score1
    );

    checkWinner();
  };

document
  .getElementById(
    "p2Point"
  )
  .onclick = () => {

    score2 += 3;

    document.getElementById(
      "score2"
    ).textContent =
      score2;

    localStorage.setItem(
      "score2",
      score2
    );

    checkWinner();
  };

const saved1 =
  localStorage.getItem(
    "score1"
  );

const saved2 =
  localStorage.getItem(
    "score2"
  );

if (saved1) {

  score1 =
    Number(saved1);

  document.getElementById(
    "score1"
  ).textContent =
    score1;
}

if (saved2) {

  score2 =
    Number(saved2);

  document.getElementById(
    "score2"
  ).textContent =
    score2;
}

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("sw.js");
}
