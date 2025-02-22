import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addConsultation } from '../../../Api/features/consultation/consultationThunks';  // À ajuster selon ton fichier de thunks
import { fetchPatients } from '../../../Api/features/patient/patientThunks';  // À ajuster selon ton fichier de patients
import { fetchTypeConsultations } from '../../../Api/features/consultation/typeConsultationThunk'; // À ajuster si nécessaire
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/consultation/consultationSlice'; // À ajuster si nécessaire
import { fetchRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks';
import DialogSuccess from "../../../utils/dialog/DialogSuccess";
const AjoutConsultation = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  // States pour chaque champ du Formulaire
  const [patient, setPatient] = useState('');
  const [typeConsultation, setTypeConsultation] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [dateConsultation, setDateConsultation] = useState('');
  const [loading, setLoading] = useState(false);

  // Sélecteurs pour obtenir l'état des actions Redux
  const { success: consultationSuccess, loading: consultationLoading } = useSelector(state => state.consultation);
  const { patients } = useSelector(state => state.patient); // Liste des patients
   const { rendezVousList } = useSelector(state => state.rendezVous); // Liste des rendez-vous
  const { typeConsultations } = useSelector(state => state.typeConsultations); // Liste des types de consultations

  // Effet pour charger les patients et types de consultations au démarrage du composant
  useEffect(() => {
    console.log('Patients:', patients); // Vérifier la liste des patients
    console.log('Rendez-vous:', rendezVousList); 
      dispatch(fetchRendezVous());
    dispatch(fetchPatients());
    dispatch(fetchTypeConsultations());  // Charger les types de consultations
  }, [dispatch]);


  // Filtrer les patients qui ont déjà pris un rendez-vous
 const patientsAvecRendezVous = () => {
  // Vérifier que rendezVousList est un tableau valide
  if (!Array.isArray(rendezVousList)) return [];

  // Créer un Set pour stocker les ID des patients qui ont un rendez-vous
  const patientsAvecRdvIds = new Set();

  // Parcourir chaque rendez-vous et récupérer les patients qui ont un rendez-vous
  rendezVousList.forEach((rdv) => {
    if (rdv.patient_detail && rdv.patient_detail.id) {
      // Ajouter l'ID du patient dans le Set
      patientsAvecRdvIds.add(rdv.patient_detail.id);
    }
  });

  // Filtrer les patients qui ont un rendez-vous en utilisant le Set
  const patientsFiltrés = patients.filter((patient) =>
    patientsAvecRdvIds.has(patient.id)
  );

  return patientsFiltrés;
};


  const patientsFiltrés = patientsAvecRendezVous();




  // Effet pour surveiller le succès de la création de la consultation et rediriger
  useEffect(() => {
    if (consultationSuccess === 'Consultation added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
    }
  }, [consultationSuccess, dispatch, navigate]);

  // Gérer la soumission du Formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const consultationData = {
      patient,
      type_consultation: typeConsultation,
      diagnostic,
      date_consultation: dateConsultation,
    };

    try {
      await dispatch(addConsultation(consultationData)); // Dispatche l'ajout de la consultation
    } catch (error) {
      console.error("Erreur lors de l'ajout de la consultation", error);
      setLoading(false);
    }
  };

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/consultation'); // Redirige vers la liste des consultations
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {consultationLoading && <Loading />}

      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter une Consultation
              </h1>

              {/* Patient */}
              <Label className="mt-4">
                <span className='text-gray-200'>Patient</span>
                <Select
                  className="mt-2"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un patient</option>
                  {patientsFiltrés.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.user_detail.first_name} {p.user_detail.last_name}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Type de Consultation */}
              <Label className="mt-4">
                <span className='text-gray-200'>Type de Consultation</span>
                <Select
                  className="mt-2"
                  value={typeConsultation}
                  onChange={(e) => setTypeConsultation(e.target.value)}
                  required
                >
                  <option value="">Sélectionner le type de consultation</option>
                  {typeConsultations.map((tc) => (
                    <option key={tc.id} value={tc.id}>
                      {tc.nom} - {tc.specialite_detail.nom_specialite}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Diagnostic */}
              <Label className="mt-4">
                <span className='text-gray-200'>Diagnostic</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="text"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  required
                />
              </Label>

              {/* Date de Consultation */}
              {/* <Label className="mt-4">
                <span className='text-gray-200'>Date de la Consultation</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="date"
                  value={dateConsultation}
                  onChange={(e) => setDateConsultation(e.target.value)}
                  required
                />
              </Label> */}

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                disabled={loading}
              >
                Ajouter Consultation
              </button>
            </form>
          </div>
        </main>
      </div>
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`La facture d'examen a été ajouté avec succès.`}
      />
    </div>
  );
};

export default AjoutConsultation;
