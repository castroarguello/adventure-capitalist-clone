import React, { useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '../api/types';
import { PlayersCollection } from '../api/players';
import { Player } from './Player';
import { Manager } from './Manager';

export const Info = () => {

  const [currentPlayer, setCurrentPlayer] = useState({name: "Select a user first"});

  const getCurrentPlayer = () => {
    console.log('getCurrentPlayer', currentPlayer)
    return currentPlayer;
  };

  const { players, count, types } = useTracker(() => ({
      count: PlayersCollection.find().count(),
      players: PlayersCollection.find().fetch(),
      types: TypesCollection.find().fetch(),
      currentPlayer: getCurrentPlayer()
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
