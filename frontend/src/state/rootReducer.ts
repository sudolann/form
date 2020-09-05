import { combineReducers } from '@reduxjs/toolkit';

import events from './events/reducer/';

export const rootReducer = combineReducers({ events });

export type RootState = ReturnType<typeof rootReducer>;
