import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMedicament } from '../../../Api/features/medicaments/medicamentThunk'; // Import du thunk pour ajouter un médicament
import Loading from '../../../utils/Loading';
// import { clearSuccess } from '../../../Api/features/medicaments/medicamentSlice';

const AjoutMedicament = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout

  // Champs de saisie pour le médicament
  const [nomMedicament, setNomMedicament] = useState('');
  const [prixMedicament, setPrixMedicament] = useState('');

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.medicaments);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier que le nom et le prix sont définis avant d'envoyer la requête
    if (!nomMedicament || !prixMedicament) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // Dispatch pour ajouter le médicament
    dispatch(createMedicament({ nom: nomMedicament, prix: prixMedicament }));
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Médicament ajouté avec succès') {
      // dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/configuration/medicaments');  // Rediriger vers la liste des médicaments
    }
  }, [dispatch,success, navigate]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Ajouter un Médicament
                </h1>

                {/* Champ pour le nom du médicament */}
                <Label className="mt-4">
                  <span>Nom du médicament</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Ex : Paracétamol"
                    value={nomMedicament}
                    onChange={(e) => setNomMedicament(e.target.value)}
                  />
                </Label>

                {/* Champ pour le prix du médicament */}
                <Label className="mt-4">
                  <span>Prix du médicament (€)</span>
                  <Input
                    className="px-4 py-3 mt-1"
                    placeholder="Ex : 15.99"
                    type="number"
                    value={prixMedicament}
                    onChange={(e) => setPrixMedicament(e.target.value)}
                  />
                </Label>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                  disabled={loading}
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

export default AjoutMedicament;
