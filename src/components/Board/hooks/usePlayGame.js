import { useState, useEffect, useCallback } from 'react';

import { Icons } from '../constants';
import { initializeSquares } from '../helpers';

export const usePlayGame = () => {
  const [squares, setSquares] = useState(() => initializeSquares());
  const [iconType, setIconType] = useState(Icons.CROSS);
  const [message, SetMessage] = useState(null);

  const checkResult = useCallback((squares) => {
    const possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const noughtsWin = possibleWins.some((wins) =>
      wins.every((win) => squares[win].icon === Icons.NOUGHT),
    );

    const crossesWin = possibleWins.some((wins) =>
      wins.every((win) => squares[win].icon === Icons.CROSS),
    );

    const gameOver = squares.every((square) => square.icon !== undefined);

    if (noughtsWin) {
      SetMessage({
        type: 'win',
        msgText: 'Congratulations Noughts - you have won the game!',
      });
      return;
    }
    if (crossesWin) {
      SetMessage({
        type: 'win',
        msgText: 'Congratulations Crosses - you have won the game!',
      });
      return;
    }
    if (gameOver) {
      SetMessage({
        type: 'warn',
        msgText: 'Nobody won that game!',
      });
    }
  }, []);

  useEffect(() => {
    checkResult(squares);
  }, [checkResult, squares]);

  const handleSquareClick = useCallback(
    (id) => {
      if (message?.type === 'win') return;
      let updSquares = [...squares];

      if (updSquares[id].icon !== undefined) {
        SetMessage({ type: 'warn', msgText: 'This position is not available' });
        return;
      }
      SetMessage(null);

      updSquares[id] = { id, icon: iconType };
      setSquares(updSquares);
      setIconType((prevIcon) =>
        prevIcon === Icons.CROSS ? Icons.NOUGHT : Icons.CROSS,
      );
    },
    [iconType, squares, message],
  );

  const handleReset = () => {
    setSquares(initializeSquares());
    setIconType(Icons.CROSS);
    SetMessage(null);
  };

  return {
    message,
    squares,
    handleSquareClick,
    handleReset,
  };
};
