import { configureStore } from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';


import groupeReducer from './Api/features/groupe/groupeSlice';
import userReducer from './Api/features/user/userSlice';
import authReducer from './Api/features/userAuth/authSlice';
import patientReducer from './Api/features/patient/patientSlice';
import rendezVousReducer from './Api/features/rendezVous/rendezVousSlice';
import planningReducer from './Api/features/plannig/plannigSlice';
import medecinReducer from './Api/features/medecins/medecinSlice';
import medicamentReducer from './Api/features/medicaments/medicamentSlice';
import fonctionReducer from './Api/features/medecins/fonctionSlice';
import specialiteReducer from './Api/features/medecins/specialiteSlice';
import typeOrdonnancesReducer from './Api/features/ordonnance/typeOrdonnanceSlice';
import typeExamensReducer from './Api/features/examen/typeExamenSlice';
import typeConsultationsReducer from './Api/features/consultation/typeConsultationSlice';
import caisseReducer from './Api/features/receptionnistes/caisseSlice';
import receptionnisteReducer from './Api/features/receptionnistes/receptionnisteSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    groupe: groupeReducer,
    patient: patientReducer,
    rendezVous: rendezVousReducer,
    planning: planningReducer,
    medecins: medecinReducer, 
    fonctions: fonctionReducer,
    specialites: specialiteReducer,
    typeOrdonnances: typeOrdonnancesReducer,
    typeExamens: typeExamensReducer,
    typeConsultations: typeConsultationsReducer,
     caisses: caisseReducer,
     receptionnistes:receptionnisteReducer,
       medicaments: medicamentReducer, 
    


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;