// Get and create elements
const gridContainerNode = document.querySelector(".grid_container");
const gridElement = document.createElement("section");
gridElement.classList.add("grid_element");

// Potential letters for cards
const letterList = ["A", "B", "C", "D", "E", "F", "G", "H"];
// List that will contain card information
let cardList = [];
let currentCardIndex = 0;
// List containing flipped cards
let flippedCardList = []

// For each letter in letterList, push two elements onto cardList which contain
// that letter 
letterList.forEach(letter => {
    cardList.push({id: currentCardIndex, value: letter, flipped: false, matched: false});
    currentCardIndex++;
    cardList.push({id: currentCardIndex, value: letter, flipped: false, matched: false});
    currentCardIndex++;
})

function createGridElements() {
    cardList.forEach(card => {
        const cardElement = document.createElement('section');
        cardElement.classList.add('grid_element');
        cardElement.setAttribute('element_id', card.id);
        cardElement.addEventListener('click', () => {
            flipCard(cardElement);
        })
        gridContainerNode.appendChild(cardElement);
    })
}

// Flip card function
function flipCard(cardElement) {
    // Get card item from cardList
    const cardId = cardElement.getAttribute('element_id');
    const card = cardList.find(c => c.id == cardId);

    // Change styling
    cardElement.classList.add('flipped');
    card.flipped = true;
    flippedCardList.push(card);

    if (flippedCardList.length === 2) {
        checkForMatch();
    }
    console.log(flippedCardList.length)
}

// Checks for a match
function checkForMatch() {
    const [card1, card2] = flippedCardList;

    // If they are equal, change card state of matched to true, then reset
    // flippedCardList
    if (card1.value === card2.value) {
        card1.matched = true;
        card2.matched = true;
        flippedCardList = [];
    }
    else {
        setTimeout(() => {
            document.querySelector(`[element_id="${card1.id}"]`).classList.remove('flipped');
            document.querySelector(`[element_id="${card2.id}"]`).classList.remove('flipped');
            card1.flipped = false;
            card2.flipped = false;
            flippedCardList = [];
        }, 1000)
    }
}

createGridElements();