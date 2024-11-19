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

import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import PageTitle from '../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../icons';
import Loading from '../utils/Loading';

import { fetchPlannings } from '../Api/features/plannig/plannigThunks';


const Planning = () => {
  const dispatch = useDispatch()
  const { success, plannings, loading } = useSelector((state) => state.planning)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchPlannings())
  }, [dispatch])

  useEffect(() => {
    // Met à jour les données à afficher lorsque users change
    setDataTable2(plannings)
  }, [plannings])

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedPlanning = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  return (
    <>
      { loading && <Loading />}
      <PageTitle>Liste des planning</PageTitle>

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
          onClick={() => dispatch(fetchPlannings())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        <NavLink to="/app/planning/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un planning
          </button>
        </NavLink>
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Medecin</TableCell>
              <TableCell>Date de disponibilité</TableCell>
              <TableCell>Jour</TableCell>
              <TableCell>heure de debut</TableCell>
              <TableCell>heure de fin</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedPlanning.map((plannig, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{plannig.medecin_detail.utilisateur_info.first_name} {plannig.medecin_detail.utilisateur_info.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{plannig.medecin_detail.utilisateur_info.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{plannig.date}</span>
                </TableCell>
               
                <TableCell>
                  <span className="text-sm">{plannig.jour}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{plannig.heure_debut}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{plannig.heure_fin}</span>
                </TableCell>
                
                <TableCell>
                  { plannig.disponible === true ? <Badge type='success'>Disponible</Badge> : <Badge type='danger'>Indisponible</Badge> }
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

export default Planning
