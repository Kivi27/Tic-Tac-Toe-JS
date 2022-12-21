const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const buttons = Array.from(document.querySelectorAll(".tic-tac-toe__button"));
const resetButton = document.querySelector(".tic-tac-toe-HUD__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe__player-name");

const gameManager = new GameManager(buttons, labelPlayerName,[player1, player2]);

for (let button of buttons) {
    button.addEventListener("click", (e) => gameManager.gameStep(e));
}

resetButton.addEventListener("click", () => gameManager.clearField());