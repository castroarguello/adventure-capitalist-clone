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
    if (canBuy) {
      return (
        <div className="card-body">
          <button className="btn btn-info" type="button" onClick={(e) => buyBusiness()}>Buy</button>
        </div>
      );
    }
    return '';
  };

  const RenderCards = () => {
    if (business) {
      let upgradeProps = {
        disabled: !canUpgrade,
      };
      return (
        <div className="card border-dark mb-3">
          <div className="card-header">
            <span className="mr-3">{ type.name}</span>
            <span className="badge badge-secondary">{ business.level }</span>
          </div>
          <div className="card-body">
            <div className="card-text">
              <span target="_blank">Profit: $ { business.profit }</span>
            </div>
            <div className="card-text">
              Duration: {type.duration}s
            </div>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar"></div>
            </div>
            <div className="card-text">
              <button className="btn btn-success" type="button" onClick={(e) => runBusiness()}>Run</button>
            </div>
            <div className="card-text">
              <button {...upgradeProps} className="btn btn-info" type="button" onClick={(e) => upgradeBusiness(business)}>
                Buy {business.upgradeCost}
              </button>
            </div>
          </div>
      </div>
      );
    } else {
      return (
        <div className="card border-dark mb-3">
          <div className="card-header">{type.name} </div>
          <div className="card-body">
            <div className="card-title">{type.name} </div>
            <div className="card-text">
              <span target="_blank">($ { type.purchase })</span>
            </div>
            <RenderBuyButton />
          </div>
        </div>
      );

    }
  };

  return (
    <div className="col-md-6 business">
      <RenderCards />
    </div>
  );
};
