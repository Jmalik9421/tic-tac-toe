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

    const checkWinner = (board, symbol) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
                return true
            };
        };
        return false;
    };

    return {
        initaliseBoard,
        updateBoard,
        checkWinner
    }
}

const gameBoard = GameBoard();
gameBoard.initaliseBoard();