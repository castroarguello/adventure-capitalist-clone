import React, { useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';
import { Tracker } from 'meteor/tracker';
import { _ } from 'lodash';

import { PlayersCollection } from '../api/players';
import { ManagerCollection } from '../api/manager';
import { BusinessCollection } from '../api/business';
import { TypesCollection } from '../api/types';
import { Player } from './Player';
import { Manager } from './Manager';

Meteor.startup(() => {

  console.log('STARTUP', player);
  // Create playerId if it is not stored on persistent session.
  if (!Session.get('playerId')) {
    Session.setPersistent('playerId', Random.id());
  }
  Meteor.call('players.loadPlayer', Session.get('playerId'));
});

let player = PlayersCollection.find({ _id: Session.get('playerId') }).fetch()[0];

// Tracker.autorun(() => {
//   const playerId = Session.get('playerId');
//   const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

//   if (player) {
//     Session.set('playerId', player._id);
//   }
// });

const runManagers = () => {
  const playerId = Session.get('playerId');

  if (!player) {
    player = PlayersCollection.find({ _id: Session.get('playerId') }).fetch()[0];
  }
  if (player) {
    console.log(playerId, player.timestamp);
    let profitPerSecond = 0;
    player.managers.forEach((typeId) => {
      const manager = ManagerCollection.find({ type: typeId }).fetch()[0];
      const type = TypesCollection.find({ id: manager.type }).fetch()[0];
      const business = BusinessCollection.find({ type: manager.type, player: player._id}).fetch()[0];
      profitPerSecond += business.profit / type.duration;
    });
    // ManagerCollection.find({}, {sort: { hire: true }}).fetch()
    Session.setPersistent('profitPerSecond', profitPerSecond);
  }


  console.log('player', player);
  return;
};


  const interval = Meteor.setInterval(() => {
    const playerId = Session.get('playerId');
    const profitPerSecond = Session.get('profitPerSecond');
    if (!playerId || !profitPerSecond) {
      return;
    }
    Meteor.call('players.increaseProfit', playerId, profitPerSecond);
    console.log('players.increaseProfit', playerId, profitPerSecond);
    // runManagers();
  }, 1000);
  Session.setPersistent('manager', interval);

// const player = PlayersCollection.find({ _id: Session.get('playerId') }).fetch()[0];

export const Game = () => {

  const RunManagers = () => {

    return (<button className="btn btn-info" onClick={runManagers}>Run Managers</button>);
  };


  const RenderPlayer = ({ player }) => {
    if (player) {
      return (
        <div>
        <RunManagers />
          <Player player={player} />
          <Manager player={player} />
        </div>
      );
    }
    return '';
  };


  const { player } = useTracker(() => ({
    player: PlayersCollection.find({ _id: Session.get('playerId') }).fetch()[0],
  }));

  return (
    <div>
      <RenderPlayer player={player} />
    </div>
  );
};
