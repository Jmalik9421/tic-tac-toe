const Player = (name, symbol) => {
    const returnPlayers = () => {
        let playerOne = {name: 'Player 1', symbol:'X'};
        let playerTwo = {name: 'Player 2', symbol: 'O'};
        const playerOneName = document.querySelector('#player_one_name').value;
        const playerTwoName = document.querySelector('#player_two_name').value;
        playerOne.name = playerOneName !== '' ? playerOneName : 'Player 1';
        playerTwo.name = playerTwoName !== '' ? playerTwoName : 'Player 2';
        turn.innerHTML = `Player 1: ${playerOne.name}, ${playerOne.symbol}
                      <br>Player 2: ${playerTwo.name}, ${playerTwo.symbol}`;

        return {
            playerOne,
            playerTwo
        }
    }

    return {
        returnPlayers,
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

        const playersInstance = Player();
        const players = playersInstance.returnPlayers();
        let playerOne = players.playerOne;
        let playerTwo = players.playerTwo;
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

    const playersInstance = Player();
    const players = playersInstance.returnPlayers();
    let playerOne = players.playerOne;
    let playerTwo = players.playerTwo;

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


















