import React, { FunctionComponent, ReactElement } from 'react';
import { useParams } from 'react-router-dom';

export const EventById: FunctionComponent = (): ReactElement => {
  const { eventID } = useParams<{ eventID: string }>();
  console.log(eventID, 'id');
  return <div className="container">{eventID} EventById</div>;
};
