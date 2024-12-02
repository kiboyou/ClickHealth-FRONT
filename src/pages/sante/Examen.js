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


const Examen = () => {
  const dispatch = useDispatch()
  const { success, examens, loading } = useSelector((state) => state.examen)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchExamens())
  }, [dispatch])

  useEffect(() => {
    // Met à jour les données à afficher lorsque users change
    setDataTable2(examens)
  }, [examens])

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
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0"
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
        
        <NavLink to="/app/consultation/examen/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un examen
          </button>
        </NavLink>
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">{examen?.consultation_detail?.patient_detail?.user_detail.first_name}  {examen?.consultation_detail?.patient_detail?.user_detail.last_name}</p>
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

export default Examen
