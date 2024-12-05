import { Input, Label, Select } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearSuccess } from '../../../Api/features/patient/patientSlice';
import { createPatient } from '../../../Api/features/patient/patientThunks';
import { resetCurrentRendezVous } from '../../../Api/features/rendezVous/rendezVousSlice';
import { addUser } from '../../../Api/features/user/userThunks';
import Loading from '../../../utils/Loading';

const AjoutPatient = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // States pour chaque champ
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [telephone, setTelephone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sexe, setSexe] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [profession, setProfession] = useState('');
  const [etat_civil, setEtatCivil] = useState('');

  // Sélecteurs pour obtenir l'état des actions Redux
  const { currentRendezVous } = useSelector((state) => state.rendezVous);
  const { success, error, loading: patientLoading } = useSelector((state) => state.patient);
  const { selectedUser, loading: userLoading, success: userSuccess, error: userError } = useSelector((state) => state.user);
  
  // Effet pour surveiller userSuccess et lancer la création de patient
  useEffect(() => {
    console.log('userSuccess:', userSuccess, 'selectedUser:', selectedUser);
    if (userSuccess && selectedUser) {
      const formattedDate = birthdate.split('-').join('-');
      const patientData = {
        user: selectedUser.id,
        telephone,
        date_naissance: formattedDate,
        sexe,
        adresse,
        ville,
        profession,
        etat_civil,
      };

      // Dispatch pour créer un patient
      dispatch(createPatient(patientData));
    }
  }, [userSuccess, selectedUser]);
  

  // Récupération du rendez-vous à mettre à jour
  useEffect(() => {
    if (currentRendezVous) {
      console.log('Données du rendez-vous', currentRendezVous);
      setEmail(currentRendezVous.email);
      setFirst_name(currentRendezVous.prenom);
      setLast_name(currentRendezVous.nom);
      setTelephone(currentRendezVous.telephone)
      
      dispatch(resetCurrentRendezVous())
    }
  }, [currentRendezVous]);

  // Effet pour surveiller le succès de la création du patient et rediriger
  useEffect(() => {
    if (success == 'Patient created successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/patients');
    }
  }, [success, navigate]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      first_name,
      last_name,
      groups: ['patient'],
    };

    try {
      await dispatch(addUser(userData));
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
  };


  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {userLoading && <Loading />}
      {patientLoading && <Loading />}

      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                  Ajouter un patient
                </h1>
                
                {/* Form fields */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Email</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    type="email"
                    placeholder="kiboyou@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Nom</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="OUATTARA"
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Prénoms</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Kiboyou Mohamed"
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Téléphone</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="0707073567"
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephone}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Date de naissance</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Sexe</span>
                  <Select className="mt-1" onChange={(e) => setSexe(e.target.value)} value={sexe}>
                    <option value=""></option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </Select>
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Adresse</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Foyer babel"
                    onChange={(e) => setAdresse(e.target.value)}
                    value={adresse}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Ville</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Tunis"
                    onChange={(e) => setVille(e.target.value)}
                    value={ville}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>Profession</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Étudiant"
                    onChange={(e) => setProfession(e.target.value)}
                    value={profession}
                  />
                </Label>

                <Label className="mt-4">
                  <span className='text-gray-200'>État civil</span>
                  <Select className="mt-1" onChange={(e) => setEtatCivil(e.target.value)} value={etat_civil}>
                    <option value=""></option>
                    <option value="Marié">Marié</option>
                    <option value="Célibataire">Célibataire</option>
                  </Select>
                </Label>

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

export default AjoutPatient;
