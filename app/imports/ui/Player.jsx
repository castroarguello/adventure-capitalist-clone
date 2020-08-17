import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { TypesCollection } from '/imports/api/types';
import { Business } from './Business';

export const Player = ({ player }) => {
  let name;

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const { types, cash } = useTracker(() => ({
    cash: numberWithCommas(Session.get('game').cash || 0),
    types: TypesCollection.find().fetch(),
  }));

  return (
    <div className="player">

      <div className="business__container row">
        {types.map(
          type => <Business playerId={player._id} type={type} key={type.id} />
        )}
      </div>
    </div>
  );
};
