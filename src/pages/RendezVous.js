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

import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PageTitle from '../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../icons';
import Loading from '../utils/Loading';

import { clearSuccess } from '../Api/features/rendezVous/rendezVousSlice';
import { fetchRendezVous, fetchRendezVousByCode } from '../Api/features/rendezVous/rendezVousThunks';


const RendezVous = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { success, rendezVousList, loading } = useSelector((state) => state.rendezVous)
  const { user } = useSelector((state) => state.auth);


  
  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchRendezVous())
  }, [dispatch, rendezVousList.length])

  useEffect(() => {
    if (user && user.groups) {
      if (user.groups[0].name === 'medecin') {
        // Filtrer les rendez-vous pour le médecin connecté
        setDataTable2(
          rendezVousList.filter(
            (rdv) =>
              rdv.planning_detail.medecin_detail.utilisateur_info.id === user.id
          )
        );
      } else if (user.groups[0].name === 'patient') {
        // Filtrer les rendez-vous pour le patient connecté
        setDataTable2(
          rendezVousList.filter(
            (rdv) => rdv.patient_detail && rdv.patient_detail.user_detail.id === user.id
          )
        );
      } else {
        // Si administrateur ou autre rôle, afficher tous les rendez-vous
        setDataTable2(rendezVousList);
      }
    }
  }, [rendezVousList, user]);
  

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedRendezVous = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // Fonction de soumission du formulaire
  const handleSubmit = async (codeRDV) => {
    try {
      // Appel de l'action Redux pour vérifier le code de rendez-vous
      await dispatch(fetchRendezVousByCode(codeRDV));
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    // Si le code est valide, rediriger vers la page de mise à jour
    if (success === 'rdv fetched successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      // Si le code est validé avec succès
      history.push(`/app/patients/add`);
    } else {
      // Gérer les erreurs ou un état non valide
      console.error("Échec de la validation du code de rendez-vous");
    }
  }, [history, success]);
    
    

  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des rendez-vous</PageTitle>

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
          onClick={() => dispatch(fetchRendezVous())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        { user && user.groups[0].name == 'patient' && (
        <NavLink to="/app/rendez_vous/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un rendez-vous
          </button>
        </NavLink>
      )}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {
                user && user.groups[0].name == 'patient' ? <TableCell>Medecin</TableCell> : <TableCell>Patient</TableCell>
              }
              <TableCell>Code du RDV</TableCell>
              <TableCell>Date du rendez-vous</TableCell>
              <TableCell>Jour</TableCell>
              <TableCell>heure de debut</TableCell>
              <TableCell>heure de fin</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedRendezVous.map((rdv, i) => (
              <TableRow key={i}>
                
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      {/* Condition pour vérifier si les détails du patient existent */}
                      {rdv.patient ? (
                      <>
                        {user && user.groups[0].name === 'patient' ? (
                          <div>
                            <p className="font-semibold">
                              {rdv.planning_detail.medecin_detail.utilisateur_info.first_name} {rdv.planning_detail.medecin_detail.utilisateur_info.last_name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {rdv.planning_detail.medecin_detail.utilisateur_info.email}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold">
                              {rdv.patient_detail.user_detail.first_name} {rdv.patient_detail.user_detail.last_name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {rdv.patient_detail.user_detail.email} - {rdv.patient_detail.telephone}
                            </p>
                          </div>
                        )}
                      </>
                      ) : (
                        /* Si les détails n'existent pas, afficher autre chose */
                        <>
                          <p className="font-semibold">
                              {rdv.nom} {rdv.prenom}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {rdv.email} - {rdv.telephone}
                            </p>
                        </>
                      )}
                    </div>
                  </div>
                </TableCell>
              
                <TableCell>
                  <Badge type='success'>{rdv.code_rendez_vous}</Badge>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{rdv.planning_detail.date}</span>
                </TableCell>
               
                <TableCell>
                  <span className="text-sm">{rdv.planning_detail.jour}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rdv.planning_detail.heure_debut}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rdv.planning_detail.heure_fin}</span>
                </TableCell>
                
                <TableCell>
                {rdv.patient ? (
                  <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit" >
                    <EditIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Delete" className="focus:outline-none focus:border-none">
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    { user && user.groups[0].name == 'receptionniste' ? (
                      <button type="button" onClick={() => handleSubmit(rdv.code_rendez_vous)} className="px-4 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
                        ajouter le patient
                      </button>
                    ):(
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Edit" >
                          <EditIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete" className="focus:outline-none focus:border-none">
                          <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                
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

export default RendezVous