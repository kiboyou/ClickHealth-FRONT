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
import { fetchPatients } from '../Api/features/patient/patientThunks';

import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import PageTitle from '../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../icons';
import Loading from '../utils/Loading';
import { fetchRendezVous } from '../Api/features/rendezVous/rendezVousThunks';
import groupeUser from '../utils/GrourpeUser';


const Patient = () => {
  const dispatch = useDispatch()
  const { success, patients, loading } = useSelector((state) => state.patient)
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  const { user } = useSelector((state) => state.auth);

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchRendezVous());
  }, [dispatch]);
  
  useEffect(() => {
    if (user && user.groups) {
      // Si l'utilisateur est un médecin
      if (user.groups[0].name === groupeUser.medecin) {
        const filteredRendezVous = rendezVousList.filter(
          (rdv) =>
            rdv.planning_detail.medecin_detail.utilisateur_info.id === user.id // Filtre les rendez-vous par médecin
        );
  
        // Extraire les patients correspondant aux rendez-vous filtrés
        const filteredPatients = patients.filter((patient) =>
          filteredRendezVous.some(
            (rdv) =>
              rdv.patient && rdv.patient_detail.id === patient.id // Vérifie si le patient du rendez-vous est dans la liste des patients
          )
        );
  
        setDataTable2(filteredPatients); // Met à jour les données affichées avec les patients filtrés
      } else {
        // Si administrateur ou autre rôle, afficher tous les patients
        setDataTable2(patients);
      }
    }
  }, [rendezVousList, patients, user]);
  

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPatients = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des patients</PageTitle>

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
          onClick={() => dispatch(fetchPatients())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        
        {user && user.groups[0].name == groupeUser.receptionniste || user.groups[0].name == groupeUser.administrateur && (
          
          <NavLink to="/app/patients/add">
            <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
              Ajouter un patient
            </button>
          </NavLink>
        )}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Sexe</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Profession</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((patient, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{patient.user_detail.first_name} {patient.user_detail.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{patient.user_detail.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{patient.telephone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{patient.date_naissance}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{patient.sexe}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{patient.ville}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{patient.adresse}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{patient.profession}</span>
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

export default Patient
