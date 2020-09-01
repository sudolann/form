import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { ErrorAlert } from "../errorAlert/ErrorAlert";
import { LoadingBar } from "../loadingBar/LoadingBar";


export interface EventProps {
  name: string;
  email: string;
  date: string;
}

export const EventById: FunctionComponent = (): ReactElement | null => {
  const { eventId } = useParams<{ eventId: string }>();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [eventData, setEventData] = useState<EventProps | undefined>();

  useEffect((): void => {
    const fetchScores = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/${eventId}`);
        setEventData(responseData.point);
      } catch (err) {
        console.warn('cannot find event', err.message);
      }
    };
    fetchScores();
  }, [eventId, sendRequest]);

  if (error) {
    return <ErrorAlert errorMessage={error} />;
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  if (eventData) {
    return (
      <div>
      DATA
      </div>
    );
  }
  return null;
};
