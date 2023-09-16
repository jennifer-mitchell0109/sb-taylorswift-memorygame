const gameContainer = document.getElementById("game");

const ALBUMS = [
  "red",
  "midnights",
  "folklore",
  "lover",
  "ts1989",
  "red",
  "midnights",
  "folklore",
  "lover",
  "ts1989"
];

// define shuffle(array) function
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
  
  let shuffledAlbums = shuffle(ALBUMS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForAlbums(albumArray) {
    for (let album of albumArray) {
      // create a new div
      const newDiv = document.createElement("div");
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(album);
      newDiv.setAttribute('data-album', album);
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
  
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // define initial game status variables
  let activeCard = null;
  let awaitingEndOfTurn = false;
  let revealedCount = 0;

  // define function on handle card clicks
function handleCardClick(event) {
  // disallow card flips while turn is in progress
  if (awaitingEndOfTurn) {
    return;
  }
  // show card
  event.target.classList.add('flipped');
  // set active card equal to first card clicked on a turn
  if (!activeCard) {
    activeCard = event.target;
    return;
   }
  // when second card is selected, set active card's data-album value as cardToMatch
  const cardToMatch = activeCard.getAttribute('data-album');
  // if cards match, reset activeCard, increase revealedCount, check for game completion
  if (cardToMatch === event.target.getAttribute('data-album')) {
    // awaitingEndOfTurn = false;
    activeCard = null;
    revealedCount += 2;
    if (revealedCount === cardCount) {
      setTimeout(function() {
        alert('You win!!! Refresh to play again!');
      }, 1000);
    }
    return;
  } 
  // prevent card flips while unmatched cards return to face-down position
  awaitingEndOfTurn = true;

  // flip unmatched cards back over and allow turns again after 1s
  setTimeout(function() {
    event.target.classList.remove('flipped');
    activeCard.classList.remove('flipped');
    awaitingEndOfTurn = false;
    activeCard = null;
  }, 1000);

}

// when the DOM loads
createDivsForAlbums(shuffledAlbums);
const cardCount = shuffledAlbums.length;