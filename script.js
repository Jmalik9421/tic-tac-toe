const Player = (name, symbol) => {
    return {
        name,
        symbol
    };
};

const GameBoard = () => {
    let board = [  
        '', '', '', 
        '', '', '', 
        '', '', '', 
    ]

    const btns = document.querySelectorAll('button');
    const turn = document.querySelector('#current-player-turn');

    const initaliseBoard = () => {
        // I AM HERE
        // I HAVE THE FOLLOWING PROBLEM
        // - game works ok but when the player chooses to playAgain the following happens
        //  - the last symbol persists in it's place
        //  - turn.textContent remains 'Invalid move'

        turn.textContent = `Let's play`;

        btns.forEach(btn => {
            btn.textContent = '';
        });

        board = [   // board reset to array of empty strings
            '', '', '', 
            '', '', '', 
            '', '', '', 
        ];
    };

    const updateBoard = (index, symbol) => {
        board[index] = symbol;
        return board;
    };

    const displayBoard = (index, symbol) => {
        btns[index].textContent = symbol;
        return board;
    }

    const returnBoard = () => {
        return board; // function defined as GameBoard.board will return reference to let board. this returns value of board as it is is updated
    }

    const winningCombinations = [
        // row
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

    const checkWinner = (symbol) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return true
            };
        };
        return false;
    };

    const checkDraw = () => {
        if (!board.includes('')) {
            return true;
        };
        return false;
    }

    return {
        board,
        btns,
        initaliseBoard,
        updateBoard,
        displayBoard,
        returnBoard,
        checkWinner,
        checkDraw
    }
}

const Game = () => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    const gameBoard = GameBoard();
    const turn = document.querySelector('#current-player-turn');

    let currentPlayer = player1;

    const switchPlayer = () => {
        return currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playAgain = () => {
        const playAgain = prompt('Do you want to play again?');
        return playAgain;
    }

    const endGame = () => {
        gameBoard.btns.forEach(btn => {
            btn.disabled = true;
            btn.removeEventListener('click', handleClick);
        });
    }

    const handleClick = (e) => {
        const board = gameBoard.returnBoard();
        const clickedBtn = document.getElementById(`${e.target.id}`);
        const index = parseInt(clickedBtn.id);

        turn.textContent = `${currentPlayer.name}'s turn`;

        if (board[index] === '') {
            gameBoard.updateBoard(index, currentPlayer.symbol)
            gameBoard.displayBoard(index, currentPlayer.symbol);

            if (gameBoard.checkWinner(currentPlayer.symbol)) {
                turn.textContent = `${currentPlayer.name} wins!`;
                if (playAgain() === 'yes') {
                    startGame()
                } else {
                    endGame();
                }
            } else if (gameBoard.checkDraw()) {
                turn.textContent = `It's a draw!`;
                if (playAgain() === 'yes') {
                    startGame()
                } else {
                    endGame();
                }
            }
            
            switchPlayer();
        } else {
            turn.textContent = `Invalid move`;
        };
    }

    const playGame = () => {
        gameBoard.btns.forEach(btn => {
            btn.addEventListener('click', handleClick)
        })
    }

    const startGame = () => {
        gameBoard.initaliseBoard();
        playGame();
    };

    return {
        turn,
        startGame
    }
};

const newGame = Game();
newGame.startGame();


