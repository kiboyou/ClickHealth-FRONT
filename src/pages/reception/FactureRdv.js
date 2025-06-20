import { ArrowPathIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
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

import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchFacturesRdv } from '../../Api/features/factureRdv/factureRdvThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import TableWithPagination from '../../utils/TableWithPagination';

const FactureRdv = () => {
  const dispatch = useDispatch()
  const  navigate = useHistory().push;
  
  const { user } = useSelector((state) => state.auth);
  const { success, factures, loading } = useSelector((state) => state.factureRdv)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchFacturesRdv())
  }, [dispatch])

  useEffect(() => {
    if (user && user.groups) {
      if (user.groups[0].name === groupeUser.patient) {
        // Filtrer les factures associées au patient connecté
        const facturesPatient = factures.filter(
          (facture) => facture.rendezVous_details?.patient_detail?.user === user.id
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
    navigate('/app/reception/factures/rdv/detail', {facture}); // Redirection avec les données
  };

      // Fonction pour gérer l'action Payer
  const payefacture = (facture) => {
    navigate('/app/reception/factures/paiement/add', {facture}); // Redirection avec les données
  };

  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des factures des rendez-vous</PageTitle>
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
          onClick={() => dispatch(fetchFacturesRdv())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        {/* <NavLink to="/app/patients/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une facture
          </button>
        </NavLink> */}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Patient</TableCell>
              <TableCell>Code du RDV</TableCell>
              <TableCell>Num de la facture</TableCell>
              <TableCell>Montant total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((facture, i) => (
              <TableRow key={i}>
                <TableCell>
                <div>
                    <p className="font-semibold">{facture.rendezVous_details.nom} {facture.rendezVous_details.prenom}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{facture.rendezVous_details.email}</p>
                </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{facture.rendezVous_details.code_rendez_vous}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{facture.numfacture} </span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{facture.montant}  €</span>
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

                    { user && (user.groups[0].name == groupeUser.receptionniste || user.groups[0].name == groupeUser.administrateur) && (
                    facture.statut_paiement === 'Non payé' ? (
                      <button type="button"  className="px-4 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                        onClick={() => payefacture(facture)} 
                      >
                        faire le paiement
                      </button>
                    ) : (
                      null
                    )
                  )}                    
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

export default FactureRdv
