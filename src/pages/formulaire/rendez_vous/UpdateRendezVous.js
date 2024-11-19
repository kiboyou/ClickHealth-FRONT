import { Input, Label, Select } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPlannings } from '../../../Api/features/plannig/plannigThunks';
import { updateRendezVous } from '../../../Api/features/rendezVous/rendezVousThunks';
import ImageLight from '../../../assets/img/login-office.jpeg';
import ImageDark from '../../../assets/img/login.jpg';
import Loading from '../../../utils/Loading';

const UpdateRendezVous = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // Déclaration des états pour les différents champs du formulaire
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [planning, setPlanning] = useState('');

  const { success, loading, error, currentRendezVous } = useSelector((state) => state.rendezVous);
  
  const { plannings } = useSelector((state) => state.planning);
  const planningTrue = plannings.filter((plannig) => plannig.disponible);

  // Récupération du rendez-vous à mettre à jour
  useEffect(() => {
    if (currentRendezVous) {
      console.log('Données du rendez-vous', currentRendezVous);
      setEmail(currentRendezVous.email);
      setFirstName(currentRendezVous.prenom);
      setLastName(currentRendezVous.nom);
      setTelephone(currentRendezVous.telephone);
      setMessage(currentRendezVous.message);
      setSpecialite(currentRendezVous.specialite);
      setPlanning(currentRendezVous.planning);
    }
  }, [currentRendezVous]);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const planningChoisi = plannings.find((p) => p.id === parseInt(planning));
    console.log(planning);
    
    if (planningChoisi) {
      const rendezVousId = parseInt(currentRendezVous?.id);
      const planningId = planningChoisi?.id;

      console.log('Rendez-vous à mettre à jour:', rendezVousId, planningId);
      
      dispatch(
        updateRendezVous({
          id: rendezVousId,
          rendezVous: {
            planning: planningId,
          },
        })
      );
    } else {
      console.error('Planning non valide sélectionné.');
    }

    console.log(planning);

  };

  // Fetch des plannings à chaque changement dans l'état des plannings
  useEffect(() => {
    dispatch(fetchPlannings());
  }, [dispatch]);

  // Redirection après succès
  useEffect(() => {
    if (success === 'rdv updated successfully') {
      navigate('/'); // Redirige après la mise à jour réussie
    }
  }, [navigate, success]);

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
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Mise à jour de votre rendez-vous
                </h1>

                <Label className="mt-4">
                  <span>Nom</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="OUATTARA"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Prénom(s)</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Kiboyou Mohamed"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Email</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    type="email"
                    placeholder="kiboyou@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Téléphone</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    type="number"
                    placeholder="0707073567"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Message</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="message pour le spécialiste"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Spécialité</span>
                  <Select
                    className="mt-1"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                  >
                    <option></option>
                    <option>Médecin généraliste</option>
                    <option>Cardiologie</option>
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

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                >
                  Mettre à jour
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpdateRendezVous;
