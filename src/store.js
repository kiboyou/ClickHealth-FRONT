import { configureStore } from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';


import groupeReducer from './Api/features/groupe/groupeSlice';
import userReducer from './Api/features/user/userSlice';
import authReducer from './Api/features/userAuth/authSlice';
import patientReducer from './Api/features/patient/patientSlice';
import rendezVousReducer from './Api/features/rendezVous/rendezVousSlice';
import planningReducer from './Api/features/plannig/plannigSlice';
import consultationReducer from './Api/features/consultation/consultationSlice';
import prescriptionReducer from './Api/features/prescription/prescriptionSlice';
import examenReducer from './Api/features/examen/examenSlice';
import ordonnanceReducer from './Api/features/ordonnance/ordonnanceSlice';
import factureRdvReducer from './Api/features/factureRdv/factureRdvSlice';
import factureExamenReducer from './Api/features/factureExamen/factureExamenSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    groupe: groupeReducer,
    patient: patientReducer,
    rendezVous: rendezVousReducer,
    planning: planningReducer,
    consultation: consultationReducer,
    prescription: prescriptionReducer,
    examen: examenReducer,
    ordonnance: ordonnanceReducer,
    factureRdv: factureRdvReducer,
    factureExamen: factureExamenReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;