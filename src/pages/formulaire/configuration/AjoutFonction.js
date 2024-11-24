import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addFonction } from '../../../Api/features/medecins/fonctionThunk'; // Import du thunk
import Loading from '../../../utils/Loading';

const AjoutFonction = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout

  // Champs de saisie pour la fonction
  const [nomFonction, setNomFonction] = useState('');

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.fonctions);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFonction({ nom_fonction: nomFonction }));
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Fonction ajoutée avec succès') {
      navigate('/app/configuration/fonction');  // Rediriger vers la liste des fonctions
    }
  }, [dispatch, navigate, success]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Ajouter une Fonction
                </h1>

                <Label className="mt-4">
                  <span>Nom de la fonction</span>
                  <Input
                    className="px-4 py-3 mt-1"
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
    </div>
  );
};

export default AjoutFonction;
