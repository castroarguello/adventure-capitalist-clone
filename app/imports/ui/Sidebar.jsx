import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style="">
      <div className="sidebar-sticky pt-3">
      </div>
    </nav>
  );
};
