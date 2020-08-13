import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { TypesCollection } from '/imports/api/types';

function insertType({ id, name, upgradeRate, profit }) {
  TypesCollection.insert({id, name, upgradeRate, profit, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Types collection is empty, add some data.

  if (TypesCollection.find().count() === 0) {
    [
      { id: "lemonade", name: "Lemonade Stand", upgradeRate: 1.07, profit: 1 },
      { id: "newspaper", name: "Paper Route", upgradeRate: 1.15, profit: 60 },
    ].forEach(insertType)
  }

});
