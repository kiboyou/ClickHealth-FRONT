import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Label, Input, Button } from '@windmill/react-ui';
import ImageLight from '../../assets/img/update.jpg';
import ImageDark from '../../assets/img/update.jpg';

import { fetchRendezVousByCode } from '../../Api/features/rendezVous/rendezVousThunks';
import Loading from '../../utils/Loading';
import DialogSuccess from "../../utils/dialog/DialogSuccess";

function VerifieRendezVous() {
  const [codeRDV, setCodeRDV] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { success, loading, error } = useSelector((state) => state.rendezVous);


  // Fonction de soumission du Formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel de l'action pour vérifier le code de rendez-vous
    dispatch(fetchRendezVousByCode(codeRDV));
  };
  
  useEffect(() => {
    // Si le code est valide, rediriger vers la page de mise à jour
    if (success === 'rdv fetched successfully') {
        setIsSuccessModalOpen(true);
    }
  }, [history, success]);

  // Gestion de la fermeture du dialog
  const handleCloseDialog = () => {
    setIsSuccessModalOpen(false);
    history.push(`/rendez_vous_update`);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      {loading && <Loading />}
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-cadre1">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-2xl font-semibold text-center text-gray-200">
                  Vérification du rendez-vous
                </h1>

                <Label>
                  <span className="text-gray-200">Entrer le code du rendez-vous</span>
                  <Input
                    className="px-4 py-3 mt-1 border-0 focus:ring-0"
                    type="text"
                    placeholder="OUATT-12989"
                    onChange={(e) => setCodeRDV(e.target.value)}
                    value={codeRDV}
                  />
                </Label>

                {error && (
                  <div className="mt-4 text-center text-white-500">Le code n'exist pas ...</div>
                )}

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
      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={handleCloseDialog}
          title={"Succès"}
          message={`Le code du RDV a été ajouté avec succès.`}
          small_message={"Vous allez être redirigé vers la page de mise à jour du rendez-vous."}
      />
    </div>
  );
}

export default VerifieRendezVous;
