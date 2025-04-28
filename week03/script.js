const gridContainerNode = document.querySelector(".grid_container");

const gridElement = document.createElement("section");
gridElement.classList.add("grid_element");
gridElement.style.backgroundColor = "rgb(56, 180, 202)";
gridElement.style.width = "15px";
gridElement.style.height = "25px";

function createGridElements() {
    for (i=0;i<16;i++) {
        gridContainerNode.appendChild(gridElement.cloneNode(true))
    }
}

createGridElements();