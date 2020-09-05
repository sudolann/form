

import { Button } from 'antd';
import React, {
  FunctionComponent,
  ReactElement,
} from 'react';

import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { EventPropsState } from '../eventsList/EventsList';
import { useHttpClient } from '../../hooks/useHttpClient';


export const EventListItem: FunctionComponent<EventPropsState> = ({name, email, date, id}): ReactElement => {
  const { isLoading, error, sendRequest, setError } = useHttpClient();

  const deleteEvent = async (): Promise<void> => {
    try {
      return await sendRequest(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/delete/${id}`,
        "DELETE",
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent=()=> {
      console.log(id)
      return deleteEvent()
  }

  if(isLoading) {
    return <LoadingBar />
  }
  if(error) {
    return <ErrorAlert errorMessage="Error with delete event" />
  }


  return (
    <li className="list--li">
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>date: {date}</p>
        <Button onClick={handleDeleteEvent} className="list--link">
            delete event
        </Button>
    </li>
  );
};
