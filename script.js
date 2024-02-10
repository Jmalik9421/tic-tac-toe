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

    const initaliseBoard = () => {
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

    let currentPlayer = player1;

    const switchPlayer = () => {
        return currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playGame = () => {
        const btns = gameBoard.btns;
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const board = gameBoard.returnBoard();
                const clickedBtn = document.getElementById(`${e.target.id}`);
                const index = parseInt(clickedBtn.id);
                const turn = document.querySelector('#current-player-turn');
                turn.textContent = `${currentPlayer.name}'s turn`;

                if (board[index] === '') {
                    gameBoard.updateBoard(index, currentPlayer.symbol)
                    gameBoard.displayBoard(index, currentPlayer.symbol);
    
                    if (gameBoard.checkWinner(currentPlayer.symbol)) {
                        turn.textContent = `${currentPlayer.name} wins!`;
                    } else if (gameBoard.checkDraw()) {
                        turn.textContent = `It's a draw!`;
                    }
    
                    switchPlayer();
                } else {
                    turn.textContent = `Invalid move`;
                };
            })
        })
    }

    const startGame = () => {
        gameBoard.initaliseBoard();
        playGame();
    };

    return {
        startGame
    }
};

const newGame = Game();
newGame.startGame();
