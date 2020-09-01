import { Button } from 'antd';
import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { ErrorAlert } from "../errorAlert/ErrorAlert";
import { LoadingBar } from "../loadingBar/LoadingBar";
import { useHistory } from "react-router";
import "./EventById.scss";

export interface EventProps {
  name: string;
  email: string;
  date: string;
}

export const EventById: FunctionComponent = (): ReactElement | null => {
  const { eventId } = useParams<{ eventId: string }>();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [eventData, setEventData] = useState<EventProps | undefined>();
  const history = useHistory();
  useEffect((): void => {
    const fetchEvent = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${eventId}`);
        setEventData(responseData.event);
      } catch (err) {
        console.warn('cannot find event', err.message);
      }
    };
    fetchEvent();
  }, [eventId, sendRequest]);
  
  if (error) {
    return <ErrorAlert errorMessage={error} fullPage/>;
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  if (eventData) {
    return (
      <div className="event">
        <p>Event: {eventData.name}</p>
        <p>Email: {eventData.email}</p>
        <p>Date: {eventData.date}</p>
        <Button type='primary' className="btn-form" onClick={():void=> history.push({ pathname: "/" })}>
          back to main page
        </Button>
      </div>
    );
  }
  return null;
};
