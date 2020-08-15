import React, { useState } from 'react';
import { PlayerForm } from './PlayerForm';

export const Player = ({ player }) => {
  let name;

  return (
    <div className="player">
      <p>Player name: {player.name}.</p>
      <p>My current cash is: $ {player.cash}.</p>
      <PlayerForm player={player} />
    </div>
  );
};
