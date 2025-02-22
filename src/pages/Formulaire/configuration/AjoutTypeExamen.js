 import React, { useEffect, useState } from 'react';
import { Input, Label } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTypeExamen } from '../../../Api/features/examen/typeExamenThunk'; // Assurez-vous que ce fichier de thunk est correctement importé
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/examen/typeExamenSlice';
 import DialogSuccess from "../../../utils/dialog/DialogSuccess";

const AjoutTypeExamen = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Champs de saisie pour le type d'examen
  const [nomTypeExamen, setNomTypeExamen] = useState('');
  const [prix, setPrix] = useState('');  // Champ pour le prix

  // Sélectionner l'état de Redux pour savoir si l'ajout a réussi
  const { success, error, loading } = useSelector((state) => state.typeExamens);

  // Fonction de soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTypeExamen({ nom: nomTypeExamen, prix : prix }));  // Ajouter le prix avec le type d'examen
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Type d\'examen ajouté avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
    }
  }, [dispatch, navigate, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/configuration/type_examen');  // Rediriger vers la liste des types d'examens

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
                  Ajouter un Type d'Examen
                </h1>
                
                {/* Champ pour nom du type d'examen */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Nom du type d'examen</span>
                  <Input 
                    className="px-4 py-3 mt-1 border-0 focus:ring-0" 
                    placeholder="Ex : Examen médical" 
                    value={nomTypeExamen}
                    onChange={(e) => setNomTypeExamen(e.target.value)} 
                  />
                </Label>

                {/* Champ pour le prix */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Prix de l'examen</span>
                  <Input 
                    type="number"  // Champ de type "number" pour le prix
                    className="px-4 py-3 mt-1 border-0 focus:ring-0" 
                    placeholder="Ex : 50" 
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)} 
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
          message={`Le type d'examen a été ajouté avec succès.`}
      />
    </div>
  );
};

export default AjoutTypeExamen;
