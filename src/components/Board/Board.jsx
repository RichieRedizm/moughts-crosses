import { usePlayGame } from './hooks';
import { Message } from '../Message';
import { Square } from '../Square';

import './Board.css';

export const Board = () => {
  const { winner, alert, squares, handleSquareClick } = usePlayGame();

  return (
    <div className='board'>
      {winner && (
        <Message type='win' msgText={`${winner} has won the game!`}></Message>
      )}
      {alert && <Message type='warn' msgText={alert}></Message>}
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
