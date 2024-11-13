import { configureStore } from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';


import groupeReducer from './Api/features/groupe/groupeSlice';
import userReducer from './Api/features/user/userSlice';
import authReducer from './Api/features/userAuth/authSlice';
import patientReducer from './Api/features/patient/patientSlice';
import rendezVousReducer from './Api/features/rendezVous/rendezVousSlice';
import planningReducer from './Api/features/plannig/plannigSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    groupe: groupeReducer,
    patient: patientReducer,
    rendezVous: rendezVousReducer,
    planning: planningReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;