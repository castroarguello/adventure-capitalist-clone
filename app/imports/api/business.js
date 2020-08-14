import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const BusinessCollection = new Mongo.Collection('business');

Meteor.methods({
  'business.insert'(typeId, playerId) {

    const selector = { type: typeId, player: playerId };
    const business = BusinessCollection.find(selector, { sort: { createdAt: -1}}).fetch()[0];

    const level = business ? business.level + 1 : 1;
    const modifier = {
      type: typeId,
      player: playerId,
      level: level,
      updatedAt: new Date().getTime(),
    }

    console.log(business);
    BusinessCollection.upsert(selector, modifier);
  },
 
});
