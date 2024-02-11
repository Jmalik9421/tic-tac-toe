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

const GameBoard = () => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let cells = [...document.querySelectorAll('p')];
    const btns = [...document.querySelectorAll('button')];
    const turn = document.querySelector('#turn');

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

    const updateBoard = (board, index, symbol) => {
        board[index] = symbol;
    }

    const updateCells = (cells, index, symbol) => {
        cells[index].textContent = symbol;
    }

    const returnBtns = () => {
        return btns
    }

    const returnTurn = () => {
        return turn
    };

    const returnCells = () => {
        return cells
    };

    const returnBoard = () => {
        return board
    };
    
    return {
        initaliseBoard,
        updateBoard,
        updateCells,
        returnBtns,
        returnTurn,
        returnCells,
        returnBoard,
    }
}

const Game = () => {
    const gameBoard = GameBoard();
    const turn = gameBoard.returnTurn();
    const btns = gameBoard.returnBtns();

    const playerOneName = document.querySelector('#player_one_name');
    const playerOne = Player(playerOneName, 'X');
    const playerTwoName = document.querySelector('#player_two_name');
    const playerTwo = Player(playerTwoName, 'O');

    let currentPlayer = playerOne;
    let board = gameBoard.returnBoard();
    let cells = gameBoard.returnCells();

    const startGame = () => {
        gameBoard.initaliseBoard();
        countdown();
        playGame();
    }

    const move = () => {
        console.log(`move is running`)
        turn.innerHTML = `${currentPlayer.name}'s turn`;
    }

    const countdown = () => {
        setTimeout(() => {}, 2000);

        let time = 3;
        const startCountdown = setInterval( () => {
            turn.innerHTML = `${time}`;
            time--;
            time < 0 ? clearInterval(startCountdown) : null;
        }, 1000 );

        setInterval(() => {
            turn.innerHTML = `${currentPlayer.name}'s turn`;
        }, 5000);
    }

    const playGame = () => {
        btns.forEach((btn) => {btn.addEventListener('click', move)});
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


















