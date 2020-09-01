import React, { FunctionComponent, ReactElement } from 'react';
import './App.scss';

import { AddNewEventForm } from '../addNewEventForm/addNewEventForm';
import { EventById } from '../eventById/EventById';
import { Route, Switch } from 'react-router-dom';

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
      <Switch>
        <Route to="/" exact component={AddNewEventForm} />
        <Route to="/:eventID" component={EventById} />
      </Switch>
    </div>
  );
};
