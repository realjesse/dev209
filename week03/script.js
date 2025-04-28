// Get and create elements
const gridContainerNode = document.querySelector(".grid_container");
const gridElement = document.createElement("section");
gridElement.classList.add("grid_element");

// Potential letters for cards
const letterList = ["A", "B", "C", "D", "E", "F", "G", "H"];
// List that will contain card information
const cardList = [];
let currentCardIndex = 0;

// For each letter in letterList, push two elements onto cardList which contain
// that letter 
letterList.forEach(letter => {
    cardList.push({id: currentCardIndex, value: letter});
    currentCardIndex++;
    cardList.push({id: currentCardIndex, value: letter});
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
    cardElement.classList.add('flipped');
}

createGridElements();