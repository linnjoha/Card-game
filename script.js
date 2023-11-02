/*start
-random kort visas-
så länge räknare på antal gissningar !=0 && antal kort !=0
välj alternativ på gissning för nästa random kort
 == random kort || < random kort || >random kort
   -if du gissar rätt räknare för poäng++
      - else räknare på antal gissningar kvar--
      -räknare för antal kort--*/

/*
-räknare för poäng
var
-räknare för gissningar
var if felsvar -- på gissning
-räknare för antal kort kvar
var
-buttons med click event 

-random kort från objekt

---TO DO----
samma objekt ska ej kunna visas två ggr.
11,12,13,14 = Kn, Q, K A

     */

function randomCardFromCardDeck() {
  const cards = [];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const suits = ["&heartsuit;", "&diamondsuit;", "&spadesuit;", "&clubsuit;"];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      const value = values[v];
      const suit = suits[s];
      let color = "black";
      if (suit == "&heartsuit;" || suit == "&diamondsuit;") {
        color = "red";
      }
      cards.push({ value, suit, color });
    }
  }
  let index = Math.floor(Math.random() * cards.length);
  console.log(index);
  const randomCardFromList = cards[index];
  return randomCardFromList;
}

let points = document.querySelector("#points");
let guessesEl = document.querySelector("#guesses");
let card = document.querySelector(".card");
let span = document.querySelectorAll("span");
let b = document.querySelectorAll("b");
let cardCounter = document.querySelector("#card-counter");
let guessing= document.getElementById('guessing')


let pointHolder = 0; // if rätt gissat ++
let guesses = 3; // if felsvar --
let cardsLeft = 52; // efter en loop--
let randomCard = randomCardFromCardDeck();
let nextCard = randomCardFromCardDeck();
console.log(randomCard); // Programstart

const updateElements = () => {
  const valueMap = { 11: "Kn", 12: "Q", 13: "K", 14: "A" };
  points.innerHTML = "Poäng:" + pointHolder;
  guessesEl.innerHTML = "Gissningar kvar:" + guesses;
  cardCounter.innerHTML = cardsLeft + " kort kvar";
  card.style.color = randomCard.color;
  span.forEach((el) => (el.innerHTML = randomCard.suit));
  b.forEach(
    (el) => (el.innerHTML = valueMap[randomCard.value] ?? randomCard.value)
  );
};
updateElements();

const cardGuessing = (boolean) => {
  if (cardsLeft != 0 && guesses != 0) {
    console.log(nextCard);
    if (boolean) {
      pointHolder++;
      guessing.innerText='RÄTT GISSAT!'
    } else {
      guesses--;
      guessing.innerText='FEL GISSAT!'
    }
    randomCard = nextCard;
    nextCard = randomCardFromCardDeck();
    cardsLeft--;
    console.log(pointHolder, guesses, cardsLeft);
  }
  updateElements();
  if (guesses===0){
    guessing.innerText='SPELET SLUT! Du fick: '+ pointHolder + ' poäng';
  }
};

let guessingLower = document.querySelector("#lower");
guessingLower.addEventListener("click", () => {
  cardGuessing(randomCard.value > nextCard.value);
});
let guessingEqual = document.querySelector("#equal");
guessingEqual.addEventListener("click", () => {
  cardGuessing(randomCard.value === nextCard.value);
});
let guessingHigher = document.querySelector("#higher");
guessingHigher.addEventListener("click", () => {
  cardGuessing(randomCard.value < nextCard.value);
});
