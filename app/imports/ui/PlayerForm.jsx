import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '/imports/api/types';
import { BusinessCollection } from '/imports/api/business';
import { Business } from './Business';
 
export const PlayerForm = ({ player }) => {

  const types = useTracker(() => {
    return TypesCollection.find().fetch();
  });

  return (
    <form className="player-form">
      <h2>My Game</h2>
      <p>My current cash is: $ {player.cash}.</p>
      <div className="business__container">
        {types.map(
          type => <Business player={player} type={type} key={type.id} />
        )}
      </div>
 
    </form>
  );
};
