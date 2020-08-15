import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Player } from './Player';
import { BusinessCollection } from '/imports/api/business';

export const Business = ({ player, type }) => {

  const { business, count } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: player._id }, { sort: { timestamp: -1}}).fetch()[0],
    count: BusinessCollection.find({ type: type.id, player: player._id }).count(),
  }));

  const { canBuy, canUpgrade, profit } = useTracker(() => ({
    profit: (business ? business.level : 1) * type.profit,
    canBuy: player.cash >= type.purchase,
    canUpgrade: business ? player.cash >= business.upgradeCost : false,
  }));

  // Call back-end method to buy a business.
  const buyBusiness = () => {
    Meteor.call('business.buy', player._id, type.id);
  }

  // Call back-end method to run a business.
  const runBusiness = () => {
    Meteor.call('business.run', player._id, type.id, business._id);
  }

  // Call back-end method to upgrade a business.
  const upgradeBusiness = () => {
    Meteor.call('business.upgrade', player._id, type.id, business._id);
  };

  const RenderBuyButton = () => {
    console.log(canBuy)
    if (canBuy) {
      return (
        <div className="card-body">
          <button className="btn btn-info" type="button" onClick={(e) => buyBusiness()}>Buy</button>
        </div>
      );
    }
    return ('');
  };

  const RenderCards = () => {
    if (business) {
      console.log(business);
      let upgradeProps = {
          disabled: !canUpgrade,
        };
      return (
        <div className="card-body">
          <span target="_blank">Profit: ($ { business.profit })</span>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar"></div>
          </div>
          <div className="card-body">
            <button className="btn btn-success" type="button" onClick={(e) => runBusiness()}>Run</button>
          </div>
          <div className="card-body">
            <button {...upgradeProps} className="btn btn-info" type="button" onClick={(e) => upgradeBusiness(business)}>Upgrade {business.upgradeCost}</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-body">
          <div>level: { type.purchase } </div>
          <h3>{type.name} [{type.duration}s] - ${ type.purchase }</h3>
          <div className="card-body">
            <span target="_blank">{type.name} ($ { type.profit })</span>
          </div>
          canBuy: {canBuy ? 'true' : 'false'}
          <RenderBuyButton />
        </div>
      );

    }
  };

  return (
    <div className="card col-md-6 business">

      <h3>{type.name} [{type.duration}] </h3>

      <RenderCards />
      canBuy: {canBuy ? 'true' : 'false'} = 
      cash: {player.cash}
      
    </div>
  );
};
