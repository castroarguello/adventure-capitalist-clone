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

  const RenderPlayer = (props) => {
    if (getCurrentPlayer()._id) {
      return (<Player player={currentPlayer} />);
    }
    return '';
  };

  return (
    <div>
      <h2>Business Types:</h2>
      <ul>{types.map(
        type => <li key={type.id}>
          <span target="_blank">{type.name} ($ {type.profit})</span>
        </li>
      )}</ul>

      <h2>Players ({count}):</h2>
      {players.map(
        player => <li key={player._id}>
          <a onClick={(e) => setCurrentPlayer(player)} >{player.name} ($ {player.cash})</a>
        </li>
      )}

      <RenderPlayer />

      <Manager />

    </div>
  );
};
