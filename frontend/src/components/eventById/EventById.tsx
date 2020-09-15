import { Button } from 'antd';
import React, { FunctionComponent, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { useHistory } from 'react-router';
import './EventById.scss';

export interface EventProps {
  name: string;
  email: string;
  date: string;
}

export const EventById: FunctionComponent = (): ReactElement | null => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, status, error } = useHttpClient(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/event/${eventId}`, { onRender: true });
  const history = useHistory();

  if (error && status === 'rejected') {
    return <ErrorAlert errorMessage={error} fullPage />;
  }

  if (status === 'pending') {
    return <LoadingBar />;
  }
  console.log(data);
  if (data) {
    return (
      <div className="event">
        <p>Event: {data.event.name}</p>
        <p>Email: {data.event.email}</p>
        <p>Date: {data.event.date}</p>
        <Button type="primary" onClick={(): void => history.push({ pathname: '/' })}>
          back to main page
        </Button>
      </div>
    );
  }
  return null;
};
