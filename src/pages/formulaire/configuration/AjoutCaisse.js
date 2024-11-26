import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCaisse } from '../../../Api/features/receptionnistes/caisseThunk'; // Import du thunk
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/receptionnistes/caisseSlice';

const AjoutCaisse = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout

  // Champs de saisie pour la caisse
  const [nomCaisse, setNomCaisse] = useState('');
  

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.caisses);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCaisse({caisse: nomCaisse }));
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Caisse ajoutée avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/configuration/caisse');  // Rediriger vers la liste des caisses
    }
  }, [dispatch, navigate, success]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}  {/* Afficher le loader pendant le chargement */}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Ajouter une Caisse
                </h1>

                {/* Champ pour le nom de la caisse */}
                <Label className="mt-4">
                  <span>Nom de la Caisse</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Ex : Caisse 00X"
                    value={nomCaisse}
                    onChange={(e) => setNomCaisse(e.target.value)}
                  />
                </Label>
 

                {/* Afficher les erreurs, si elles existent */}
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                {/* Bouton de soumission */}
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

export default AjoutCaisse;
