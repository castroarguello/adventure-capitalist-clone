import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { PlayersCollection } from './players';
import { TypesCollection } from '/imports/api/types';
 
export const BusinessCollection = new Mongo.Collection('business');

Meteor.methods({
  'business.buy'(playerId, typeId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];
    const upgradeCost = Math.pow(type.upgradeRate, 2) * type.purchase;
    const business = {
      level: 1,
      player: playerId,
      profit: type.profit,
      timestamp: new Date().getTime(),
      type: typeId,
      upgradeCost: upgradeCost,
    };
      // Insert level 1 business.
    BusinessCollection.insert(business);

    // Extract purchase cost.
    player.cash -= type.purchase;
    PlayersCollection.update({ _id: playerId }, player);
  },

  'business.upgrade'(playerId, typeId, businessId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    const business = BusinessCollection.find({ _id: businessId }).fetch()[0];

    if (business) {
      const upgradeCost = Math.pow(type.upgradeRate, business.level) * type.purchase;
      const nextLevel = business.level + 1;
      const newBusiness = {
        level: nextLevel,
        player: playerId,
        profit: type.profit * nextLevel,
        timestamp: new Date().getTime(),
        type: typeId,
        upgradeCost: upgradeCost,
      };
      // Insert business with new level.
      BusinessCollection.insert(newBusiness);

      // Extract upgrade cost.
      player.cash -= newBusiness.upgradeCost;
      player.updatedAt = new Date().getTime();
      PlayersCollection.update({ _id: playerId }, player);
    }
  },

  'business.run'(playerId, typeId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const business = BusinessCollection.find({ type: typeId, player: playerId }, { sort: { timestamp: -1}}).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    // Deposit business profit.
    player.cash += business.profit;
    player.updatedAt = new Date().getTime();
    PlayersCollection.upsert({ _id: playerId }, player);
  },
 
});
