import React, { FunctionComponent, ReactElement } from 'react';
import { EventPropsState } from '../eventsList/EventsList';

export const EventListItem: FunctionComponent<EventPropsState> = ({
  name,
  email,
  date,
  id,
}): ReactElement => {

  return (
    <li className="list--li">
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>date: {date}</p>
    </li>
  );
};
