import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Player } from './Player';
import { BusinessCollection } from '/imports/api/business';

export const Business = ({ player, type }) => {

  // Track business values.
  const { business } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: player._id }, { sort: { timestamp: -1}}).fetch()[0],
  }));

  // Track other values that use business.
  const { canBuy, canUpgrade, profit } = useTracker(() => ({
    profit: (business ? business.level : 1) * type.profit,
    canBuy: player.cash >= type.purchase,
    canUpgrade: business ? player.cash >= business.upgradeCost : false,
  }));

  let [timer, setTimer] = useState(type.duration);
  let [running, setRunning] = useState(false);

  // Call back-end method to buy a business.
  const buyBusiness = () => {
    Meteor.call('business.buy', player._id, type.id);
  }

  // Call back-end method to run a business.
  const runBusiness = () => {
    setRunning(true);
    timer = type.duration;

    const interval = Meteor.setInterval(() => {
      if (timer -1 === 0) {
        setTimer(type.duration);
      } else {
        setTimer(--timer);
      }
    }, 1000);

    Meteor.setTimeout(() => {
      Meteor.call('business.run', player._id, type.id);
      Meteor.clearInterval(interval);
      setTimer(type.duration);
      setRunning(false);
    }, type.duration * 1000);
  }

  // Call back-end method to upgrade a business.
  const upgradeBusiness = () => {
    Meteor.call('business.upgrade', player._id, type.id, business._id);
  };

  const RenderSpinner = () => {
    if (running) {
      return (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return '';
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
      let runProps = {
        disabled: running,
      };
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
              <span target="_blank">Profit: $ </span>
            </div>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar"></div>
            </div>
            <div className="card-text">
              <button {...runProps} className="btn btn-success mr-1 mb-1" type="button" onClick={(e) => runBusiness()}>Run { business.profit }</button>
              <button className="btn btn-secondary mr-1 mb-1" type="button" disabled="disabled">{ timer }
                <RenderSpinner />
              </button>
            </div>
            <div className="card-text">
              <button {...upgradeProps} className="btn btn-info mr-1 mb-1" type="button" onClick={(e) => upgradeBusiness(business)}>
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
