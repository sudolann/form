import React, { FunctionComponent, ReactElement } from "react";
import { EventById } from "../eventById/EventById";
import { AddNewEventForm } from "../addNewEventForm/AddNewEventForm";
import { EventsList } from "../eventsList/EventsList";
import { Route, Switch } from "react-router-dom";
import { Navigation } from "../navigation/Navigation";
import "./App.scss";

export const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="container">
    <Navigation />
      <Switch>
        <Route path="/" exact component={EventsList} />
        <Route path="/form" component={AddNewEventForm} />
        <Route path="/:eventId" component={EventById} />
      </Switch>
    </div>
  );
};
