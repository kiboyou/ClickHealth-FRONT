import { configureStore } from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';


import groupeReducer from './Api/features/groupe/groupeSlice';
import userReducer from './Api/features/user/userSlice';
import authReducer from './Api/features/userAuth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    groupe: groupeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;