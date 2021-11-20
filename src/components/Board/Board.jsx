import { usePlayGame } from './hooks';
import { Message } from '../Message';
import { Square } from '../Square';

import './Board.css';

export const Board = () => {
  const { message, squares, handleSquareClick } = usePlayGame();

  return (
    <>
      {message && <Message {...message} />}
      <button className='restart'>Restart Game</button>
      <div className='board'>
        {squares.map((square) => (
          <Square
            key={`square-${square.id}`}
            {...square}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </>
  );
};
