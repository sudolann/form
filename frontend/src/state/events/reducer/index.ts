import { createReducer } from '@reduxjs/toolkit';
import { EventPropsState } from '../../../components/eventsList/EventsList';
import {
  actionFetchEventWaiting,
  actionFetchEventsSuccess,
  actionFetchEventsFailure,
} from '../actions';

export interface ReducerSate {
  list: EventPropsState[] | [];
  loading: boolean;
  error: boolean;
}



const events = createReducer<ReducerSate | {}>(
  {},
  {
    [actionFetchEventWaiting.type]: () => ({
      isError: false,
      loading: true,
    }),
    [actionFetchEventsSuccess.type]: (state, action) => {
      if (actionFetchEventsSuccess.match(action)) {
        return {
          isError: false,
          loading: false,
          list: action.payload,
        };
      }

      return state;
    },
    [actionFetchEventsFailure.type]: () => ({
      isError: true,
      loading: false,
    }),
  },
);

export default events;
