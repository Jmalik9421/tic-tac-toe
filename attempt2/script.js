// how is this game going to work
// the track of the game will be kept on a board object. the changes of this board object will be mapped onto the html btn elements to display the update
// 
// 
// 1. the game needs to be started
//   - players need to be created
//   - 
// 
// 
// 
// 
// 

const Player = (name, symbol) => {
    return {
        name,
        symbol
    }
}

const Game = () => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let cells = [...document.querySelectorAll('button p')];
    const turn = document.querySelector('#turn');

    const startGame = () => {
        initaliseBoard()
        playGame()
    }

    const initaliseBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];

        cells.forEach(cell => {
            cell.textContent = '';
        });

        let player1 = Player('Player 1', 'X');
        let player2 = Player('Player 2', 'O');

        const playerOneName = document.querySelector('#player_one_name').value;
        const playerTwoName = document.querySelector('#player_two_name').value;

        player1.name = playerOneName !== '' ? playerOneName : 'Player 1';
        player2.name = playerTwoName !== '' ? playerTwoName : 'Player 2';

        turn.innerHTML = `Player 1: ${player1.name}, ${player1.symbol}
                      <br>Player 2: ${player2.name}, ${player2.symbol}`;

    }

    const playGame = () => {
        console.log(`game has started`);
    };

    return {
        startGame
    }
}

document.querySelector('#start_game').addEventListener('click', (e) => {
    e.preventDefault();

    const newGame = Game();
    newGame.startGame();
})


















