import { ArrowPathIcon ,EyeIcon, PencilIcon} from '@heroicons/react/24/outline';
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
import { fetchPrescriptions } from '../../Api/features/prescription/prescriptionThunks';
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import { fetchRendezVous } from '../../Api/features/rendezVous/rendezVousThunks';



const Prescription = () => {
  const dispatch = useDispatch()
  const { success, prescriptions, loading } = useSelector((state) => state.prescription)
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  const { user } = useSelector((state) => state.auth);

  
  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchPrescriptions())
    dispatch(fetchRendezVous())

  }, [dispatch])

  // useEffect(() => {
  //   // Met à jour les données à afficher lorsque users change
  //   setDataTable2(prescriptions)
  // }, [prescriptions])

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
        const consultationsFiltered = prescriptions.filter((prescription) =>
          patientsInRendezVous.has(prescription.ordonnance_detail.consultation_detail.patient)
        );
  
        // Résultat: consultationsFiltered contient les consultations des patients dans les rendez-vous
        setDataTable2(consultationsFiltered);
        
      } else {
        // Si administrateur ou autre rôle, afficher tous les rendez-vous
        setDataTable2(prescriptions);
      }
    }
  }, [rendezVousList, prescriptions, user]);

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
      <PageTitle>Liste des prescriptions</PageTitle>

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
          onClick={() => dispatch(fetchPrescriptions())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        {user && user.groups[0].name == groupeUser.medecin && (
        <NavLink to="/app/consultation/prescription/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une prescription
          </button>
        </NavLink>
        )}
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Ordonnance</TableCell>
              <TableCell>Medicament</TableCell>
              <TableCell>posologie</TableCell>
              <TableCell>quantite</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPatients.map((prescription, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">Ordonnance n-{prescription.ordonnance_detail.id} de {prescription.ordonnance_detail.consultation_detail.patient_detail.user_detail.first_name}  {prescription.ordonnance_detail.consultation_detail.patient_detail.user_detail.last_name}</p>
    
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{prescription.medicament_detail.nom}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{prescription.posologie}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{prescription.quantite}</span>
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

export default Prescription
