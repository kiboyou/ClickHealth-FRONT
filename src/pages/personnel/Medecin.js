 import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow
} from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedecins } from '../../Api/features/medecins/medecinThunks';  // Import des thunks pour les médecins
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
//import DropdownButton from '../../utils/DropdownButton';
import Loading from '../../utils/Loading';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const Medecin = () => {
  const dispatch = useDispatch();
  const { success, medecins, loading } = useSelector((state) => state.medecins);  // Utilisation de l'état des médecins

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation avec les données récupérées des médecins
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchMedecins());  // Charge les médecins au premier rendu
  }, [dispatch]);

  useEffect(() => {
    console.log(medecins); 
    // Met à jour les données de la table lorsque `medecins` est modifié
    setDataTable(medecins);
  }, [medecins]);

  // Configuration de la pagination
  const totalResults = dataTable.length;
  const displayedMedecins = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Changer de page dans la pagination
  function onPageChange(p) {
    setPageTable(p);
  }

  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des Médecins</PageTitle>

      {/* Zone de recherche */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0"
            placeholder="Search for medecins"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons de gestion */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchMedecins())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
          
        </button>
      
        {/* <DropdownButton />  Bouton de menu déroulant pour actions supplémentaires */}
       <NavLink to="/app/personnel/medecin/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un medecin
          </button>
        </NavLink>
 
     
      </div>

      {/* Table des médecins */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom</TableCell>
              <TableCell>Fonction</TableCell>
              <TableCell>Spécialité</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedMedecins.map((medecin, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{medecin.utilisateur_info?.first_name} {medecin.utilisateur_info?.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{medecin.utilisateur_info?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{medecin.fonction_detail?.nom_fonction}</span>  {/* Affichage de la fonction du médecin */}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{medecin.specialite_detail?.nom_specialite}</span>  {/* Affichage de la spécialité */}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
            className="mt-4 bg-color-trait"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Medecin;



