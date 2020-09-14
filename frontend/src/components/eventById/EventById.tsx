import { Button } from 'antd';
import React, { FunctionComponent, ReactElement } from 'react';
import { useEffect } from 'react';
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
  // const { isLoading, error, sendRequest, data } = useHttpClient();
  const history = useHistory();
  // console.log(data, 'data');
  // useEffect((): void => {
  //   const fetchEvent = async (): Promise<void> => {
  //     try {
  //       await sendRequest(
  //         `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/event/${eventId}`,
  //       );
  //     } catch (err) {}
  //   };
  //   fetchEvent();
  // }, [eventId, sendRequest]);

  // if (error) {
  //   return <ErrorAlert errorMessage={error} fullPage />;
  // }

  // if (isLoading) {
  //   return <LoadingBar />;
  // }
  // if (data) {
  //   return (
  //     <div className="event">
  //       <p>Event: {data.event.name}</p>
  //       <p>Email: {data.event.email}</p>
  //       <p>Date: {data.event.date}</p>
  //       <Button
  //         type="primary"
  //         onClick={(): void => history.push({ pathname: '/' })}
  //       >
  //         back to main page
  //       </Button>
  //     </div>
  //   );
  // }
  return null;
};
