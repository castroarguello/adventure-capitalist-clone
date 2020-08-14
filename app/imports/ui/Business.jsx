import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Player } from './Player';
import { BusinessCollection } from '/imports/api/business';

export const Business = ({ player, type }) => {

  const { business, count } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: player._id }, { sort: { createdAt: -1}}).fetch()[0],
    count: BusinessCollection.find({ type: type.id, player: player._id }).count(),
  }));

  // Calculate upgrade cost.
  const upgradeCost = () => {
    return count ? type.profit * business.level ^ type.upgradeRate : Infinity;
  }

  const { canBuyFirst, canUpgrade, profit } = useTracker(() => ({
    profit: (business ? business.level : 1) * type.profit,
    canBuyFirst: player.cash < type.purchase,
    canUpgrade: player.cash < upgradeCost(),
  }));

  // Call back-end method to run a business.
  const runBusiness = () => {
    Meteor.call('business.run', player, type, business);
  }

  // Call back-end method to upgrade a business.
  const upgradeBusiness = () => {
    Meteor.call('business.upgrade', type.id, player._id);
  };

  const RenderButtons = () => {
    let buyProps = {
      disabled: count ? canUpgrade : canBuyFirst,
    };

    let upgradeProps = {
      disabled: count ? canUpgrade : canBuyFirst,
    };

    if (count) {
      return (<button {...upgradeProps} className="btn btn-info" type="button" onClick={(e) => upgradeBusiness()}>Upgrade {upgradeCost()}</button>);
    } else {
      return (<button {...buyProps} className="btn btn-info" type="button" onClick={(e) => upgradeBusiness()}>Buy</button>);
    }
  };

  let runProps = {
    disabled: count ? false : true,
  };

  return (
    <div className="card col-md-6 business">
      <h3>{type.name} ({count ? business.level: 0}) [{type.duration}] - ${ count ? upgradeCost() : type.purchase }</h3>
      <div className="card-body">
        <span target="_blank">{type.name} ($ {profit})</span>

        <div className="progress">
          <div className="progress-bar bg-success" role="progressbar"></div>
        </div>
      </div>

      
      <div className="card-body">
        <RenderButtons />
        <button {...runProps} className="btn btn-success" type="button" onClick={(e) => runBusiness()}>Run</button>
      </div>
    </div>
  );
};
