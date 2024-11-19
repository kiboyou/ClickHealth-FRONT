import { Input, Label, Select } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchPlannings } from '../../../Api/features/plannig/plannigThunks';
import { createRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks';
import Loading from '../../../utils/Loading';

const AjoutRDV = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // Récupération des états depuis Redux
  const { success, loading, error } = useSelector((state) => state.rendezVous);
  const { plannings } = useSelector((state) => state.planning);
  const { user } = useSelector((state) => state.auth);
  const { patients } = useSelector((state) => state.patient);

  const planningTrue = plannings.filter((plannig) => plannig.disponible)
  
  // Trouver l'ID du patient lié à l'utilisateur connecté
  const patientId = patients.find((patient) => patient.user === user.id)?.id;

  // États locaux pour le formulaire
  const [specialite, setSpecialite] = useState('');
  const [planning, setPlanning] = useState('');
  const [message, setMessage] = useState('');

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specialite || !planning) {
      alert("Veuillez remplir tous les champs nécessaires !");
      return;
    }

    const planningChoisi = plannings.find((p) => p.id === parseInt(planning));

    dispatch(
      createRendezVous({
        patient: 1, // ID du patient connecté
        planning: planningChoisi?.id,
        message
      })
    );
  };

  // Charger les plannings au montage
  useEffect(() => {
    dispatch(fetchPlannings());
  }, [dispatch, plannings.lemgth]);

  // Redirection après succès
  useEffect(() => {
    if (success === 'rdv created successfully') {
      navigate('/app/rendez_vous');
    }
  }, [navigate, success]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Ajouter un rendez-vous
              </h1>

              {/* Sélection de la spécialité */}
              <Label className="mt-4">
                <span>Spécialité</span>
                <Select
                  className="mt-1"
                  value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)}
                >
                  <option value="">Choisissez une spécialité</option>
                  <option value="medecin_generale">Médecine générale</option>
                  <option value="cardiologie">Cardiologie</option>
                </Select>
              </Label>

              {/* Sélection du planning */}
              <Label className="mt-4">
                <span>Planning</span>
                <Select
                  className="mt-1"
                  value={planning}
                  onChange={(e) => setPlanning(e.target.value)}
                >
                  <option value="">Choisissez un planning</option>
                  {planningTrue.map((p) => (
                    <option key={p.id} value={p.id}>
                      Planning du {p.jour} {p.date} de {p.heure_debut} à {p.heure_fin}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Message pour le spécialiste */}
              <Label className="mt-4">
                <span>Message</span>
                <Input
                  className="px-4 py-3 mt-1"
                  placeholder="Message pour le spécialiste"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
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
  );
};

export default AjoutRDV;
