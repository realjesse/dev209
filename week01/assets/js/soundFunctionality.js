const firstButtonNode = document.querySelector(".button.big.wide.smooth-scroll-middle");
const soundEffect = new Audio('../../sounds/mouse-click-290204.mp3');

firstButtonNode.addEventListener('click', () => {
    soundEffect.play();
})