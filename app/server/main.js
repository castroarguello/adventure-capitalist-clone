import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { TypesCollection } from '/imports/api/types';
import { PlayersCollection } from '/imports/api/players';
import { BusinessCollection } from '/imports/api/business';
import { ManagerCollection } from '/imports/api/manager';
import { Random } from 'meteor/random';

function insertType(type) {
  TypesCollection.insert(type);
}

function insertManager(manager) {
  ManagerCollection.insert(manager);
}

function insertPlayer(player) {
  player.managers = [];
  PlayersCollection.insert(player);
}

Meteor.startup(() => {

  // If the Types collection is empty, add some data.
  if (TypesCollection.find().count() === 0) {
    [
      { id:'lemonade', name:'Lemonade Stand', upgradeRate: 1.07, profit: 1, duration: 1, purchase: 3.738317757 },
      { id:'newspaper', name:'Paper Route', upgradeRate: 1.15, profit: 60, duration: 3, purchase: 60 },
      { id:'carwash', name:'Car Wash', upgradeRate: 1.14, profit: 540, duration: 6, purchase: 720 },
      { id:'pizza', name:'Pizza Deliveries', upgradeRate: 1.13, profit: 4320, duration: 12, purchase: 8640 },
      { id:'donut', name:'Donut Shop', upgradeRate: 1.12, profit: 51480, duration: 24, purchase: 103680 },
      { id:'shrimp', name:'Schrimp Boat', upgradeRate: 1.11, profit: 622080, duration: 96, purchase: 1244160 },
      { id:'hockey', name:'Hockey Team', upgradeRate: 1.1, profit: 7464000, duration: 384, purchase: 14929920 },
      { id:'studio', name:'Movie Studio', upgradeRate: 1.09, profit: 89579000, duration: 1536, purchase: 179159040 },
      { id:'bank', name:'Bank', upgradeRate: 1.08, profit: 4320, duration: 6120, purchase: 2149908480 },
      { id:'oil', name:'Oil Company', upgradeRate: 1.07, profit: 4320, duration: 12, purchase: 25798901760 },
    ].forEach(insertType);
  }

  // If the Types collection is empty, add some data.
  if (ManagerCollection.find().count() === 0) {
    [
      { name: 'Cabe Johnson', hire: 1000, type: 'lemonade' },
      { name: 'Perry Black', hire: 15000, type: 'newspaper'},
      { name: 'W. W. Heisenbird', hire: 100000, type: 'carwash' },
      { name: 'Mama Sean', hire: 500000, type: 'pizza' },
      { name: 'Tim Thorton', hire: 1200000000, type: 'donut' },
      { name: 'Forrest Trump', hire: 100000, type: 'shrimp' },
      { name: 'Dawn Cheri', hire: 111111111, type: 'hockey' },
      { name: 'Stefani Speilburger', hire: 555555555, type: 'movie' },
      { name: 'The Dark Lord', hire: 10000000000, type: 'bank' },
      { name: 'Derrick Plainview', hire: 100000000000, type: 'oil' },
    ].forEach(insertManager);
  }

});
