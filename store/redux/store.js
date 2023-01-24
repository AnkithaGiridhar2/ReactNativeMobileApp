import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
    auth: authReducer,
  }
});