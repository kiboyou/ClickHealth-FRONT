import { ArrowPathIcon,EyeIcon } from '@heroicons/react/24/outline';
import {
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

import { NavLink,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {fetchOrdonnances, removeOrdonnance} from '../../Api/features/ordonnance/ordonnanceThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import { fetchRendezVous } from '../../Api/features/rendezVous/rendezVousThunks';
import TableWithPagination from '../../utils/TableWithPagination';
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";



const Ordonnance = () => {
  const dispatch = useDispatch()
  const { success, ordonnances, loading } = useSelector((state) => state.ordonnance)
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  const { user } = useSelector((state) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [selectedOrdonnance, setSelectedOrdonnance] = useState(null)
    const  navigate = useHistory().push;

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchOrdonnances())
    dispatch(fetchRendezVous())

  }, [dispatch])

  // useEffect(() => {
  //   // Met à jour les données à afficher lorsque users change
  //   setDataTable2(ordonnances)
  // }, [ordonnances])

  useEffect(() => {
    if (user && user.groups) {
      if (user.groups[0].name === groupeUser.medecin) {
        
        const rendezVousListPatient = rendezVousList.filter(
          (rdv) =>
            rdv.planning_detail.medecin_detail.utilisateur_info.id === user.id
        )
        
        // Étape 1: Extraire les identifiants des patients présents dans les rendez-vous
        const patientsInRendezVous = new Set(
          rendezVousListPatient.map((rdv) => rdv.patient_detail?.id)
        );
  
        // Étape 2: Filtrer les consultations pour garder celles dont les patients sont dans les rendez-vous
        const consultationsFiltered = ordonnances.filter((examen) =>
          patientsInRendezVous.has(examen.consultation_detail.patient)
        );
  
        // Résultat: consultationsFiltered contient les consultations des patients dans les rendez-vous
        setDataTable2(consultationsFiltered);
        
      } else if (user.groups[0].name === groupeUser.patient) {
        // Filtrer les consultations pour le patient connecté
        const patientConsultations = ordonnances.filter(
          (examen) =>
            examen.consultation_detail.patient &&
            examen.consultation_detail.patient_detail.user_detail.id === user.id
        );
        setDataTable2(patientConsultations);
      } else {
        // Si administrateur ou autre rôle, afficher tous les rendez-vous
        setDataTable2(ordonnances);
      }
    }
  }, [rendezVousList, ordonnances, user]);

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPatients = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

    // Fonction pour gérer l'action Voir Plus
  const handleVoirPlus = (ordonnance) => {
    navigate('/app/consultation/ordonnance/detail', {ordonnance}); // Redirection avec les données
  };

    const openDeleteModal = (consultation) => {
        setSelectedOrdonnance(consultation)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const confirmDelete = () => {
        // Suppression du groupe ici (appel API si nécessaire)
        dispatch(removeOrdonnance(selectedOrdonnance?.id))
        setIsDeleteModalOpen(false)
        setIsSuccessModalOpen(true)
    }
  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des ordonnances</PageTitle>

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
          onClick={() => dispatch(fetchOrdonnances())}
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
              <TableCell>Telephone</TableCell>
           
              <TableCell>Type de ordonnance</TableCell>
            
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((ordonnance, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{ordonnance.consultation_detail.patient_detail.user_detail.first_name} {ordonnance.consultation_detail.patient_detail.user_detail.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ordonnance.consultation_detail.patient_detail.user_detail.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{ordonnance.consultation_detail.patient_detail.telephone}</span>
                </TableCell>
              
                <TableCell>
                  <span className="text-sm">{ordonnance.type_ordonnance_detail.nom}</span>
                </TableCell>
                
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                      {/* Bouton Voir Plus */}
                    <button className="focus:outline-none focus:border-none"
                      onClick={() => handleVoirPlus(ordonnance)} // Appel de la fonction handleVoirPlus
                    >
                      <EyeIcon className="w-6 h-6 focus:outline-none focus:border-none" aria-hidden="true" />
                    </button>
                    
                    { (user.groups[0].name === groupeUser.medecin) ? (
                            <>
                              <Button layout="link" size="icon" aria-label="Edit">
                                <EditIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                              </Button>
                              <Button onClick={() => openDeleteModal(ordonnance)} layout="link" size="icon" aria-label="Delete" className="focus:outline-none focus:border-none">
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                              </Button>
                            </>
                          ) : (
                            ""
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
        <DialogConfirm
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            title={"Supprimer l'ordonnance"}
            message={`Êtes-vous sûr de vouloir supprimer l'ordonnance ${selectedOrdonnance?.id} ?`}
            onConfirm={confirmDelete}
        />
        <DialogSuccess
            open={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
            title={"Ordonnance supprimée"}
            message={`L'ordonnance ${selectedOrdonnance?.id} a été supprimée avec succès.`}
        />
    </>
  )
}

export default Ordonnance
