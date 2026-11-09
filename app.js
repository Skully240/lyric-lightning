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
