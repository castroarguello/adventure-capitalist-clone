import React, { useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';
import { Tracker } from 'meteor/tracker';

import { PlayersCollection } from '../api/players';
import { ManagerCollection } from '../api/manager';
import { BusinessCollection } from '../api/business';
import { TypesCollection } from '../api/types';
import { Business } from './Business';
import { Manager } from './Manager';

// Update session game object.
const updateGame = (game) => {
  game.timestamp = new Date().getTime();
  if (!game.business) {
    game.business = [];
  }
  Session.setPersistent('game', game);
};

// Access or create session game object.
const getGame = () => {
  if (!Session.get('game')) {
    updateGame({
      business: [],
      playerId: Random.id(),
    });
  }
  return Session.get('game');
};

// Load player.
const game = getGame();
Meteor.call('players.loadPlayer', game.playerId);

// Update profits on managed business.
const updateSessionProfits = () => {
  const game = updateFromServer();
  if (!game.business || !game.business.length) {
    return;
  }
  const timestamp = new Date().getTime();

  // Calculate offline profits.
  if (game.timestamp < timestamp) {
    const lapse = Math.floor((timestamp - game.timestamp) / 1000);
    if (lapse >= 10) {
      const profit = lapse * game.profitPerSecond;
      updateServerProfits(game.playerId, profit);
    }
  }

  // Update player cash with session profits.
  updateServerProfits(game.playerId, game.profitPerSecond);

  updateGame(game);
};

// Update game object with data from server.
const updateFromServer = () => {
  const game = getGame();
  const player = PlayersCollection.find({ _id: game.playerId }).fetch()[0];

  if (player) {
    let profitPerSecond = 0;
    game.business = [];
    player.managers.forEach((typeId) => {
      const manager = ManagerCollection.find({ type: typeId }).fetch()[0];
      const type = TypesCollection.find({ id: manager.type }).fetch()[0];
      const business = BusinessCollection.find({ type: manager.type, player: player._id}).fetch()[0];
      profitPerSecond += business.profit / type.duration;
      game.business.push({
        type: typeId,
        profit: business.profit,
        duration: type.duration,
        lastExecution: new Date().getTime(),
      });
    });
    game.profitPerSecond = profitPerSecond;
    return game;
  }
};

// The automatic game manager update interval.
const updateServerProfits = (playerId, profit) => {
  Meteor.call('players.increaseProfit', playerId, profit);
};

// The automatic game manager update interval.
const interval = Meteor.setInterval(() => {
  updateSessionProfits();
}, 1000);

export const Game = () => {
  const { types, player } = useTracker(() => ({
    types: TypesCollection.find().fetch(),
    player: PlayersCollection.find({ _id: Session.get('game').playerId }).fetch()[0],
  }));

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const { cash } = useTracker(() => ({
    cash: player ? numberWithCommas(+player.cash.toFixed(2)) : 0,
  }));

  const playerId = player ? player._id : 0;

  return (
    <div>
      <h3>$ {cash}</h3>
      <div className="business__container row">
        {types.map(
          type => <Business playerId={playerId} type={type} key={type.id} />
        )}
      </div>
      <Manager player={player} />
    </div>
  );
};
