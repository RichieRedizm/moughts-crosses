import React from 'react';

import './Square.css';

export const Square = ({ id, icon, handleSquareClick }) => {
  return (
    <div className='square' onClick={() => handleSquareClick(id)}>
      <span>{icon}</span>
    </div>
  );
};
