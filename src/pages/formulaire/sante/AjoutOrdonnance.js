import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOrdonnance } from '../../../Api/features/ordonnance/ordonnanceThunks'; // À ajuster selon ton fichier de thunks
import { fetchPatients } from '../../../Api/features/patient/patientThunks';
import { fetchTypeOrdonnances } from '../../../Api/features/ordonnance/typeOrdonnanceThunk'; // À ajuster si nécessaire
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/ordonnance/ordonnanceSlice'; // À ajuster si nécessaire

const AjoutOrdonnance = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // States pour chaque champ du formulaire
  const [patient, setPatient] = useState('');
  const [typeOrdonnance, setTypeOrdonnance] = useState('');
  const [dateOrdonnance, setDateOrdonnance] = useState('');
  const [loading, setLoading] = useState(false);

  // Sélecteurs pour obtenir l'état des actions Redux
  const { success: ordonnanceSuccess, loading: ordonnanceLoading } = useSelector(state => state.ordonnance);
  const { patients } = useSelector(state => state.patient); // Liste des patients
  const { typeOrdonnances } = useSelector(state => state.typeOrdonnances); // Liste des types d'ordonnances

  // Effet pour charger les patients et types d'ordonnances au démarrage du composant
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchTypeOrdonnances());  // Charger les types d'ordonnances
  }, [dispatch]);

  // Effet pour surveiller le succès de la création de l'ordonnance et rediriger
  useEffect(() => {
    if (ordonnanceSuccess === 'Ordonnance ajoutée avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/consultation/ordonnance'); // Redirige vers la liste des ordonnances
    }
  }, [ordonnanceSuccess, dispatch, navigate]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const ordonnanceData = {
      patient,
      type_ordonnance: typeOrdonnance,
      date_ordonnance: dateOrdonnance,
    };

    try {
      await dispatch(addOrdonnance(ordonnanceData)); // Dispatche l'ajout de l'ordonnance
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ordonnance", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {ordonnanceLoading && <Loading />}

      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Ajouter une Ordonnance
              </h1>

              {/* Patient */}
              <Label className="mt-4">
                <span>Patient</span>
                <Select
                  className="mt-2"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.user_detail.first_name} {p.user_detail.last_name}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Type d'Ordonnance */}
              <Label className="mt-4">
                <span>Type d'Ordonnance</span>
                <Select
                  className="mt-2"
                  value={typeOrdonnance}
                  onChange={(e) => setTypeOrdonnance(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un type d'ordonnance</option>
                  {typeOrdonnances.map((to) => (
                    <option key={to.id} value={to.id}>
                      {to.nom}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Date de l'Ordonnance */}
              <Label className="mt-4">
                <span>Date de l'Ordonnance</span>
                <Input
                  className="mt-2"
                  type="date"
                  value={dateOrdonnance}
                  onChange={(e) => setDateOrdonnance(e.target.value)}
                  required
                />
              </Label>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                disabled={loading}
              >
                Ajouter Ordonnance
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AjoutOrdonnance;
