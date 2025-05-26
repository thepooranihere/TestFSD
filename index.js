const cardArray = [
  { name: "bts", img: "./src/bts.png" },
  { name: "jk", img: "./src/jk.png" },
  { name: "jung", img: "./src/jung.png" },
  { name: "kim", img: "./src/kim.png" },
  { name: "kpop", img: "./src/kpop.png" },
  { name: "v", img: "./src/v.png" },
  { name: "bts", img: "./src/bts.png" },
  { name: "jk", img: "./src/jk.png" },
  { name: "jung", img: "./src/jung.png" },
  { name: "kim", img: "./src/kim.png" },
  { name: "kpop", img: "./src/kpop.png" },
  { name: "v", img: "./src/v.png" },
];
const board = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
function shuffle() {
  cardArray.sort(() => 0.5 - Math.random());
}
function createBoard() {
  board.innerHTML = "";
  shuffle();
  cardArray.forEach((item, index) => {
    const card = document.createElement("div");
    card.setAttribute("data-id", index);
    card.classList.add("card");
    const cardFront = document.createElement("img");
    cardFront.src = item.img;
    card.appendChild(cardFront);
    const cardBack = document.createElement("div");
    cardBack.classList.add("back");
    const backImg = document.createElement("img");
    backImg.src = "./src/card.png";
    backImg.alt = "Card back";
    cardBack.appendChild(backImg);
    card.appendChild(cardBack);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}
function flipCard() {
  const cardId = this.getAttribute("data-id");
  if (cardsChosenId.includes(cardId) || this.classList.contains("flipped"))
    return;
  this.classList.add("flipped");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 700);
  }
}
function checkForMatch() {
  const cards = document.querySelectorAll(".card");
  const [firstId, secondId] = cardsChosenId;
  if (cardsChosen[0] === cardsChosen[1]) {
    cardsWon.push(firstId, secondId);
  } else {
    cards[firstId].classList.remove("flipped");
    cards[secondId].classList.remove("flipped");
  }
  cardsChosen = [];
  cardsChosenId = [];
  if (cardsWon.length === cardArray.length) {
    document.getElementById("winMessage").style.display = "block";
  }
}
restartBtn.addEventListener("click", createBoard);
createBoard();
