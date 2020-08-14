import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const BusinessCollection = new Mongo.Collection('business');

Meteor.methods({
  'business.insert'(typeId, playerId) {

    BusinessCollection.insert({
      type: typeId,
      level: 1,
      createdAt: new Date().getTime(),
    })
  },
 
});
