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
import {fetchReceptionnistes, removeReceptionniste} from '../../Api/features/receptionnistes/receptionnisteThunk';  // Import des thunks pour les réceptionnistes
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import { NavLink } from 'react-router-dom';
import groupeUser from '../../utils/GrourpeUser';
import TableWithPagination from '../../utils/TableWithPagination';
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";
import {removeMedecin} from "../../Api/features/medecins/medecinThunks";

const Receptionniste = () => {
  const dispatch = useDispatch();
  const { success, receptionnistes, loading } = useSelector((state) => state.receptionnistes);  // Utilisation de l'état des réceptionnistes
  const { user } = useSelector((state) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedReceptionniste, setSelectedReceptionniste] = useState(null)

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation avec les données récupérées des réceptionnistes
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchReceptionnistes());  // Charge les réceptionnistes au premier rendu
  }, [dispatch]);

  useEffect(() => {
      console.log(receptionnistes);  
    // Met à jour les données de la table lorsque `receptionnistes` est modifié
    setDataTable(receptionnistes);
  }, [receptionnistes]);

  // Configuration de la pagination
  const totalResults = dataTable.length;
  const displayedReceptionnistes = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Changer de page dans la pagination
  function onPageChange(p) {
    setPageTable(p);
  }
  const openDeleteModal = (receptionniste) => {
    setSelectedReceptionniste(receptionniste)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeReceptionniste(selectedReceptionniste?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des Réceptionnistes</PageTitle>

      {/* Zone de recherche */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher un réceptionniste"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons de gestion */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchReceptionnistes())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

      {user && user.groups[0].name == groupeUser.administrateur && (
        <NavLink to="/app/personnel/receptionniste/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un réceptionniste
          </button>
        </NavLink>
      )}
      </div>

      {/* Table des réceptionnistes */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Nom</TableCell>
              <TableCell>Caisse</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedReceptionnistes.map((receptionniste, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{receptionniste.utilisateur_info?.first_name} {receptionniste.utilisateur_info?.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{receptionniste.utilisateur_info?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{receptionniste.caisse_detail?.caisse }</span>   
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button onClick={() => openDeleteModal(receptionniste)} layout="link" size="icon" aria-label="Delete">
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
            onPageChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
      <DialogConfirm
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title={"Supprimer la receptionniste"}
          message={`Êtes-vous sûr de vouloir supprimer la receptionniste ${selectedReceptionniste?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Receptionnitse supprimée"}
          message={`La Receptionnitse ${selectedReceptionniste?.id} a été supprimée avec succès.`}
      />
    </>
  );
};

export default Receptionniste;
