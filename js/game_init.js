const saveKey = "game_manager";
const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const buttons = Array.from(document.querySelectorAll(".tic-tac-toe__button"));
const resetButton = document.querySelector(".tic-tac-toe-hud__reset-button");
const labelPlayerName = document.querySelector(".tic-tac-toe__player-name");

const gameManager = new Game_manager(buttons, labelPlayerName,[player1, player2]);

if (localStorage.getItem(saveKey)) {
    Game_saver.loadGame(saveKey, gameManager, () => {
        gameManager.updateLabelPlayerName(gameManager.getCurrentPlayer());
        gameManager.checkWin();
    });
    console.log("load manager from local storage.....");
}

for (let button of buttons) {
    button.addEventListener("click", (pressedButton) => {
        gameManager.gameStep(pressedButton);
        Game_saver.saveGame(saveKey, gameManager);
    });
}

resetButton.addEventListener("click", (e) => {
    gameManager.clearField()
    Game_saver.saveGame(saveKey, gameManager);
});