import { ArrowPathIcon } from '@heroicons/react/24/outline'
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
} from '@windmill/react-ui'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { fetchGroups } from '../Api/features/groupe/groupeThunks'
import PageTitle from '../components/Typography/PageTitle'
import { EditIcon, SearchIcon, TrashIcon } from '../icons'
import Loading from '../utils/Loading'

const Groupe = () => {
  const dispatch = useDispatch()
  const { success, groups, loading } = useSelector((state) => state.groupe)

  const [pageTable2, setPageTable2] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronise dataTable2 avec les utilisateurs une fois récupérés
  const [dataTable2, setDataTable2] = useState([])

  useEffect(() => {
    dispatch(fetchGroups())
  }, [dispatch])

  useEffect(() => {
    // Met à jour les données à afficher lorsque users change
    setDataTable2(groups)
  }, [groups])

  // Pagination setup
  const totalResults = dataTable2.length
  const displayedUsers = dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  return (
    <>
      { loading && <Loading/>}
      <PageTitle>Liste des groupes</PageTitle>

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
          onClick={() => dispatch(fetchGroups())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>
        
        <NavLink to="/app/configuration/groupes/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un groupe
          </button>
        </NavLink>
      </div>


      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>groupe ID</TableCell>
              <TableCell>Nom du groupe</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedUsers.map((groupe, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                   
                    <div>
                      <p className="font-semibold">{i+1} </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{groupe.name}</span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
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

export default Groupe
