import { Input, Label, Select } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchTypeConsultations } from '../../../Api/features/consultation/typeConsultationThunk';
import { fetchPlannings } from '../../../Api/features/plannig/plannigThunks';
import { clearSuccess } from '../../../Api/features/rendezVous/rendezVousSlice';
import { createRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks';
import Loading from '../../../utils/Loading';
import { fetchPatients } from '../../../Api/features/patient/patientThunks';

const AjoutRDV = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // Récupération des états depuis Redux
  const { success, loading, error } = useSelector((state) => state.rendezVous);
  const { typeConsultations } = useSelector((state) => state.typeConsultations);
  const { plannings } = useSelector((state) => state.planning);
  const { user } = useSelector((state) => state.auth);
  const { patients } = useSelector((state) => state.patient);

  const planningTrue = plannings.filter((plannig) => plannig.disponible)
  
  const [selectedSlot, setSelectedSlot] = useState(null);
    // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
    
  const visibleSlots = planningTrue.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Gestion de la navigation entre les pages
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < planningTrue.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Gestion du clic sur un créneau horaire
  const handleSlotClick = (dayID, slot) => {
    setSelectedSlot({ dayID, slot });
  };
  
  // Trouver l'ID du patient lié à l'utilisateur connecté
  const patientId = patients.find((patient) => patient.user === user.id)?.id;

  // États locaux pour le formulaire
  const [specialite, setSpecialite] = useState('');
  const [planning, setPlanning] = useState('');
  const [message, setMessage] = useState('');

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specialite) {
      alert("Veuillez remplir tous les champs nécessaires !");
      return;
    }

    const planningChoisi = plannings.find((p) => p.id === parseInt(planning));

    dispatch(
      createRendezVous({
        patient: patientId, // ID du patient connecté
        planning: selectedSlot?.dayID,
        type_consultation : specialite,
        message
      })
    );
  };

  // Fetch des plannings à chaque changement dans l'état des plannings
  useEffect(() => {
    dispatch(fetchPlannings());
    dispatch(fetchTypeConsultations());
    dispatch(fetchPatients());
  }, [dispatch, plannings.lemgth, typeConsultations.length, patients.length]);

  // Redirection après succès
  useEffect(() => {
    if (success === 'rdv created successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
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
                  <span>Type de consultation</span>
                  <Select
                    className="mt-1"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                  >
                    <option value="">Choisissez un type de consultation</option>
                    {typeConsultations.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
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

              {/* Sélection du planning
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
              </Label> */}

              {/* Sélection du planning */}
              <Label className="mt-4">
                  <span>Sélection du planning</span>
                </Label>
                <div className="mt-4 planning-container">

                  <div className="navigation">
                    <button
                      onClick={handlePreviousPage}
                      type="button"
                      className="nav-button focus:outline-none focus:border-none"
                      disabled={currentPage === 0}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={handleNextPage}
                      type="button"
                      className="nav-button focus:outline-none focus:border-none"
                      disabled={(currentPage + 1) * itemsPerPage >= planningTrue.length}
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="days">
                    {visibleSlots.map((slot) => (
                      <div key={slot.id} className="day-column">
                        
                        <div className="time-slot">
                        
                          <button
                            type="button"
                            className={`focus:outline-none focus:border-none slot-button ${
                              selectedSlot?.dayID === slot.id ? 'selected' : ''
                            }`}
                            onClick={() => handleSlotClick(slot.id, slot)}
                            disabled={!slot.disponible}
                          >
                            <div className="text-black day-header">
                              <span>
                                {slot.jour} <br/> ({slot.date})
                              </span>
                            </div>
                            {slot.heure_debut} - {slot.heure_fin}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

             

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
