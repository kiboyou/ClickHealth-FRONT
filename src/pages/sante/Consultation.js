import { ArrowPathIcon } from '@heroicons/react/24/outline';
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

import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchConsultations } from '../../Api/features/consultation/consultationThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import { fetchRendezVous } from '../../Api/features/rendezVous/rendezVousThunks';




const Consultation = () => {
  const dispatch = useDispatch()
  const { success, consultations, loading } = useSelector((state) => state.consultation)
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  
  const { user } = useSelector((state) => state.auth);

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchConsultations())
    dispatch(fetchRendezVous())

  }, [dispatch])

  // useEffect(() => {
  //   // Met à jour les données à afficher lorsque users change
  //   setDataTable2(consultations)
  // }, [consultations])

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
        const consultationsFiltered = consultations.filter((consultation) =>
          patientsInRendezVous.has(consultation.patient)
        );
  
        // Résultat: consultationsFiltered contient les consultations des patients dans les rendez-vous
        setDataTable2(consultationsFiltered);
        
      } else if (user.groups[0].name === groupeUser.patient) {
        // Filtrer les consultations pour le patient connecté
        const patientConsultations = consultations.filter(
          (consultation) =>
            consultation.patient &&
            consultation.patient_detail.user_detail.id === user.id
        );
        setDataTable2(patientConsultations);
      } else {
        // Si administrateur ou autre rôle, afficher tous les rendez-vous
        setDataTable2(consultations);
      }
    }
  }, [rendezVousList, consultations, user]);
  

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPatients = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

    const formatDate = (dateString) => {
  const date = new Date(dateString);
  //const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('fr-FR'  ); // Ici, 'fr-FR' pour un format français
}
  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des consultations</PageTitle>

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
          onClick={() => dispatch(fetchConsultations())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        {user && user.groups[0].name == groupeUser.medecin && (
        <NavLink to="/app/consultation/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une consultation
          </button>
        </NavLink>
        )}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Patient</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Specialite</TableCell>
              <TableCell>Type de consultation</TableCell>
              <TableCell>Date consultation</TableCell>
              <TableCell>Diagnostic</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((consultation, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{consultation.patient_detail.user_detail.first_name} {consultation.patient_detail.user_detail.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{consultation.patient_detail.user_detail.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.patient_detail.telephone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.type_consultation_detail.specialite_detail.nom_specialite}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.type_consultation_detail.nom}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(consultation.date_consultation)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.diagnostic}</span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" >
                      <EditIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" className="focus:outline-none focus:border-none">
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
            onChange={onPageChangeTable2}
            label="Table navigation"
            className="mt-4 bg-color-trait"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Consultation
