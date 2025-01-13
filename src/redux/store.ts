import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import commonReducer from './commonSlice';
import responseFeedbackReducer from './responseFeedbackSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    chat: chatReducer,
    responseFeedback: responseFeedbackReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
