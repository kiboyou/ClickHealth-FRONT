 import React, { useEffect, useState } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTypeConsultation } from '../../../Api/features/consultation/typeConsultationThunk'; // Assurez-vous que ce fichier de thunk est correctement importé
import { fetchSpecialites } from '../../../Api/features/medecins/specialiteThunk'; // Assurez-vous de bien importer le bon thunk
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/consultation/typeConsultationSlice';
 import DialogSuccess from "../../../utils/dialog/DialogSuccess";

const AjoutTypeConsultation = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;  // Redirection après l'ajout
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Sélecteurs pour obtenir l'état des spécialités
  const { specialites, loading: specialitesLoading } = useSelector(state => state.specialites);
  const { success, error, loading } = useSelector(state => state.typeConsultations);

  // Champs de saisie pour le type de consultation
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [specialite, setSpecialite] = useState('');

  // Effet pour charger les spécialités au démarrage
  useEffect(() => {
    dispatch(fetchSpecialites());  // Chargez les spécialités disponibles
  }, [dispatch]);

  // Fonction de soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTypeConsultation({ nom, prix, specialite }));  // Ajouter le prix et la spécialité avec le type de consultation
  };

  // Rediriger après un ajout réussi
  useEffect(() => {
    if (success === 'Type de consultation ajouté avec succès') {
      dispatch(clearSuccess()); // Réinitialiser success à null
        setIsSuccessModalOpen(true);
    }
  }, [dispatch, navigate, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    navigate('/app/configuration/type_consultation');  // Rediriger vers la liste des types de consultations

  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {loading && <Loading />}  {/* Afficher le loader pendant le chargement */}
      
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
        <div className="">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                  Ajouter un Type de Consultation
                </h1>

                {/* Champ pour nom du type de consultation */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Nom du type de consultation</span>
                  <Input 
                    className="px-4 py-3 mt-1 border-0 focus:ring-0" 
                    placeholder="Ex : Consultation de suivi cardiaque" 
                    value={nom}
                    onChange={(e) => setNom(e.target.value)} 
                  />
                </Label>

                {/* Champ pour le prix */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Prix (€)</span>
                  <Input 
                    type="number"  // Champ de type "number" pour le prix
                    className="px-4 py-3 mt-1 border-0 focus:ring-0" 
                    placeholder="Ex : 50" 
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)} 
                  />
                </Label>

                {/* Sélecteur de spécialité */}
                <Label className="mt-4">
                  <span className='text-gray-200'>Spécialité</span>
                  <Select 
                    className="px-4 py-3 mt-1"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                    required
                  >
                    <option value="">Sélectionner une spécialité</option>
                    {specialites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nom_specialite}
                      </option>
                    ))}
                  </Select>
                </Label>

                {/* Affichage des erreurs */}
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                {/* Bouton de soumission */}
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Ajouter Type de Consultation'}
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
          message={`Le type de consultation a été ajouté avec succès.`}
      />
    </div>
  );
};

export default AjoutTypeConsultation;
