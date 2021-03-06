import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { PlayersCollection } from './players';
import { TypesCollection } from '/imports/api/types';
 
export const BusinessCollection = new Mongo.Collection('business');

Meteor.methods({
  'business.buy'(playerId, typeId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];
    if (!type || !player) {
      return;
    }

    const upgradeCost = type.upgradeRate * type.purchase;
    // Extract purchase cost except the lemonade stand.
    const cash = +(player.cash - type.purchase);
      if (typeId != 'lemonade' && cash > 0) {
        player.cash = +cash.toFixed(2);
        PlayersCollection.update({ _id: playerId }, player);
      }

      if (typeId == 'lemonade' || cash > 0) {
      const business = {
        level: 1,
        player: playerId,
        profit: type.profit,
        timestamp: new Date().getTime(),
        type: typeId,
        upgradeCost: upgradeCost.toFixed(2),
      };

      // Insert level 1 business.
      BusinessCollection.insert(business);
    }
  },

  'business.upgrade'(playerId, typeId, businessId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];
    const business = BusinessCollection.find({ _id: businessId }).fetch()[0];

    if (business) {
      // Extract upgrade cost.
      const cash = player.cash - business.upgradeCost;
      if (cash >= 0) {
        player.cash = +cash.toFixed(2);
        player.updatedAt = new Date().getTime();
        PlayersCollection.update({ _id: playerId }, player);

        business.level++;
        const upgradeCost = Math.pow(type.upgradeRate, business.level) * type.purchase;
        business.profit = type.profit * business.level;
        business.timestamp = new Date().getTime();
        business.upgradeCost = upgradeCost.toFixed(2);

        // Update business with new level.
        BusinessCollection.update({ _id: businessId }, business);
      }
    }
  },

  'business.run'(playerId, typeId) {
    const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const business = BusinessCollection.find({ type: typeId, player: playerId }, { sort: { timestamp: -1}}).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    // Deposit business profit.
    const cash = +(player.cash + business.profit);
    player.cash = +cash.toFixed(2);
    player.updatedAt = new Date().getTime();
    PlayersCollection.upsert({ _id: playerId }, player);
  },
 
});
