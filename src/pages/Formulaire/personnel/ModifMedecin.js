import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getFonctions } from '../../services/fonctionService';  // Service pour récupérer les fonctions
import { getSpecialites } from '../../services/specialiteService';  // Service pour récupérer les spécialités
import { getMedecinById, updateMedecin } from '../../services/medecinService';  // Service pour récupérer et mettre à jour le médecin
import { Label, Input, Select, Button } from '@windmill/react-ui';  // Composants UI
import Loading from '../../utils/Loading';

const ModificationMedecin = () => {
  const { id } = useParams();  // ID du médecin dans l'URL
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [fonction, setFonction] = useState('');
  const [specialite, setSpecialite] = useState('');
  
  const [fonctions, setFonctions] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // Récupération des fonctions et spécialités
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedFonctions = await getFonctions();
        const fetchedSpecialites = await getSpecialites();
        setFonctions(fetchedFonctions);
        setSpecialites(fetchedSpecialites);
      } catch (error) {
        console.error("Erreur de récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Récupération des données du médecin à modifier
  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const medecin = await getMedecinById(id);
        setEmail(medecin.utilisateur_info?.email || '');
        setFirst_name(medecin.utilisateur_info?.first_name || '');
        setLast_name(medecin.utilisateur_info?.last_name || '');
        setFonction(medecin.fonction_detail?.id || '');
        setSpecialite(medecin.specialite_detail?.id || '');
      } catch (error) {
        console.error("Erreur de récupération du médecin:", error);
      }
    };
    fetchMedecin();
  }, [id]);

  // Gestion de la soumission du Formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const medecinData = {
      email,
      first_name,
      last_name,
      fonction,
      specialite
    };

    try {
      await updateMedecin(id, medecinData);  // Met à jour le médecin
      history.push('/app/medecins');  // Redirige vers la liste des médecins
    } catch (error) {
      console.error("Erreur lors de la soumission du Formulaire:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading && <Loading />}
      <h1 className="text-2xl font-semibold">Modifier Médecin</h1>

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Email */}
        <Label>
          <span className='text-gray-200'>Email</span>
          <Input
            className="mt-2 border-0 focus:ring-0"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            onChange={(e) => setFirst_name(e.target.value)}
            required
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
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </Label>

        {/* Fonction */}
        <Label className="mt-4">
          <span className='text-gray-200'>Fonction</span>
          <Select
            className="mt-2"
            value={fonction}
            onChange={(e) => setFonction(e.target.value)}
            required
          >
            <option value="">Sélectionner la fonction</option>
            {fonctions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom_fonction}
              </option>
            ))}
          </Select>
        </Label>

        {/* Spécialité */}
        <Label className="mt-4">
          <span className='text-gray-200'>Spécialité</span>
          <Select
            className="mt-2"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            required
          >
            <option value="">Sélectionner la spécialité</option>
            {specialites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nom_specialite}
              </option>
            ))}
          </Select>
        </Label>

        {/* Bouton de soumission */}
        <Button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          Mettre à jour
        </Button>
      </form>
    </div>
  );
};

export default ModificationMedecin;
