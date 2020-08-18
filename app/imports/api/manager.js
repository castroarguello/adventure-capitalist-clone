import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { PlayersCollection } from './players';
// import { TypesCollection } from '/imports/api/types';
 
export const ManagerCollection = new Mongo.Collection('manager');

Meteor.methods({
  'manager.hire'(managerId, playerId) {
    const manager = ManagerCollection.find({ _id: managerId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    if (!player.managers) {
      player.managers = [];
    }
    if (player.managers.indexOf(manager.type) < 0) {
      player.managers.push(manager.type);
    }
    player.updatedAt = new Date().getTime();
    PlayersCollection.update({ _id: playerId }, player);
  },

});
