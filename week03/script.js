const gridContainerNode = document.querySelector(".grid_container");

const gridElement = document.createElement("section");
gridElement.classList.add("grid_element");
gridElement.style.backgroundColor = "black";

function createGridElements() {
    for (i=0;i<16;i++) {
        gridContainerNode.appendChild(gridElement.cloneNode(true))
    }
}

createGridElements();