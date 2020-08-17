import React, { useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayersCollection } from '../api/players';
import { TypesCollection } from '../api/types';
import { Player } from './Player';
import { Manager } from './Manager';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';
import { Tracker } from 'meteor/tracker';

// Create playerId if it is not stored on persistent session.
if (!Session.get('playerId')) {
  Session.setPersistent('playerId', Random.id());
}

Meteor.call('players.loadPlayer', Session.get('playerId'));

const RenderPlayer = ({ player }) => {
  if (player) {
    return (
      <div>
        <Player player={player} />
        <Manager player={player} />
      </div>
    );
  }
  return '';
};

export const Game = () => {

  const { player } = useTracker(() => ({
    player: PlayersCollection.find({ _id: Session.get('playerId') }).fetch()[0],
  }));

  return (
    <div>
      <RenderPlayer player={player} />
    </div>
  );
};
