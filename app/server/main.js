import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { TypesCollection } from '/imports/api/types';
import { PlayersCollection } from '/imports/api/players';
import { BusinessCollection } from '/imports/api/business';
import { Random } from 'meteor/random';

function insertType({ id, name, upgradeRate, profit }) {
  TypesCollection.insert({id, name, upgradeRate, profit, createdAt: new Date()});
}

function insertPlayer(player) {
  PlayersCollection.insert(player);
}

Meteor.startup(() => {

  if (PlayersCollection.find().count() === 0) {
    [
      { id: Random.id, name: "Anonymous", cash: 0, upgradeBatch: 1, lastConnection: new Date() },
    ].forEach(insertPlayer);
  }

  // If the Types collection is empty, add some data.
  if (TypesCollection.find().count() === 0) {
    [
      { id: "lemonade", name: "Lemonade Stand", upgradeRate: 1.07, profit: 1, duration: 1 },
      { id: "newspaper", name: "Paper Route", upgradeRate: 1.15, profit: 60, duration: 3 },
      { id: "carwash", name: "Car Wash", upgradeRate: 1.14, profit: 540, duration: 6 },
      { id: "pizza", name: "Pizza Deliveries", upgradeRate: 1.13, profit: 4320, duration: 12 },
    ].forEach(insertType);
  }

});
