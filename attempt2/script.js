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
    btns.pop(); // get rid of last button, which is the start button, in the array
    const winningCombinations = [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    const playersInstance = Player();
    const players = playersInstance.returnPlayers();
    let playerOne = players.playerOne;
    let playerTwo = players.playerTwo;

    let currentPlayer = playerOne;
    let board = gameBoard.returnBoard();
    let cells = gameBoard.returnCells();

    const checkWinner = (board, symbol) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return true;
            };
        };
        return false;
    };

    const checkDraw = (board) => {
        if (!board.includes('')) {
            return true;
        }
        return false;
    };

    const startGame = () => {
        gameBoard.initaliseBoard();
        countdown();
        playGame();
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const displayTurn = (state) => {
        if (state === 'turn') {
            turn.innerHTML = `${currentPlayer.name}'s turn`;
        } else if (state === 'win') {
            turn.innerHTML = `${currentPlayer.name} wins!`;
        } else if (state === 'draw') {
            turn.innerHTML = `It's a draw!`;
        };
    };

    const move = (index) => {
        gameBoard.updateBoard(board, index, currentPlayer.symbol);
        gameBoard.updateCells(cells, index, currentPlayer.symbol);

        if (checkWinner(board, currentPlayer.symbol)) {
            displayTurn('win');
            btns.forEach(btn => {
                btn.disabled = true;
                btn.removeEventListener('click', move);
            });
        } else if (checkDraw(board)) {
            displayTurn('draw');
            btns.forEach(btn => {
                btn.disabled = true;
                btn.removeEventListener('click', move);
            });
        } else {
            switchPlayer();
            displayTurn('turn')
        };
    };

    const countdown = () => {
        let time = 3;
        turn.innerHTML = `${time}`;
        const startCountdown = setInterval(() => {
            time--;
            if (time >= 0) {
                turn.innerHTML = `${time}`;
            } else {
                clearInterval(startCountdown);
                displayTurn('turn');
            }
        }, 1000);
    }

    const playGame = () => {
        btns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                move(index);
            });
        });
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
