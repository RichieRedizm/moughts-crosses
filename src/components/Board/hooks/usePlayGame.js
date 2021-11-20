import { useState, useEffect, useCallback } from 'react';

import { Icons } from '../constants';
import { initializeSquares } from '../helpers';

export const usePlayGame = () => {
  const [squares, setSquares] = useState(() => initializeSquares());
  const [iconType, SetIconType] = useState(Icons.CROSS);
  console.log('squares: ', squares);

  useEffect(() => {
    const newIcon = iconType === Icons.CROSS ? Icons.NOUGHT : Icons.CROSS;
    if (checkResult(squares, newIcon)) console.log(`${iconType} has won`);
  }, [squares, iconType]);

  const handleSquareClick = useCallback(
    (id) => {
      console.log(id);
      let updSquares = [...squares];

      if (updSquares[id].icon !== undefined) {
        // TODO set alert this square has already been played
        return;
      }

      updSquares[id] = { id, icon: iconType };
      setSquares(updSquares);
      SetIconType((prevIcon) =>
        prevIcon === Icons.CROSS ? Icons.NOUGHT : Icons.CROSS,
      );
    },
    [iconType, squares],
  );

  const checkResult = (squares, iconType) => {
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
    console.log(iconType);

    // const noughts = possibleWins.some((wins) =>
    //   wins.every((win) => squares[win].icon === Icons.NOUGHT),
    // );
    // const crosses = possibleWins.some((wins) =>
    //   wins.every((win) => squares[win].icon === Icons.CROSS),
    // );
    // console.log('noughts', noughts);
    // console.log('crosses', crosses);
    return possibleWins.some((wins) =>
      wins.every((win) => squares[win].icon === iconType),
    );
  };

  return {
    squares,
    handleSquareClick,
  };
};
