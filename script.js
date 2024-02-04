// high level objectives of the project:
// - create object for players
// - create object for gameboard
// - create object for moves 

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

    const checkWinner = (board, symbol) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return true
            };
        };
        return false;
    };

    const checkDraw = (board, symbol) => {
        if (!checkWinner(board, symbol)) {
            return true
        }
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


    const startGame = () => {gameBoard.initaliseBoard()};

    while (!gameBoard.checkWinner(gameBoard.board, currentPlayer.symbol)) {
        const move = prompt('What is your move?');
        if (validMoves.includes(move)) {
            const index = validMoves.indexOf(move);
            gameBoard.updateBoard(index, currentPlayer.symbol)
            gameBoard.displayBoard();
        };
        break;
    };
};

Game();
