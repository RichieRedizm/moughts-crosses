import { usePlayGame } from './hooks';
import { Message } from '../Message';
import { Square } from '../Square';

import './Board.css';

export const Board = () => {
  const { message, squares, handleSquareClick, handleReset } = usePlayGame();

  return (
    <div className='board' title='Game Board'>
      {message && <Message {...message} />}
      <button className='board__reset' onClick={handleReset}>
        Restart Game
      </button>
      <div className='board__container'>
        {squares.map((square) => (
          <Square
            key={`square-${square.id}`}
            {...square}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  );
};
