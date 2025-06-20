import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchTypeConsultations } from '../../../Api/features/consultation/typeConsultationThunk';
import { fetchPlannings } from '../../../Api/features/plannig/plannigThunks';
import { clearSuccess } from '../../../Api/features/rendezVous/rendezVousSlice';
import { createRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks';
import ImageLight from '../../../assets/img/login.jpg';
import ImageDark from '../../../assets/img/login.jpg';
import Loading from '../../../utils/Loading';
import { Input, Label, Select } from '@windmill/react-ui';
import DialogSuccess from '../../../utils/dialog/DialogSuccess';
import DialogConfirm from "../../../utils/dialog/DialogConfirm";

const AjoutRendezVous = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // États pour les champs du Formulaire
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Sélecteurs Redux
  const { success, loading } = useSelector((state) => state.rendezVous);
  const { typeConsultations } = useSelector((state) => state.typeConsultations);
  const { plannings } = useSelector((state) => state.planning);

  const planningTrue = plannings.filter((p) => p.disponible);
  
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

  // Gestion de la soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createRendezVous({
        planning: selectedSlot?.dayID,
        prenom: first_name,
        nom: last_name,
        email,
        telephone,
        message,
        type_consultation: specialite,
      })
    );
  };

  // Chargement des plannings et types de consultations
  useEffect(() => {
    dispatch(fetchPlannings());
    dispatch(fetchTypeConsultations());
  }, [dispatch]);

  // Redirection après succès
  useEffect(() => {
    if (success === 'rdv created successfully') {
      dispatch(clearSuccess());
      setIsDialogOpen(true);
    }
  }, [navigate, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/');
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      {loading && <Loading />}
      <div className="flex-1 h-full max-w-6xl mx-auto overflow-hidden bg-white rounded-lg bg-cadre1">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                  Formulaire de rendez-vous
                </h1>

                {/* Nom et prénom */}
                <Label className="mt-4">
                  <span className="text-gray-200">Nom</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="OUATTARA"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span className="text-gray-200">Prénom(s)</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Kiboyou Mohamed"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Label>

                {/* Email et téléphone */}
                <Label className="mt-4">
                  <span className="text-gray-200">Email</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    type="email"
                    placeholder="kiboyou@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span className="text-gray-200">Téléphone</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    type="number"
                    placeholder="0707073567"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </Label>

                {/* Message et type de consultation */}
                <Label className="mt-4">
                  <span className="text-gray-200">Message</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Message pour le spécialiste"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span className="text-gray-200">Type de consultation</span>
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
                      
                {/* Sélection du planning */}
                <Label className="mt-4">
                  <span className="text-gray-200">Sélection du planning</span>
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

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg btnprise focus:outline-none focus:border-none"
                >
                  Envoyer
                </button>
              </form>

              <p className="mt-10">
                <NavLink
                  className="text-sm font-medium text-white hover:underline"
                  to="/verifie_rendez_vous"
                >
                  Voulez-vous modifier votre prise de rendez-vous ?
                </NavLink>
              </p>
            </div>
          </main>
        </div>
      </div>
      
       {/*Dialog de succès pour le RDV*/}
      <DialogSuccess
          open={isDialogOpen}
          onClose={handleCloseDialog}
          title={"Rendez-vous Confirmé"}
          message={"Votre rendez-vous a été pris avec succès !"}
          small_message={"Veuillez vérifier votre email pour récupérer le code du rendez-vous et la facture."}
      />

    </div>
  );
};

export default AjoutRendezVous;
