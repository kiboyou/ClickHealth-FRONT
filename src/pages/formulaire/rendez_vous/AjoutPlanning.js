import React, { useEffect, useState } from 'react';

import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createPlanning } from '../../../Api/features/plannig/plannigThunks';
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/plannig/plannigSlice';

const AjoutPlanning = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  const [date, setDate] = useState('');
  const [jour, setJour] = useState('');
  const [heure_debut, setHeureDebut] = useState('');
  const [heure_fin, setHeureFin] = useState('');

  const { success, plannings, loading } = useSelector((state) => state.planning)
  const { user } = useSelector((state) => state.auth);

//   const { medecins } = useSelector((state) => state.medecin);
// Filtrer pour trouver le médecin associé à l'utilisateur connecté
// const medecinConnecte = medecins.find((medecin) => medecin.utilisateur === user.id);

  // Calculer le jour en fonction de la date sélectionnée
  const calculerJour = (dateString) => {
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dateObj = new Date(dateString);
    return jours[dateObj.getDay()];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
    createPlanning({
        medecin: 1,
        date,
        jour,
        heure_debut,
        heure_fin,
      })
    );
  };


  useEffect(() => {
    if (success == 'Planning created successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/planning');
    }
  }, [dispatch, navigate, success]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}

      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Ajouter un planning
                </h1>

                <Label className="mt-4">
                  <span>Date</span>
                  <Input
                    type="date"
                    className="px-4 py-3 mt-1"
                    onChange={(e) => {
                      setDate(e.target.value);
                      setJour(calculerJour(e.target.value)); // Met à jour le jour automatiquement
                    }}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Jour</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Jour automatique"
                    value={jour}
                    readOnly
                  />
                </Label>

                <Label className="mt-4">
                  <span>Heure de début</span>
                  <Input
                    type="time"
                    className="px-4 py-3 mt-1"
                    onChange={(e) => setHeureDebut(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Heure de fin</span>
                  <Input
                    type="time"
                    className="px-4 py-3 mt-1"
                    onChange={(e) => setHeureFin(e.target.value)}
                  />
                </Label>

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                >
                  Ajouter
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AjoutPlanning;
