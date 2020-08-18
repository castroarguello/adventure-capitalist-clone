import { Mongo } from 'meteor/mongo';
import { BusinessCollection } from './business';

export const PlayersCollection = new Mongo.Collection('players');

Meteor.methods({
  // Increase player profit.
  'players.increaseProfit'(playerId, profit) {
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];
    if (player) {
      player.cash += +profit;
      PlayersCollection.upsert({ _id: playerId }, player);
    }
  },
 
  // Load or create the player object.
  'players.loadPlayer'(playerId) {
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    if (!player) {
      const newPlayer = {
        _id: playerId,
        name: 'Player',
        cash: 0,
        lastConnection: new Date().getTime(),
        managers: [],
        upgradeBatch: 1,
      }
      PlayersCollection.upsert({ _id: playerId }, newPlayer);
      Meteor.call('business.buy', playerId, 'lemonade');
    }
  },
 
});
