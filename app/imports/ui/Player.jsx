import React, { useState } from 'react';
import { PlayerForm } from './PlayerForm';

export const Player = ({ player }) => {
  let name;
  const [cash, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="player">
      <p>Player name: {player.name}.</p>
      <p>My current cash is: $ {player.cash}.</p>
      <PlayerForm player={player} />
    </div>
  );
};
