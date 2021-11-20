export const initializeSquares = () => {
  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push({
      id: i,
      icon: undefined,
    });
  }
  return squares;
};
