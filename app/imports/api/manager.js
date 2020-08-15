import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { PlayersCollection } from './players';
// import { TypesCollection } from '/imports/api/types';
 
export const ManagerCollection = new Mongo.Collection('manager');

Meteor.methods({
  'manager.hire'(managerId, playerId) {
    const manager = ManagerCollection.find({ id: managerId }).fetch()[0];
    // const type = TypesCollection.find({ id: typeId }).fetch()[0];
    const player = PlayersCollection.find({ _id: playerId }).fetch()[0];

    if (!player.managers) {
      player.managers = [];
    }
    if (player.managers.indexOf(managerId) < 0) {
      player.managers.push(managerId);
    }
    player.updatedAt = new Date().getTime();
    PlayersCollection.update({ _id: playerId }, player);
  },

});