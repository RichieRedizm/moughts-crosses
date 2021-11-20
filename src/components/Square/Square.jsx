import React from 'react';

import './Square.css';

export const Square = ({ id, icon, handleSquareClick }) => {
  return (
    <div
      className={`square position-${id}`}
      onClick={() => handleSquareClick(id)}>
      <span className={icon}>{icon}</span>
    </div>
  );
};
