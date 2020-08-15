import { Mongo } from 'meteor/mongo';

export const PlayersCollection = new Mongo.Collection('players');

Meteor.methods({
  'players.switchBatch'(playerId) {
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    const options = [1, 10, 100, 'max'];
    let pos = options.indexOf(player.upgradeBatch);
    pos++;
    if (pos < 0  || pos >= options.length) {
      pos = 0;
    }
    player.upgradeBatch = options[pos];

    player.updatedAt = new Date().getTime();
    PlayersCollection.upsert({ _id: playerId }, player);
  },
 
});
