import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addFonction } from '../../../Api/features/medecins/fonctionThunk'; // Import du thunk
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/medecins/fonctionSlice';
import DialogSuccess from "../../../utils/dialog/DialogSuccess";

const AjoutFonction = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout

  // Champs de saisie pour la fonction
  const [nomFonction, setNomFonction] = useState('');

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.fonctions);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Fonction de soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFonction({ nom_fonction: nomFonction }));
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Fonction ajoutée avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
    }
  }, [dispatch, navigate, success]);

// Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/configuration/fonction');  // Rediriger vers la liste des fonctions

  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                  Ajouter une Fonction
                </h1>

                <Label className="mt-4">
                  <span className='text-gray-200'>Nom de la fonction</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    placeholder="Ex : Médecin Généraliste"
                    onChange={(e) => setNomFonction(e.target.value)}
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
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`La fonction a été ajoutée avec succès.`}
      />
    </div>
  );
};

export default AjoutFonction;
