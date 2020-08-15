import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '/imports/api/types';
import { Business } from './Business';

export const Player = ({ player }) => {
  let name;

  const types = useTracker(() => {
    return TypesCollection.find().fetch();
  });

  return (
    <div className="player">
      <h2>Player: {player.name}</h2>
      <p>Cash is: $ {player.cash}</p>

      <div className="business__container row">
        {types.map(
          type => <Business player={player} type={type} key={type.id} />
        )}
      </div>
    </div>
  );
};
