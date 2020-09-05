import React, { FunctionComponent, ReactElement } from 'react';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { EventProps } from '../eventById/EventById';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { useSelector } from 'react-redux';
import { getEvents } from '../../state/events/selectors';
import { EventListItem } from '../eventListItem/EventListItem';
import './EventsList.scss';

export interface EventPropsState extends EventProps {
  id: string
}

export const EventsList: FunctionComponent = (): ReactElement => {
  const state = useSelector(getEvents);

  if(state.loading) {
    return <LoadingBar/>
  }
  if(state.error) {
    return <ErrorAlert errorMessage="error with fetch events"/>
  }

  return (
    <ul className="list">
    {state.list && state.list.map((event: EventPropsState)=> {
      const {name, date, email, id } = event;
      return <EventListItem name={name} date={date} email={email} key={id} id={id} />
    })}
    </ul>
  );
};
