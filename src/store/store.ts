import { configureStore } from '@reduxjs/toolkit';
import skillReducer from './skillSlice';

export const store = configureStore({
  reducer: {
    skills: skillReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;