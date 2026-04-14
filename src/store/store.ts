import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import skillReducer from './skillSlice';

export const store = configureStore({
  reducer: {
    skills: skillReducer,
    categories: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;