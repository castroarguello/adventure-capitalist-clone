import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Player } from './Player';
import { BusinessCollection } from '/imports/api/business';

export const Business = ({ player, type }) => {

  const { business, count } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: player._id }, { sort: { createdAt: -1}}).fetch()[0],
    count: BusinessCollection.find({ type: type.id, player: player._id }).count(),
  }));

  console.log(business);

  const runBusiness = () => {
    // const business = BusinessCollection.find({ type: type.id, player: player._id }).fetch();
    // const businesType = TypesCollection.find({id: type});
    console.log('runBusiness', business);
    console.log('type', type);
  }

  const upgradeBusiness = () => {
    Meteor.call('business.insert', type.id, player._id);
  };

  return (
    <div className="business">
      Business - {type.name} ({count ? business.level: 0})
          <div className="card-body">
            <span target="_blank">{type.name} ($ {type.profit})</span>

            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar"></div>
            </div>

          </div>

          <div className="card-body">
            <button className="btn btn-info" type="button" onClick={(e) => upgradeBusiness()}>{count ? 'Upgrade' : 'Buy' }</button>
            <button className="btn btn-success" type="button" onClick={(e) => runBusiness()}>Run</button>
          </div>
    </div>
  );
};