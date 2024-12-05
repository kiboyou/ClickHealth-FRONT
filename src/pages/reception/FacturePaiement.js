import { ArrowPathIcon, EyeIcon } from '@heroicons/react/24/outline';
import {
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

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchPaiements } from '../../Api/features/paiement/paiementThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { SearchIcon } from '../../icons';
import groupeUser from '../../utils/GrourpeUser';
import Loading from '../../utils/Loading';
import TableWithPagination from '../../utils/TableWithPagination';


const FacturePaiement = () => {
  const dispatch = useDispatch()
  const  navigate = useHistory().push;
  
  const { user } = useSelector((state) => state.auth);
  const { success, paiements, loading } = useSelector((state) => state.paiement)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchPaiements())
  }, [dispatch])

  useEffect(() => {
    if (user && user.groups) {
      if (user.groups[0].name === groupeUser.patient) {
        // Filtrer les paiements associées au patient connecté
        const paiementsPatient = paiements.filter(
          (paiement) => paiement.facture?.patient_detail?.user_detail.id === user.id
        );
        setDataTable2(paiementsPatient);
      } else {
        // Sinon, afficher toutes les paiements
        setDataTable2(paiements);
      }
    }
  }, [dispatch, paiements, user]);
  

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPatients = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // Fonction pour gérer l'action Voir Plus
  const handleVoirPlus = (paiement) => {
    navigate('/app/reception/factures/paiement/detail', {paiement}); // Redirection avec les données
  };


  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des reçus de paiement</PageTitle>
      {console.log(dataTable2)}
      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Search for users"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchPaiements())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Patient</TableCell>
              <TableCell>Code de paiement</TableCell>
              <TableCell>Montant total</TableCell>
              <TableCell>Montant reçu</TableCell>
              <TableCell>Montant retourne</TableCell>
              <TableCell>Date de paiement</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((paiement, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {
                      paiement.facture?.patient ? (
                        <div>
                          <p className="font-semibold">{paiement.facture?.patient_detail.user_detail.first_name} {paiement.facture?.patient_detail.user_detail.last_name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{paiement.facture?.patient_detail.user_detail.email}</p>
                        </div>
                      ) 
                      :
                      (
                        <div>
                          <p className="font-semibold">{paiement.facture?.rendezVous_details.nom} {paiement.facture?.rendezVous_details.prenom}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{paiement.facture?.rendezVous_details.email}</p>
                        </div>
                      )
                    }
                   </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{paiement.reference_paiement} </span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{paiement.facture?.montant}  €</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{paiement.montant}  €</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{paiement.montant_restant}  €</span>
                </TableCell>

                <TableCell>
                <span className="text-sm">
                  {new Date(paiement.date_paiement).toLocaleDateString('fr-FR')}
                </span>

                </TableCell>
                
                <TableCell>
                <div className="flex items-center space-x-4">
                  {/* Bouton Voir Plus */}
                  <button className="focus:outline-none focus:border-none"
                    onClick={() => handleVoirPlus(paiement)} // Appel de la fonction handleVoirPlus
                  >
                    <EyeIcon className="w-6 h-6 focus:outline-none focus:border-none" aria-hidden="true" />
                  </button>
                  
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
  <TableWithPagination
    totalResults={totalResults}
    resultsPerPage={resultsPerPage}
    onPageChange={onPageChangeTable2}
  />
</TableFooter>
      </TableContainer>
    </>
  )
}

export default FacturePaiement
