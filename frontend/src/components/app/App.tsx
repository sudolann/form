import React, { FunctionComponent, ReactElement } from "react";
import "./App.scss";
import { EventById } from "../eventById/EventById";
import { AddNewEventForm } from "../addNewEventForm/AddNewEventForm";

import { Route, Switch } from "react-router-dom";

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
      <Switch>
        <Route path="/" component={AddNewEventForm} />
        <Route path="/:eventId" component={EventById} />
      </Switch>
    </div>
  );
};
