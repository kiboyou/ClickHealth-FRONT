import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPrescription } from '../../../Api/features/prescription/prescriptionThunks';
import { addOrdonnance } from '../../../Api/features/ordonnance/ordonnanceThunks';
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/ordonnance/ordonnanceSlice';
import { fetchConsultations } from '../../../Api/features/consultation/consultationThunks';
import { fetchTypeOrdonnances } from '../../../Api/features/ordonnance/typeOrdonnanceThunk';
import { fetchMedicaments } from '../../../Api/features/medicaments/medicamentThunk';  // Importation de l'action pour récupérer les médicaments

const AjoutPrescription = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // States pour chaque champ
  const [consultationId, setConsultationId] = useState('');
  const [typeOrdonnanceId, setTypeOrdonnanceId] = useState('');
  const [medicament, setMedicament] = useState('');
  const [posologie, setPosologie] = useState('');
  const [quantite, setQuantite] = useState('');

  // Sélecteurs pour obtenir l'état des données Redux
  const { consultations, loading: consultationsLoading } = useSelector((state) => state.consultation);
  const { typeOrdonnances, loading: typeOrdonnancesLoading } = useSelector((state) => state.typeOrdonnances);
  const { selectedOrdonnance, loading: ordonnanceLoading, success, error } = useSelector((state) => state.ordonnance);
  const { success: prescriptionSuccess, loading: prescriptionLoading } = useSelector((state) => state.prescription);
  const { medicaments, loading: medicamentsLoading } = useSelector((state) => state.medicaments);  // Sélecteur pour les médicaments

  // Effet pour récupérer les consultations, types d'ordonnances et médicaments
  useEffect(() => {
    dispatch(fetchConsultations());
    dispatch(fetchTypeOrdonnances());
    dispatch(fetchMedicaments());  // Récupérer les médicaments depuis l'API
  }, [dispatch]);

  // Effet pour surveiller la création de l'ordonnance et soumettre la prescription
  useEffect(() => {
    if (selectedOrdonnance && selectedOrdonnance.id) {
      const ordonnanceId = selectedOrdonnance.id;

      // Soumettre la prescription une fois l'ordonnance sélectionnée
      const prescriptionData = {
        ordonnance: ordonnanceId,
        medicament,
        posologie,
        quantite,
      };

      dispatch(addPrescription(prescriptionData));
    }
  }, [selectedOrdonnance, medicament, posologie, quantite, dispatch]);

  // Effet pour surveiller la réussite de la prescription
  useEffect(() => {
    if (prescriptionSuccess === 'Prescription added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/consultation/prescription');
    }
  }, [prescriptionSuccess, navigate, dispatch]);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const ordonnanceData = {
      consultation: consultationId,
      type_ordonnance: typeOrdonnanceId,
    };

    // Si une ordonnance est déjà sélectionnée, on l'utilise pour ajouter la prescription
    if (selectedOrdonnance && selectedOrdonnance.id) {
      const prescriptionData = {
        ordonnance: selectedOrdonnance.id,
        medicament,
        posologie,
        quantite,
      };
      dispatch(addPrescription(prescriptionData));
    } else {
      // Créer une nouvelle ordonnance avant d'ajouter la prescription
      dispatch(addOrdonnance(ordonnanceData));
    }
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {(consultationsLoading || typeOrdonnancesLoading || ordonnanceLoading || prescriptionLoading || medicamentsLoading) && <Loading />}

      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Ajouter une prescription
                </h1>

                {/* Consultation */}
                <Label className="mt-4">
                  <span>Consultation</span>
                  <Select
                    className="px-4 py-3 mt-1"
                    onChange={(e) => setConsultationId(e.target.value)}
                    value={consultationId}
                  >
                    <option value="">Choisir une consultation</option>
                    {consultations.map((consultation) => (
                      <option key={consultation.id} value={consultation.id}>
                       Consultation n-{consultation.id} de {consultation.patient_detail.user_detail.first_name} {consultation.patient_detail.user_detail.last_name}
                      </option>
                    ))}
                  </Select>
                </Label>

                {/* Type Ordonnance */}
                <Label className="mt-4">
                  <span>Type d'ordonnance</span>
                  <Select
                    className="px-4 py-3 mt-1"
                    onChange={(e) => setTypeOrdonnanceId(e.target.value)}
                    value={typeOrdonnanceId}
                  >
                    <option value="">Choisir un type d'ordonnance</option>
                    {Array.isArray(typeOrdonnances) && typeOrdonnances.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.nom}
                      </option>
                    ))}
                  </Select>
                </Label>

                {/* Médicament */}
                <Label className="mt-4">
                  <span>Médicament</span>
                  <Select
                    className="px-4 py-3 mt-1"
                    onChange={(e) => setMedicament(e.target.value)}
                    value={medicament}
                  >
                    <option value="">Choisir un médicament</option>
                    {Array.isArray(medicaments) && medicaments.map((med) => (
                      <option key={med.id} value={med.id}>
                        {med.nom}
                      </option>
                    ))}
                  </Select>
                </Label>

                {/* Posologie */}
                <Label className="mt-4">
                  <span>Posologie</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Posologie"
                    onChange={(e) => setPosologie(e.target.value)}
                    value={posologie}
                  />
                </Label>

                {/* Quantité */}
                <Label className="mt-4">
                  <span>Quantité</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Quantité"
                    onChange={(e) => setQuantite(e.target.value)}
                    value={quantite}
                  />
                </Label>

                {/* Soumettre */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AjoutPrescription;
