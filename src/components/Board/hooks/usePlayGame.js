import { useState, useEffect, useCallback } from 'react';

import { Icons } from '../constants';
import { initializeSquares } from '../helpers';

export const usePlayGame = () => {
  const [squares, setSquares] = useState(() => initializeSquares());
  const [iconType, setIconType] = useState(Icons.CROSS);
  const [alert, setAlert] = useState(null);
  const [winner, SetWinner] = useState(null);

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

    if (noughtsWin) {
      SetWinner('Noughts');
      return;
    }
    if (crossesWin) SetWinner('Crosses');
  }, []);

  useEffect(() => {
    checkResult(squares);
  }, [checkResult, squares]);

  const handleSquareClick = useCallback(
    (id) => {
      if (winner) return;
      let updSquares = [...squares];

      if (updSquares[id].icon !== undefined) {
        setAlert('this square has already been played');
        return;
      }
      setAlert();

      updSquares[id] = { id, icon: iconType };
      setSquares(updSquares);
      setIconType((prevIcon) =>
        prevIcon === Icons.CROSS ? Icons.NOUGHT : Icons.CROSS,
      );
    },
    [iconType, squares, winner],
  );

  return {
    winner,
    alert,
    squares,
    handleSquareClick,
  };
};
