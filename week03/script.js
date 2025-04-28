// Get and create elements
const gridContainerNode = document.querySelector(".grid_container");
const gridElement = document.createElement("section");
gridElement.classList.add("grid_element");

// Potential letters for cards
const letterList = ["A", "B", "C", "D", "E", "F", "G", "H"];
// List that will contain card information
const cardList = [];
let currentCardIndex = 0;
// List containing flipped cards
const flippedCardList = []

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
}

createGridElements();