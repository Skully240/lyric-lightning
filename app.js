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
