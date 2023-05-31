// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    // Add other reducers here if needed
  },
});

export default store;
