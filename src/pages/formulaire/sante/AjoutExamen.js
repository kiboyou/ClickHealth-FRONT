import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addExamen } from '../../../Api/features/examen/examenThunks'; // À ajuster selon ton fichier de thunks
import { fetchConsultations } from '../../../Api/features/consultation/consultationThunks'; // Nouvelle action pour récupérer les consultations
import { fetchSpecialites } from '../../../Api/features/medecins/specialiteThunk'; // À ajuster si nécessaire
import Loading from '../../../utils/Loading';
import { clearSuccess } from '../../../Api/features/examen/examenSlice'; // À ajuster si nécessaire
import { fetchTypeExamens } from '../../../Api/features/examen/typeExamenThunk'; // À ajuster si nécessaire

const AjoutExamen = () => {
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  // States pour chaque champ du formulaire
  const [consultation, setConsultation] = useState('');  // Remplace "patient" par "consultation"
  const [typeExamen, setTypeExamen] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [dateExamen, setDateExamen] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Sélecteurs pour obtenir l'état des actions Redux
  const { success: examenSuccess, loading: examenLoading } = useSelector(state => state.examen);
  const { consultations } = useSelector(state => state.consultation); // Récupère les consultations à la place des patients
  const { typeExamens } = useSelector(state => state.typeExamens); // Liste des types d'examens

  // Effet pour charger les consultations et types d'examens au démarrage du composant
  useEffect(() => {
    dispatch(fetchConsultations());  // Charger les consultations
    dispatch(fetchTypeExamens());  // Charger les types d'examens
  }, [dispatch]);

  // Effet pour surveiller le succès de la création de l'examen et rediriger
  useEffect(() => {
    if (examenSuccess === 'Examen added successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/consultation/examen'); // Redirige vers la liste des examens
    }
  }, [examenSuccess, dispatch, navigate]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const examenData = {
      consultation,  // Remplace "patient" par "consultation"
      type_examen: typeExamen,
    };

    try {
      await dispatch(addExamen(examenData)); // Dispatche l'ajout de l'examen
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'examen", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
      {examenLoading && <Loading />}

      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-200">
                Ajouter un Examen
              </h1>

              {/* Consultation */}
              <Label className="mt-4">
                <span className='text-gray-200'>Consultation</span>
                <Select
                  className="mt-2"
                  value={consultation}
                  onChange={(e) => setConsultation(e.target.value)}
                  required
                >
                  <option value="">Sélectionner une consultation</option>
                  {consultations.map((c) => (
                    <option key={c.id} value={c.id}>
                      Consultation n-{c.id} de {c.patient_detail.user_detail.first_name} {c.patient_detail.user_detail.last_name}
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Type d'Examen */}
              <Label className="mt-4">
                <span className='text-gray-200'>Type d'Examen</span>
                <Select
                  className="mt-2"
                  value={typeExamen}
                  onChange={(e) => setTypeExamen(e.target.value)}
                  required
                >
                  <option value="">Sélectionner le type d'examen</option>
                  {typeExamens.map((te) => (
                    <option key={te.id} value={te.id}>
                      {te.nom} - {te.prix}€
                    </option>
                  ))}
                </Select>
              </Label>

              {/* Diagnostic */}
              {/* <Label className="mt-4">
                <span className='text-gray-200'>Diagnostic</span>
                <Input
                  className="mt-2 border-0 focus:ring-0"
                  type="text"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  required
                />
              </Label> */}

              {/* Statut */}
              {/* <Label className="mt-4">
                <span className='text-gray-200'>Statut</span>
                <Select
                  className="mt-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Sélectionner le statut</option>
                  <option value="En attente">En attente</option>
                  <option value="Terminé">Terminé</option>
                  <option value="Annulé">Annulé</option>
                </Select>
              </Label> */}

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                disabled={loading}
              >
                Ajouter Examen
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AjoutExamen;
