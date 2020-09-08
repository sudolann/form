import React, { FunctionComponent, ReactElement } from 'react';
import { EventProps } from '../eventById/EventById';

export const EventListItem: FunctionComponent<EventProps> = ({
  name,
  email,
  date,
}): ReactElement => {
  return (
    <li className="list--li">
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>date: {date}</p>
    </li>
  );
};
