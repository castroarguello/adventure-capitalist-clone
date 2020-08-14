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
      {types.map(
        type => <div className="card" key={type.id}>

          <Business player={player} type={type} />

        </div>
      )}
 
    </form>
  );
};
