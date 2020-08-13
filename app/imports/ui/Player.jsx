import React, { useState } from 'react';

export const Player = ({ player }) => {
  let name;
  const [cash, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <p>Hello, my name is {player.name}.</p>
      <p>My current cash is: $ {player.cash}.</p>
    </div>
  );
};
