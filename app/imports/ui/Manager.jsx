import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '/imports/api/types';
import { ManagerCollection } from '/imports/api/manager';
 
export const Manager = ({ player }) => {

  const { types, managers } = useTracker(() => ({
    managers: ManagerCollection.find({}, {sort: { hire: true }}).fetch(),
    types: TypesCollection.find().fetch(),
  }));

  const RenderHireButton = ({ manager, player }) => {
    // Call back-end method to hire a manager.
    const hireManager = () => {
      Meteor.call('manager.hire', manager._id, player._id);
    };
  
    let enoughCash = (player.cash >= manager.hire);
    let hired = player.managers.indexOf(manager.type) >= 0;
    let hireProps = {
      disabled: !enoughCash || hired,
      className: !enoughCash || hired ? 'btn btn-secondary' : 'btn btn-info',
    };
    return (
      <button {...hireProps} type="button" onClick={(e) => hireManager()}>Hire{hired ? 'd' : ''}</button>
    );
  };

  return (
    <form className="manager">
      <h2>Managers</h2>
      <div className="manager__container">
        {managers.map(
          manager => <div key={manager._id}>
            <div className="alert alert-secondary" role="alert">
              <span className="manager__name"> { manager.name } </span>
              <span className="manager__hire"> { manager.hire } </span>
              <span className="manager__type"> { manager.type } </span>
              <RenderHireButton manager={manager} player={player} />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
