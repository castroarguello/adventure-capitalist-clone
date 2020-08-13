import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Player } from './Player.jsx';

const player = { name: 'Ramiro', cash: 0 };

export const App = () => (
  <div className="'player'">
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <Player player={ player }/>
  </div>
);
