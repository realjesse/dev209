// Add event listener to button for if user wants a new game.
const buttonElement = document.querySelector(".new_game_button");
buttonElement.addEventListener('click', () => {resetGame()});

// Add event listener for rules overlay button to close it
const rulesOverlayButton = document.querySelector(".close_overlay");
rulesOverlayButton.addEventListener('click', () => {
    const overlayElement = document.querySelector(".rules");
    overlayElement.classList.add("hidden");
})

// Add event listener for "Play again?" button after you win
const playAgainButton = document.querySelector(".play_again_button");
playAgainButton.addEventListener('click', () => {
    const winningOverlay = document.querySelector(".winning");
    winningOverlay.classList.add("hidden");
    resetGame();
})

// Event listener for anytime that total move local storage is changed
window.addEventListener('storage', (event) => {
    if (event.key === 'totalMoves') {
        document.querySelector('.total_move_counter').textContent = 
        `Total Moves: ${Number(localStorage.getItem('totalMoves'))}`;
    }
});

// Potential letters for cards
const letterList = ["A", "B", "C", "D", "E", "F", "G", "H"];
// List that will contain card information
let cardList = [];
// List containing flipped cards
let flippedCardList = [];
// Tracks movements
let move = 0;
// Tracks whether or not paused (i.e. the user cannot interact with cards)
let paused = false;

// For each letter in letterList, push two elements onto cardList which contain
// that letter
let currentCardIndex = 0;
letterList.forEach(letter => {
    cardList.push({id: currentCardIndex, value: letter, flipped: false, matched: false});
    currentCardIndex++;
    cardList.push({id: currentCardIndex, value: letter, flipped: false, matched: false});
    currentCardIndex++;
})

// Placing elements (based on cardList) onto grid
function createGridElements() {
    const gridContainerNode = document.querySelector(".grid_container");
    gridContainerNode.innerHTML = '';
    cardList.forEach(card => {
        const cardElement = document.createElement('section');
        cardElement.classList.add('grid_element');
        cardElement.setAttribute('element_id', card.id);
        cardElement.addEventListener('click', () => {
            flipCard(cardElement);
        });
        gridContainerNode.appendChild(cardElement);
    });
}

// Flip card function
function flipCard(cardElement) {
    // Get card item from cardList
    const cardId = cardElement.getAttribute('element_id');
    const card = cardList.find(c => c.id == cardId);

    // Only do actions if user clicks on an unflipped card and the game is not
    // paused
    if (!card.flipped && !paused) {
        card.flipped = true;
        updateCardStyling(card);
        flippedCardList.push(card);

        // If two cards are flipped, check for a match
        if (flippedCardList.length === 2) {
            checkForMatch();
        }

        saveGameState();
    }
}

// Checks for a match
function checkForMatch() {
    const [card1, card2] = flippedCardList;
    updateMove();

    // If they are equal, change card state of matched to true, then reset
    // flippedCardList.  Also check for win.
    if (card1.value === card2.value) {
        card1.matched = true;
        card2.matched = true;
        flippedCardList = [];
        checkForWin();
        saveGameState();
    }
    // If not equal, then after a short delay reflip cards
    else {
        paused = true;
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            updateCardStyling(card1);
            updateCardStyling(card2);
            flippedCardList = [];
            paused = false;
            saveGameState();
        }, 1000)
    }
}

// Updates the class for cards depending on if they are flipped
function updateCardStyling(card) {
    cardElement = getCardElement(card);
    if (card.flipped === true) {
        cardElement.classList.add('flipped');
        cardElement.textContent = `${card.value}`;
    }
    else {
        cardElement.classList.remove('flipped');
        cardElement.textContent = "";
    }
}

function getCardElement(card) {
    return document.querySelector(`[element_id="${card.id}"]`);
}

// Increments move and updates DOM
function updateMove() {
    move++;
    document.querySelector('.move_counter').textContent = `Moves: ${move}`;
    saveGameState();

    // Update total moves
    updateTotalMoves();
}

// Check for a win, if even one is not matched then it will return false,
// but if all of them are matched will return true
function checkForWin() {
    for (const card of cardList) {
        if (!card.matched) {
            return false;
        }
    }
    
    // Unhide the HTML elements that contain message
    const winningOverlayElement = document.querySelector(".winning");
    winningOverlayElement.classList.remove("hidden");

    // Edit paragraph to show number of moves
    const winningParagraph = document.querySelector(".winning p");
    winningParagraph.textContent = `You took ${move} moves.`;
}

// Uses Fisher-Yates sorting to produce uniform randomness
function shuffleCards() {
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
}

// Resets properties such as flipped and match so list is refreshed
function resetCardProperties() {
    cardList.forEach(card => {
        card.flipped = false;
        card.matched = false;
    })
}

// Reshuffles cards, creates new grid elements, updates DOM, resets cardList
// properties
function resetGame() {
    shuffleCards();
    createGridElements();

    // Update move variable and DOM
    move = 0;
    document.querySelector('.move_counter').textContent = `Moves: 0`;

    resetCardProperties();

    // Remove local stored saved state
    sessionStorage.removeItem('gameState');
}

// Saves game state to local storage
function saveGameState() {
    const gameState = {
        cardList: cardList,
        flippedCardList: flippedCardList,
        move: move
    };
    sessionStorage.setItem('gameState', JSON.stringify(gameState));
}

function updateTotalMoves() {
    let moves = Number(localStorage.getItem('totalMoves'));
    localStorage.setItem('totalMoves', moves + 1);
    document.querySelector('.total_move_counter').textContent = 
    `Total Moves: ${Number(localStorage.getItem('totalMoves'))}`;
}

// Loads game state from local storage
function loadGameState() {
    const savedState = sessionStorage.getItem('gameState');

    // Check if there is a local storage for total moves, if not then create
    if (!localStorage.getItem('totalMoves')) {
        localStorage.setItem('totalMoves', 0);
    } else {
        document.querySelector('.total_move_counter').textContent = 
        `Total Moves: ${Number(localStorage.getItem('totalMoves'))}`;
    }

    // Check if there is a saved state, if not then don't run
    if (savedState) {
        const gameState = JSON.parse(savedState);

        // Restore cardList
        cardList = gameState.cardList;

        // Restore flippedCardList
        flippedCardList = gameState.flippedCardList;

        // Restore move
        move = gameState.move;
        document.querySelector('.move_counter').textContent = `Moves: ${move}`;

        // Update grid for saved state
        createGridElements();

        // Update card styling for saved state
        cardList.forEach(card => updateCardStyling(card));
    } else {
        // If no saved state, create a new grid
        resetGame();
    }
}

// Start game
document.addEventListener('DOMContentLoaded', () => {
    loadGameState();
});