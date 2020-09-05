import { AppState } from '../../store';
import { ReducerSate } from '../reducer';

export function getEvents(state: AppState): any {
  return state.events;
}

