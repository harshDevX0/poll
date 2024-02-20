import React, { useState } from 'react';
import './App.css';
const XOXBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = index => {
    const currentWinner = calculateWinner(board);
    if (currentWinner || board[index]) return;

    const squares = [...board];
    squares[index] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(squares);
    if (newWinner) {
      setWinner(newWinner);
      alert(`${newWinner} wins!`);
    } else if (!squares.includes(null)) {
      alert('It\'s a draw!');
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="board">
      <div className="grid">
        {[0, 1, 2].map(row =>
          <div key={row} className="row">
            {[0, 1, 2].map(col =>
              <div key={col} className="square" onClick={() => handleClick(row * 3 + col)}>
                {board[row * 3 + col]}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="info">{winner ? `${winner} wins!` : `Next player: ${xIsNext ? 'X' : 'O'}`}</div>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <XOXBoard />
    </div>
  );
}

export default App;
