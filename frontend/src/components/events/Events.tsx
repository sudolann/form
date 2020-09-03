import { Button } from 'antd';
import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from 'react';

import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { EventProps } from '../eventById/EventById';
import { LoadingBar } from '../loadingBar/LoadingBar';
import './Events.scss';



export const Events: FunctionComponent = (): ReactElement | null => {
  const [eventsData, setEventsData] = useState<EventProps[] | undefined>();
  
//   if (error) {
//     return <ErrorAlert errorMessage={error} fullPage />;
//   }

//   if (isLoading) {
//     return <LoadingBar />;
//   }

  if (eventsData) {
    return (
      <div className="event">
    
      </div>
    );
  }
  return null;
};
