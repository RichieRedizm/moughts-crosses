import React from 'react';

import './Square.css';

export const Square = ({ id, icon, handleSquareClick }) => {
  return (
    <div
      className='square'
      onClick={() => handleSquareClick(id)}
      title={`square position ${id}`}>
      <span>{icon}</span>
    </div>
  );
};
