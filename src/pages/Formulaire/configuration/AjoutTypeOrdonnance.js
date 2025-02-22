import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTypeOrdonnance } from '../../../Api/features/ordonnance/typeOrdonnanceThunk'; // Assurez-vous que ce fichier de thunk est correctement importé
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/ordonnance/typeOrdonnanceSlice';
import DialogSuccess from "../../../utils/dialog/DialogSuccess"; // Assurez-vous que ce fichier de tranche est correctement importé

const AjoutTypeOrdonnance = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Champs de saisie pour le type d'ordonnance
  const [nomTypeOrdonnance, setNomTypeOrdonnance] = useState('');

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.typeOrdonnances);

  // Fonction de soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTypeOrdonnance({ nom: nomTypeOrdonnance }));
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Type d\'ordonnance ajouté avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
    }
  }, [dispatch, navigate, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/configuration/type_ordonnance');  // Rediriger vers la liste des types d'ordonnances

  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}  {/* Afficher le loader pendant le chargement */}
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                  Ajouter un Type d'Ordonnance
                </h1>
                
                {/* Champ pour nom du type d'ordonnance */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Nom du type d'ordonnance</span>
                  <Input 
                    className="px-4 py-3 mt-1 border-0 focus:ring-0" 
                    placeholder="Ex : Ordonnance médicale" 
                    value={nomTypeOrdonnance}
                    onChange={(e) => setNomTypeOrdonnance(e.target.value)} 
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
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`Le type d'ordonnance a été ajouté avec succès.`}
      />
    </div>
  );
};

export default AjoutTypeOrdonnance;
