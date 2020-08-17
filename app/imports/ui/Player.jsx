import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { TypesCollection } from '/imports/api/types';
import { Business } from './Business';

export const Player = ({ player }) => {
  let name;

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const { types, batch, cash } = useTracker(() => ({
    cash: numberWithCommas(player.cash),
    types: TypesCollection.find().fetch(),
    batch: isNaN(player.upgradeBatch) ? player.upgradeBatch : ' x ' + player.upgradeBatch,
  }));

  // Upgrade batch functionality.
  const changeBatch = () => {
    Meteor.call('players.switchBatch', player._id);
  };

  return (
    <div className="player">
      <div className="float-right"><button type="button" className="btn btn-warning" onClick={changeBatch}>Buy {batch} </button></div>
      <h3>$ {player._id ? cash : ''}</h3>

      <div className="business__container row">
        {types.map(
          type => <Business player={player} type={type} key={type.id} />
        )}
      </div>
    </div>
  );
};
