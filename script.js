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
        board[index] = symbol
    }
}