import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '/imports/api/types';
import { BusinessCollection } from '/imports/api/business';
 
export const PlayerForm = ({ player }) => {

  const types = useTracker(() => {
    return TypesCollection.find().fetch();
  });

  const runBusiness = (type) => {
    const business = BusinessCollection.find({ type: type.id }).fetch();
    // const businesType = TypesCollection.find({id: type});
    console.log('runBusiness', business);
    console.log('type', type);
  }

  const upgradeBusiness = (type) => {
    const business = {
      type: type,
      level: 1,
      player: player._id,
    };
    console.log('upgradeBusiness', business);
    Meteor.call('business.insert', business);
  };

  return (
    <form className="player-form">
      <h2>My Game</h2>
      {types.map(
        type => <div className="card" key={type.id}>
          <div className="card-body">
            <span target="_blank">{type.name} ($ {type.profit})</span>
          </div>

          <div className="card-body">
            <button className="btn btn-info" type="button" onClick={(e) => upgradeBusiness(type)}>Buy</button>
            <button className="btn btn-success" type="button" onClick={(e) => runBusiness(type)}>Run</button>
          </div>

        </div>
      )}
 
    </form>
  );
};
