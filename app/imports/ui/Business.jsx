import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BusinessCollection } from '/imports/api/business';
import { PlayersCollection } from '/imports/api/players';

export const Business = ({ playerId, type }) => {

  // Track business values.
  const { business, player } = useTracker(() => ({
    business: BusinessCollection.find({ type: type.id, player: playerId }).fetch()[0],
    player: PlayersCollection.find({ _id: playerId }).fetch()[0],
  }));

  // Track other values that use business.
  const { canBuy, canUpgrade, profit } = useTracker(() => ({
    profit: (business ? business.level : 1) * type.profit,
    canBuy: player ? player.cash >= type.purchase : false,
    canUpgrade: business && player ? player.cash >= business.upgradeCost : false,
  }));
  const managed = player ? !!(player.managers.indexOf(type.id) >= 0) : false;
  let [timer, setTimer] = useState(type.duration);
  let [running, setRunning] = useState(managed);

  // Call back-end method to buy a business.
  const buyBusiness = () => {
    Meteor.call('business.buy', playerId, type.id);
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

    let duration = type.duration * 1000 - 500;
    Meteor.setTimeout(() => {
      Meteor.call('business.run', playerId, type.id);
      Meteor.clearInterval(interval);
      setTimer(type.duration);
      setRunning(false);
    }, duration);
  }

  // Call back-end method to upgrade a business.
  const upgradeBusiness = () => {
    Meteor.call('business.upgrade', playerId, type.id, business._id);
  };

  const RenderSpinner = () => {
    if (running) {
      return (
        <div className="spinner-border spinner-border-sm text-light" role="status">
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

  const RenderManaged = () => {
    if (player.managers.indexOf(business.type) < 0) {
      return '';
    }
    return (
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill float-right mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    );
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
            <span className="badge badge-secondary float-right">{ business.level }</span>
            <RenderManaged />

          </div>
          <div className="card-body">
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar"></div>
            </div>
            <div className="card-text">
              <button {...runProps} className="btn btn-success mr-1 mb-1" type="button" onClick={(e) => runBusiness()}>Run { business.profit }</button>
              <button className="btn btn-secondary mr-1 mb-1" type="button" disabled="disabled">
                { managed ? '' : timer }
                <RenderSpinner />
              </button>
            </div>
            <div className="card-text">
              <button {...upgradeProps} className="button--upgrade btn btn-info mr-1 mb-1" type="button" onClick={(e) => upgradeBusiness(business)}>
                <span className="text-left">Buy</span>  <span className="text-right">{business.upgradeCost}</span>
                <span className="text-left"> [x {player.upgradeBatch}] </span>
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
    <div className="col-md-3 business">
      <RenderCards />
    </div>
  );
};
