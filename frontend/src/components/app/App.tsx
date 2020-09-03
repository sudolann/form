import React, { FunctionComponent, ReactElement } from "react";
import "./App.scss";
import { EventById } from "../eventById/EventById";
import { AddNewEventForm } from "../addNewEventForm/AddNewEventForm";
import { Events } from "../events/Events";

import { Route, Switch } from "react-router-dom";

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={AddNewEventForm} />
        <Route path="/:eventId" component={EventById} />
        <Route path="/events" component={Events} />

      </Switch>
    </div>
  );
};
