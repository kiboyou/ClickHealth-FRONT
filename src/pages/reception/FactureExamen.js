import { ArrowPathIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Badge,
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

import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchFacturesExamen } from '../../Api/features/factureExamen/factureExamenThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { SearchIcon } from '../../icons';
import Loading from '../../utils/Loading';


const FactureExamen = () => {
  const dispatch = useDispatch()
  const  navigate = useHistory().push;
  
  const { user } = useSelector((state) => state.auth);
  const { success, factures, loading } = useSelector((state) => state.factureExamen)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchFacturesExamen())
  }, [dispatch])

  useEffect(() => {
    if (user && user.groups) {
      if (user.groups[0].name === 'patient') {
        // Filtrer les factures associées au patient connecté
        const facturesPatient = factures.filter(
          (facture) => facture.patient_detail.user_detail.id === user.id
        );
        setDataTable2(facturesPatient);
      } else {
        // Sinon, afficher toutes les factures
        setDataTable2(factures);
      }
    }
  }, [factures, user]);
  

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPatients = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // Fonction pour gérer l'action Voir Plus
  const handleVoirPlus = (facture) => {
    navigate('/app/reception/factures/examens/detail', {facture}); // Redirection avec les données
  };

  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des factures</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0"
            placeholder="Search for users"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchFacturesExamen())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        {user && user.groups[0].name == 'receptionniste' &&
        
        <NavLink to="/app/reception/factures/examens/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une facture
          </button>
        </NavLink>
        }
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Patient</TableCell>
              <TableCell>Montant total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((facture, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{facture.patient_detail.user_detail.first_name} {facture.patient_detail.user_detail.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{facture.patient_detail.user_detail.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{facture.total_montant}  €</span>
                </TableCell>
                
                <TableCell>
                  {facture.statut_paiement === 'Payé' ? (
                    <Badge type="success">Payé</Badge>
                  ) : facture.statut_paiement === 'Non payé' ? (
                    <Badge type="danger">Non payé</Badge>
                  ) : (
                    <Badge type="warning">En attente</Badge>
                  )}
                </TableCell>
                
                <TableCell>
                <div className="flex items-center space-x-4">
                  {/* Bouton Voir Plus */}
                  <button className="focus:outline-none focus:border-none"
                    onClick={() => handleVoirPlus(facture)} // Appel de la fonction handleVoirPlus
                  >
                    <EyeIcon className="w-6 h-6 focus:outline-none focus:border-none" aria-hidden="true" />
                  </button>

                  {/* Bouton Modifier */}
                  <button layout="link" size="icon" aria-label="Modifier" className="focus:outline-none focus:border-none">
                    <PencilIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                  </button>

                  {/* Bouton Supprimer */}
                  <button layout="link" size="icon" aria-label="Supprimer" className="focus:outline-none focus:border-none">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  
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
            onChange={onPageChangeTable2}
            label="Table navigation"
            className="mt-4 bg-color-trait"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default FactureExamen
