import React, { useEffect, useState } from 'react'

import { Label, Select } from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearSuccess } from '../../../Api/features/fileAttente/fileAttenteSlice'
import Loading from '../../../utils/Loading'
import { fetchRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks'
import { addPatient } from '../../../Api/features/fileAttente/fileAttenteThunks'
import DialogSuccess from "../../../utils/dialog/DialogSuccess";


const  AjoutQueue = () => {
  
  const dispatch = useDispatch();
  const  navigate = useHistory().push;


  const [patient_id, setPatient_id] = useState('');
  // const { patients } = useSelector((state) => state.patient);

  const { success, loading } = useSelector((state) => state.fileAttente)
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  
  // Charger les données depuis Redux
  useEffect(() => {
    dispatch(fetchRendezVous());
  }, [dispatch, rendezVousList.length]);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification de l'existence des données avant de tenter d'y accéder
    if (patient_id) {
      const fullName = `${patient_id.first_name} ${patient_id.last_name}`;
      const patientEmail = patient_id.email;
      dispatch(addPatient({patient_name:fullName, patient_email: patientEmail}));
  
    } else {
      console.error("Détails du patient non trouvés.");
    }
  };

  useEffect(() => {
    if (success === 'Patient added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      setIsSuccessModalOpen(true);
    }
  }, [dispatch, navigate, success]);
      
  // Filtrer et dédupliquer les patients
  const patientsAvecFacturesNonPayees = () => {
    // Vérifie si rendezVousList est bien un tableau
    if (!Array.isArray(rendezVousList)) return [];
    
    const patientsMap = new Map();

    rendezVousList.forEach((rdv) => {
      // Vérifie si la facture est non payée (si le rendez-vous n'est pas archivé)
      if (!rdv.is_archived) {
        const patient = rdv.patient_detail;

        // Utilise un identifiant unique pour éviter les doublons
        if (patient && patient.id && !patientsMap.has(patient.id)) {
          patientsMap.set(patient.id, patient);
        }
      }
    });

    // Retourne un tableau des patients sans doublons
    return Array.from(patientsMap.values());
  };

  const patients = patientsAvecFacturesNonPayees();

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/reception/queue');
  };
  
  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {console.log(rendezVousList)}
      { loading && <Loading/>}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter un patient à la file d'attente
              </h1>
              
              {/* Sélection de la spécialité */}
              <Label className="mt-4">
                <span className='text-gray-200'>Choisissez le patient</span>
                <Select
                  className="mt-1"
                  value={JSON.stringify(patient_id)} // Envoie un objet sérialisé
                  onChange={(e) => setPatient_id(JSON.parse(e.target.value))} // Désérialise l'objet
                >
                  <option value=""></option>
                  {patients.map((p) => (
                    <option key={p.id} value={JSON.stringify(p.user_detail)}>
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

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`La file d'attente a été ajoutée avec succès.`}
      />

    </div>
  )
}

export default AjoutQueue
