import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';
import { TypesCollection } from '../api/types';

export const Info = () => {
  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });

  const types = useTracker(() => {
    return TypesCollection.find().fetch();
  });

  return (
    <div>
      <h2>Business Types:</h2>
      <ul>{types.map(
        type => <li key={type.id}>
          <span target="_blank">{type.name} ($ {type.profit})</span>
        </li>
      )}</ul>
    </div>
  );
};
