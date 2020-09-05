import { AppThunk } from '../../store';
import { FETCH_EVENTS } from '../constants';
import { createAction } from '@reduxjs/toolkit';
import { EventProps } from '../../../components/eventById/EventById';



export const actionFetchEventWaiting = createAction(
  FETCH_EVENTS.WAITING,
);
export const actionFetchEventsSuccess = createAction(
  FETCH_EVENTS.SUCCESS,
  (events: EventProps[]) => ({
    payload: events,
  }),
);
export const actionFetchEventsFailure = createAction(
  FETCH_EVENTS.FAILURE,
);

export function fetchEvents(): AppThunk {
  return async (dispatch): Promise<void> => {
    dispatch(actionFetchEventWaiting());
    const request = fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/events`);

    try {
      const events = await (await request).json();
      dispatch(actionFetchEventsSuccess(events));
    } catch (error) {
      console.warn('problem with fetch events', error);
      dispatch(actionFetchEventsFailure());
    }
  };
}
