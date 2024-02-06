// current problems:
// 1. board not being checked to see if and index is already occupied with a symbol. this allows it to be overwritten


const Player = (name, symbol) => {
    return {
        name,
        symbol
    };
};

const GameBoard = () => {
    let board = [   // let used as board will need to be updated
        '', '', '', // board will be an array of empty strings
        '', '', '', // empty strings will be updated to be a string of a symbol
        '', '', '', // 'X' for player1, 'O' for player2
    ]

    const initaliseBoard = () => {
        board = [   // board reset to array of empty strings
            '', '', '', 
            '', '', '', 
            '', '', '', 
        ];
    };

    const updateBoard = (index, symbol) => {
        board[index] = symbol;
    };

    const displayBoard = () => {
        console.log(board.slice(0, 3))
        console.log(board.slice(3, 6))
        console.log(board.slice(6))
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

    const drawingCombinations = [
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

    const checkDraw = (symbol) => {
        if (!board.includes('')) {
            return true;
        };
        return false;
    }

    return {
        board,
        initaliseBoard,
        updateBoard,
        displayBoard,
        checkWinner,
        checkDraw
    }
}

const Game = () => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    const gameBoard = GameBoard();
    const validMoves = [
        'top left', 'top middle', 'top right',
        'middle left', 'middle middle', 'middle right',
        'bottom left', 'bottom middle', 'bottom right',
    ]

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    
    const playGame = () => {
        while (true) {
            const move = prompt('What is your move?');
            if (validMoves.includes(move)) {
                console.log(`${currentPlayer.name}'s move`)
                const index = validMoves.indexOf(move);
                gameBoard.updateBoard(index, currentPlayer.symbol)
                gameBoard.displayBoard();

                if (gameBoard.checkWinner(currentPlayer.symbol)) {
                    console.log(`${currentPlayer.name} wins!`);
                    break;
                } else if (gameBoard.checkDraw(currentPlayer.symbol)) {
                    console.log(`Its a draw!`);
                    break;
                }

                switchPlayer();
            } else {
                console.log('Invalid move');
            };

        };
    };
    
    const startGame = () => {
        gameBoard.initaliseBoard();
        playGame();
    };

    return {
        startGame
    }
};

const newGame = Game();
const start = prompt('Do you want to start the game?');
if (start === 'yes') {
    newGame.startGame();
}
