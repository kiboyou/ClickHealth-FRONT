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
import { fetchExamens } from '../../Api/features/examen/examenThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import { fetchRendezVous } from '../../Api/features/rendezVous/rendezVousThunks';
import TableWithPagination from '../../utils/TableWithPagination';




const Examen = () => {
  const dispatch = useDispatch()
  const { success, examens, loading } = useSelector((state) => state.examen)
  const { rendezVousList } = useSelector((state) => state.rendezVous)

  const { user } = useSelector((state) => state.auth);


  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchExamens())
    dispatch(fetchRendezVous())

  }, [dispatch])

  // useEffect(() => {
  //   // Met à jour les données à afficher lorsque users change
  //   setDataTable2(examens)
  // }, [examens])

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
        const consultationsFiltered = examens.filter((examen) =>
          patientsInRendezVous.has(examen.consultation_detail.patient)
        );
  
        // Résultat: consultationsFiltered contient les consultations des patients dans les rendez-vous
        setDataTable2(consultationsFiltered);
        
      } else if (user.groups[0].name === groupeUser.patient) {
        // Filtrer les consultations pour le patient connecté
        const patientConsultations = examens.filter(
          (examen) =>
            examen.consultation_detail.patient &&
            examen.consultation_detail.patient_detail.user_detail.id === user.id
        );
        setDataTable2(patientConsultations);
      } else {
        // Si administrateur ou autre rôle, afficher tous les rendez-vous
        setDataTable2(examens);
      }
    }
  }, [rendezVousList, examens, user]);

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
      <PageTitle>Liste des examens</PageTitle>
      {console.log(examens)
      }
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
          onClick={() => dispatch(fetchExamens())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        {user && user.groups[0].name == groupeUser.medecin && (
        <NavLink to="/app/consultation/examen/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un examen
          </button>
        </NavLink>
        )}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Patient</TableCell>
              <TableCell>Telephone</TableCell>
              {/* <TableCell>Specialite</TableCell> */}
              <TableCell>Type d'examen</TableCell>
              <TableCell>Date de la examen</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((examen, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      {/* <p className="font-semibold">{examen.consultation_detail.patient_detail.user_detail.first_name} {examen.consultation_detail.patient_detail.user_detail.last_name}</p> */}
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{examen?.consultation_detail?.patient_detail?.user_detail.first_name}  {examen?.consultation_detail?.patient_detail?.user_detail.last_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{examen.consultation_detail.patient_detail.telephone}</span>
                </TableCell>
                {/* <TableCell>
                  <span className="text-sm">{examen.type_examen_detail.specialite_detail.nom_specialite}</span>
                </TableCell> */}
                <TableCell>
                  <span className="text-sm">{examen.type_examen_detail.nom}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{formatDate(examen.date_examen)}</span>
                </TableCell>
                {/* <TableCell>
                  <span className="text-sm">{examen.resultat}</span>
                </TableCell> */}
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                  { (user.groups[0].name === groupeUser.medecin) ? (
                            <>
                              <Button layout="link" size="icon" aria-label="Edit">
                                <EditIcon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" />
                              </Button>
                              <Button layout="link" size="icon" aria-label="Delete" className="focus:outline-none focus:border-none">
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                              </Button>
                            </>
                          ) : (
                            "-"
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

export default Examen
