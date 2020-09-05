import React, { FunctionComponent, ReactElement, useEffect } from "react";
import "./App.scss";
import { EventById } from "../eventById/EventById";
import { AddNewEventForm } from "../addNewEventForm/AddNewEventForm";
import { EventsList } from "../eventsList/EventsList";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../state/events/actions";
import { Navigation } from "../navigation/Navigation";

export const App: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div className="container">
    <Navigation />
      <Switch>
        <Route path="/" exact component={EventsList} />
        <Route path="/form" component={AddNewEventForm} />
        <Route path="event/:eventId" component={EventById} />
      </Switch>
    </div>
  );
};
