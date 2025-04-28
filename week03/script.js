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
    cardList.push({value: letter});
    cardList.push({value: letter});
})

function createGridElements() {
    for (i=0;i<16;i++) {
        const gridElementClone = gridElement.cloneNode(true);
        gridContainerNode.appendChild(gridElement.cloneNode(true))
    }
}

createGridElements();