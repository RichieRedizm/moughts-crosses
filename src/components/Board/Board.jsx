import { usePlayGame } from './hooks';
import { Square } from '../Square';

import './Board.css';

export const Board = () => {
  const { squares, handleSquareClick } = usePlayGame();

  return (
    <div className='board'>
      {squares.map((square) => (
        <Square
          key={`square-${square.id}`}
          id={square.id}
          icon={square.icon}
          handleSquareClick={handleSquareClick}
        />
      ))}
    </div>
  );
};
