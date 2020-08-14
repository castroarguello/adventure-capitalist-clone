import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { PlayersCollection } from './players';
 
export const BusinessCollection = new Mongo.Collection('business');

Meteor.methods({
  'business.upgrade'(typeId, playerId) {

    const selector = { type: typeId, player: playerId };
    const business = BusinessCollection.find(selector, { sort: { createdAt: -1}}).fetch()[0];

    business.level++;
    business.updatedAt = new Date().getTime();

    BusinessCollection.upsert(selector, business);
  },

  'business.run'(player, type, business) {
    const selector = { _id: player._id };
    // Obtain latest player.
    const updated = PlayersCollection.find(selector, { sort: { createdAt: -1}}).fetch()[0];
    const profit = type.profit * business.level;
    updated.cash = updated.cash + profit;
    updated.updatedAt = new Date().getTime();

    PlayersCollection.upsert(selector, updated);
  },
 
});
