import React, { useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayersCollection } from '../api/players';
import { Player } from './Player';
import { Manager } from './Manager';

export const Game = () => {

  const { players } = useTracker(() => ({
      players: PlayersCollection.find().fetch(),
    }));

  return (
    <div>
      {players.map(
        player => <div key={player._id}>
          <Player player={player} />
          <Manager player={player} />
        </div>
      )}
    </div>
  );
};
