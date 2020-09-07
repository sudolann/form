import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { EventProps } from '../eventById/EventById';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { EventListItem } from '../eventListItem/EventListItem';
import './EventsList.scss';
import { useHttpClient } from '../../hooks/useHttpClient';

export interface EventPropsState extends EventProps {
  id: string;
}

export const EventsList: FunctionComponent = (): ReactElement => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [eventsList, setEventsList] = useState<EventPropsState[]>();
  useEffect((): void => {
    const fetchEvent = async (): Promise<void> => {
      try {
        const responseData = await sendRequest(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/events`,
        );

        const dataMapped = responseData.map(
          (data: { _id: any; name: any; email: any; date: any }) => {
            const { _id, name, email, date } = data;
            return { id: _id, name, email, date };
          },
        );
        setEventsList(dataMapped);
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest]);

  if (isLoading) {
    return <LoadingBar />;
  }
  if (error) {
    return (
      <ErrorAlert errorMessage="error with fetch events" fullPage />
    );
  }
  return (
    <ul className="list">
      {eventsList &&
        (eventsList.length === 0 ? (
          <ErrorAlert errorMessage="No events" fullPage />
        ) : (
          eventsList.map((event: EventPropsState) => {
            const { name, date, email, id } = event;
            return (
              <EventListItem
                name={name}
                date={date}
                email={email}
                key={id}
                id={id}
              />
            );
          })
        ))}
    </ul>
  );
};
