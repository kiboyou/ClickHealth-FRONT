import React, { useEffect, useState } from 'react'

import { Label, Select } from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearSuccess } from '../../../Api/features/factureExamen/factureExamenSlice'
import { addFactureExamen } from '../../../Api/features/factureExamen/factureExamenThunks'
import Loading from '../../../utils/Loading'
// import { fetchFacturesExamen } from '../../../Api/features/factureExamen/factureExamenThunks'
import { fetchExamens } from '../../../Api/features/examen/examenThunks'


const  AjoutFactureExamen = () => {
  
  const dispatch = useDispatch();
  const  navigate = useHistory().push;


  const [patient_id, setPatient_id] = useState('');
  // const { patients } = useSelector((state) => state.patient);

  const { success, loading } = useSelector((state) => state.factureExamen)
  const { examens } = useSelector((state) => state.examen)

  
  // Charger les données depuis Redux
  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch, examens.length]);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFactureExamen({patient: patient_id}));

  };

  useEffect(() => {
    if (success === 'Facture for exam added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/reception/factures/examens');      
      console.log(success);
    }
  }, [dispatch, navigate, success]);
      
  // Filtrer et dédupliquer les patients
  const patientsAvecFacturesNonPayees = () => {
      if (!examens || !Array.isArray(examens)) return [];
  
      const patientsMap = new Map();
  
      examens.forEach((examen) => {
        // Vérifie si facture est non payée
        if (examen.facture === false) {
          const patient = examen.consultation_detail?.patient_detail;
  
          // Utilise un identifiant unique pour éviter les doublons
          if (!patientsMap.has(patient.id)) {
            patientsMap.set(patient.id, patient);
          }
        }
      });
  
      return Array.from(patientsMap.values());
    };
  
  const patients = patientsAvecFacturesNonPayees();
  
  
  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {console.log(examens)}
      { loading && <Loading/>}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Générer une facture d'examen
              </h1>
              
              {/* Sélection de la spécialité */}
              <Label className="mt-4">
                  <span>Choisissez le patient</span>
                  <Select
                    className="mt-1"
                    value={patient_id}
                    onChange={(e) => setPatient_id(e.target.value)}
                  >
                    <option value=""></option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.user_detail.first_name} - {p.user_detail.last_name} - {p.user_detail.email}
                      </option>
                    ))}
                  </Select>
                </Label>
                {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none sm:text-xl btnprise font-montserrat"
              >
                Ajouter
              </button>
              
            </form>  
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AjoutFactureExamen
