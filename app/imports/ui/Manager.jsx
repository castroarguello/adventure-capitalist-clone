import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TypesCollection } from '/imports/api/types';
import { ManagerCollection } from '/imports/api/manager';
 
export const Manager = ({ player }) => {

  const { types, managers } = useTracker(() => ({
    managers: ManagerCollection.find().fetch(),
    types: TypesCollection.find().fetch(),
  }));

  return (
    <form className="manager">
      <h2>Managers</h2>
      <div className="manager__container">
        {managers.map(
          manager => <div key={manager._id}>
            <div> { manager.name } </div>
            <div> { manager.hire } </div>
            <div> { manager.type } </div>
          </div>
        )}
      </div>
    </form>
  );
};
