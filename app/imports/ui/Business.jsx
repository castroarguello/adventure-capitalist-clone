import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Player } from './Player';
import { BusinessCollection } from '/imports/api/business';

export const Business = ({ player, type }) => {

  const { business, count } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: player._id }, { sort: { createdAt: -1}}).fetch()[0],
    count: BusinessCollection.find({ type: type.id, player: player._id }).count(),
  }));

  const { profit } = useTracker(() => ({
    profit: (business ? business.level : 1) * type.profit,
  }));

  console.log(business, profit);

  const runBusiness = () => {
    Meteor.call('business.run', player, type, business);
  }

  const upgradeBusiness = () => {
    Meteor.call('business.upgrade', type.id, player._id);
  };

  // Calculate upgrade cost.
  const upgradeCost = () => {
    return business ? type.profit * business.level ^ type.upgradeRate : Infinity;
  }

  const RenderButtons = () => {
    let canUpgrade = player.cash > upgradeCost();
    let canBuy = count ? true : player.cash > type.initialCost;
    let buyProps = {};
    let runProps = {
      disabled: count ? false : true,
    };

    return (
      <div className="card-body">
        <button className="btn btn-info" type="button" onClick={(e) => upgradeBusiness()}>{count ? 'Upgrade' : 'Buy' }</button>
        <button {...runProps} className="btn btn-success" type="button" onClick={(e) => runBusiness()}>Run</button>
      </div>
    );
  };

  return (
    <div className="business">
      Business - {type.name} ({count ? business.level: 0})
          <div className="card-body">
            <span target="_blank">{type.name} ($ {profit})</span>

            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar"></div>
            </div>
          </div>

          <RenderButtons />
    </div>
  );
};
