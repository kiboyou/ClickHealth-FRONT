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
import {fetchSpecialites, removeSpecialite} from '../../Api/features/medecins/specialiteThunk' // Assure-toi d'avoir ce fichier
import PageTitle from '../../components/Typography/PageTitle'
import { EditIcon, SearchIcon, TrashIcon } from '../../icons'
import Loading from '../../utils/Loading'
import TableWithPagination from '../../utils/TableWithPagination'
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";

const Specialite = () => {
  const dispatch = useDispatch()
  const { success, specialites, loading } = useSelector((state) => state.specialites)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedSpecialite, setSelectedSpecialite] = useState(null)

  const [pageTable, setPageTable] = useState(1)
  const [resultsPerPage] = useState(10)

  // Synchronisation des données avec celles des spécialités récupérées
  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    dispatch(fetchSpecialites()) // Déclenche l'action pour récupérer les spécialités
  }, [dispatch])

  useEffect(() => {
    // Met à jour les données à afficher lorsque specialites change
    setDataTable(specialites)
  }, [specialites])

  // Pagination setup
  const totalResults = dataTable.length
  const displayedSpecialites = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)

  // Fonction pour gérer la pagination
  function onPageChangeTable(p) {
    setPageTable(p)
  }
  const openDeleteModal = (groupe) => {
    setSelectedSpecialite(groupe)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeSpecialite(selectedSpecialite?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }
  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des spécialités</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            {/* Icone de recherche */}
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher une spécialité"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons pour rafraîchir ou ajouter une spécialité */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchSpecialites())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        <NavLink to="/app/configuration/specialites/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter une spécialité
          </button>
        </NavLink>
      </div>

      {/* Table pour afficher les spécialités */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Spécialité ID</TableCell>
              <TableCell>Nom de la spécialité</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedSpecialites.map((specialite, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1} </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{specialite.nom_specialite}</span> {/* Utilisation de nom_specialite */}
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* Modifier une spécialité */}
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>

                    {/* Supprimer une spécialité */}
                    <Button onClick={() => openDeleteModal(specialite)} layout="link" size="icon" aria-label="Delete">
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
          title={"Supprimer la spécialité"}
          message={`Êtes-vous sûr de vouloir supprimer la spécialité ${selectedSpecialite?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Spécialité supprimeé"}
          message={`Le Spécialité ${selectedSpecialite?.id} a été supprimée avec succès.`}
      />
    </>
  )
}

export default Specialite
