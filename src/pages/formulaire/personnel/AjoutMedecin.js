 import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUser } from '../../../Api/features/user/userThunks';
import { addMedecin } from '../../../Api/features/medecins/medecinThunks';
import { fetchFonctions } from '../../../Api/features/medecins/fonctionThunk';
import { fetchSpecialites } from '../../../Api/features/medecins/specialiteThunk';
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/medecins/medecinSlice';

const AjoutMedecin = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // States pour chaque champ du formulaire
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [fonction, setFonction] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [loading, setLoading] = useState(false);

  // Sélecteurs pour obtenir l'état des actions Redux
  const { success: userSuccess, error: userError, loading: userLoading, selectedUser } = useSelector(state => state.user);
  const { success: medecinSuccess, error: medecinError, loading: medecinLoading } = useSelector(state => state.medecins);
  const { fonctions } = useSelector(state => state.fonctions);
  const { specialites } = useSelector(state => state.specialites);

  // Effet pour charger les fonctions et spécialités au démarrage du composant
  useEffect(() => {
    dispatch(fetchFonctions());
    dispatch(fetchSpecialites());
  }, [dispatch]);

  // Effet pour surveiller le succès de la création d'utilisateur et créer le médecin
  useEffect(() => {
    if (userSuccess && selectedUser) {
      const medecinData = {
        utilisateur: selectedUser.id, // Utilisation de l'ID de l'utilisateur créé
        fonction: fonction,
        specialite: specialite,
        utilisateur_info: {
          email,
          first_name,
          last_name,
        },
      };

      dispatch(addMedecin(medecinData));
    }
  }, [userSuccess, selectedUser, fonction, specialite, email, first_name, last_name, dispatch]);

  // Effet pour surveiller le succès de la création du médecin et rediriger
  useEffect(() => {
    if (medecinSuccess == 'Médecin ajouté avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/personnel/medecin');
    }
  }, [medecinSuccess,navigate]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Créer un utilisateur avant de créer un médecin
    const userData = {
      email,
      first_name,
      last_name,
      groups: ['medecin'], // Le médecin fait partie du groupe "medecin"
    };

    try {
      await dispatch(addUser(userData)); // Dispatche la création de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {userLoading && <Loading />}
      {medecinLoading && <Loading />}

      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter un Médecin
              </h1>

              {/* Email */}
              <Label className="mt-4">
                <span className='text-gray-200'>Email</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Label>

              {/* Nom */}
              <Label className="mt-4">
                <span className='text-gray-200'>Nom</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="text"
                  placeholder="Nom"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Label>

              {/* Prénom */}
              <Label className="mt-4">
                <span className='text-gray-200'>Prénom</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="text"
                  placeholder="Prénom"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Label>

              {/* Fonction */}
              <Label className="mt-4">
                <span className='text-gray-200'>Fonction</span>
                <Select
                  className="mt-2"
                  value={fonction}
                  onChange={(e) => setFonction(e.target.value)}
                >
                  <option value="">Sélectionner la fonction</option>
                  {fonctions.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nom_fonction}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Spécialité */}
              <Label className="mt-4">
                <span className='text-gray-200'>Spécialité</span>
                <Select
                  className="mt-2"
                  value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)}
                >
                  <option value="">Sélectionner la spécialité</option>
                  {specialites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nom_specialite}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                disabled={loading}
              >
                Ajouter Médecin
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AjoutMedecin;
