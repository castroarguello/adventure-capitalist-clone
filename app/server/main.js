import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { TypesCollection } from '/imports/api/types';
import { PlayersCollection } from '/imports/api/players';
import { BusinessCollection } from '/imports/api/business';
import { Random } from 'meteor/random';

function insertType({ id, name, upgradeRate, profit, duration, initialCost }) {
  TypesCollection.insert({id, name, upgradeRate, profit, duration, initialCost, createdAt: new Date()});
}

function insertPlayer(player) {
  PlayersCollection.insert(player);
}

Meteor.startup(() => {

  if (PlayersCollection.find().count() === 0) {
    [
      { id: Random.id, name: "Ramiro", cash: 0, upgradeBatch: 1, lastConnection: new Date() },
      { id: Random.id, name: "Anonymous", cash: 0, upgradeBatch: 1, lastConnection: new Date() },
    ].forEach(insertPlayer);
  }

  // If the Types collection is empty, add some data.
  if (TypesCollection.find().count() === 0) {
    [
      { id: "lemonade", name: "Lemonade Stand", upgradeRate: 1.07, profit: 1, duration: 1, initialCost: 4 },
      { id: "newspaper", name: "Paper Route", upgradeRate: 1.15, profit: 60, duration: 3, initialCost: 60 },
      { id: "carwash", name: "Car Wash", upgradeRate: 1.14, profit: 540, duration: 6, initialCost: 720 },
      { id: "pizza", name: "Pizza Deliveries", upgradeRate: 1.13, profit: 4320, duration: 12, initialCost: 8640 },
      { id: "donut", name: "Donut Shop", upgradeRate: 1.12, profit: 51480, duration: 24, initialCost: 103680 },
      { id: "shrimp", name: "Schrimp Boat", upgradeRate: 1.11, profit: 622080, duration: 96, initialCost: 1244160 },
      { id: "hockey", name: "Hockey Team", upgradeRate: 1.1, profit: 7464000, duration: 384, initialCost: 14929920 },
      { id: "studio", name: "Movie Studio", upgradeRate: 1.09, profit: 89579000, duration: 1536, initialCost: 179159040 },
      { id: "bank", name: "Bank", upgradeRate: 1.08, profit: 4320, duration: 12, initialCost: 2149908480 },
      { id: "oil", name: "Oil Company", upgradeRate: 1.07, profit: 4320, duration: 12, initialCost: 25798901760 },
    ].forEach(insertType);
  }

});
