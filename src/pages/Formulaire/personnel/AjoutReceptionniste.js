import { Input, Label, Select } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCaisses } from '../../../Api/features/receptionnistes/caisseThunk'; // Assurez-vous de disposer de cette action pour récupérer les caisses
import { clearSuccess } from '../../../Api/features/receptionnistes/receptionnisteSlice';
import { addReceptionniste } from '../../../Api/features/receptionnistes/receptionnisteThunk';
import { addUser } from '../../../Api/features/user/userThunks';
import Loading from '../../../utils/Loading';
import DialogSuccess from "../../../utils/dialog/DialogSuccess";

const AjoutReceptionniste = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  // States pour chaque champ du Formulaire
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [caisse, setCaisse] = useState('');
  // const [loading, setLoading] = useState(false);

  // Sélecteurs pour obtenir l'état des actions Redux
  const { success: userSuccess, error: userError, loading: userLoading, selectedUser } = useSelector(state => state.user);
  const { success: receptionnisteSuccess, error: receptionnisteError, loading: receptionnisteLoading } = useSelector(state => state.receptionnistes);
  const { caisses } = useSelector(state => state.caisses);  // Récupère la liste des caisses depuis le Redux store

  // Effet pour charger les caisses au démarrage du composant
  useEffect(() => {
    dispatch(fetchCaisses());  // Dispatche l'action pour récupérer les caisses
  }, [dispatch]);

  // Effet pour surveiller le succès de la création d'utilisateur et créer le réceptionniste
  useEffect(() => {
    if (userSuccess && selectedUser) {
      const receptionnisteData = {
        utilisateur: selectedUser.id, // Utilisation de l'ID de l'utilisateur créé
        caisse: caisse,  // Attribue la caisse sélectionnée
        utilisateur_info: {
          email,
          first_name,
          last_name,
        },
      };

      dispatch(addReceptionniste(receptionnisteData));
    }
  }, [userSuccess, selectedUser, caisse, email, first_name, last_name, dispatch]);

  // Effet pour surveiller le succès de la création du réceptionniste et rediriger
  useEffect(() => {
    if (receptionnisteSuccess === 'Réceptionniste ajouté avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
 
    }
  }, [receptionnisteSuccess, navigate]);

  // Gérer la soumission du Formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // Créer un utilisateur avant de créer le réceptionniste
    const userData = {
      email,
      first_name,
      last_name,
      groups: ['receptionniste'], // Le réceptionniste fait partie du groupe "receptionniste"
    };

    try {
      await dispatch(addUser(userData)); // Dispatche la création de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
      // setLoading(false);
    }
  };

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/personnel/receptionnistes');
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {userLoading && <Loading />}
      {receptionnisteLoading && <Loading />}

      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter un Réceptionniste
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

              {/* Caisse */}
              <Label className="mt-4">
                <span className='text-gray-200'>Caisse</span>
                <Select
                  className="mt-2"
                  value={caisse}
                  onChange={(e) => setCaisse(e.target.value)}
                >
                  <option value="">Sélectionner la caisse</option>
                  {caisses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.caisse}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                // disabled={loading}
              >
                Ajouter Réceptionniste
              </button>
            </form>
          </div>
        </main>
      </div>
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`La receptionniste été ajoutée avec succès.`}
      />
    </div>
  );
};
export default AjoutReceptionniste;
