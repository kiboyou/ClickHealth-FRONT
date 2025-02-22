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
import { NavLink } from 'react-router-dom'
import {fetchCaisses, removeCaisse} from '../../Api/features/receptionnistes/caisseThunk'
import PageTitle from '../../components/Typography/PageTitle'
import { EditIcon, SearchIcon, TrashIcon } from '../../icons'
import Loading from '../../utils/Loading' 
import TableWithPagination from '../../utils/TableWithPagination'
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";

const Caisse = () => {
  const dispatch = useDispatch()
  const { success, caisses, loading } = useSelector((state) => state.caisses)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedCaisse, setSelectedCaisse] = useState(null)

  const [pageTable, setPageTable] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronisation des données avec celles des caisses récupérées
  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    dispatch(fetchCaisses()) // Déclenche l'action pour récupérer les caisses
  }, [dispatch])

  useEffect(() => {
    // Met à jour les données à afficher lorsque caisses change
    setDataTable(caisses)
  }, [caisses])

  // Pagination setup
  const totalResults = dataTable.length
  const displayedCaisses = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)

  // Fonction pour gérer la pagination
  function onPageChangeTable(p) {
    setPageTable(p)
  }
  const openDeleteModal = (groupe) => {
    setSelectedCaisse(groupe)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeCaisse(selectedCaisse?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }
  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des Caisses</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            {/* Icône de recherche */}
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher une caisse"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons pour rafraîchir ou ajouter une caisse */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchCaisses())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        <NavLink to="/app/configuration/caisse/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une caisse
          </button>
        </NavLink>
      </div>

      {/* Table pour afficher les caisses */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Caisse ID</TableCell>
              <TableCell>Nom de la caisse</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedCaisses.map((caisse, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1} </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{caisse.caisse}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* Modifier une caisse */}
                    <NavLink to={`/app/configuration/caisses/edit/${caisse.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </NavLink>

                    {/* Supprimer une caisse */}
                    <Button onClick={() => openDeleteModal(caisse)} layout="link" size="icon" aria-label="Delete">
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
            onPageChange={onPageChangeTable}
          />
        </TableFooter>
      </TableContainer>
      <DialogConfirm
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title={"Supprimer la caisse"}
          message={`Êtes-vous sûr de vouloir supprimer la caisse ${selectedCaisse?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Caisse supprimée"}
          message={`La caisse ${selectedCaisse?.id} a été supprimée avec succès.`}
      />
    </>
  )
}

export default Caisse
