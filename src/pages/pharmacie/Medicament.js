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
import {deleteMedicament, fetchMedicaments} from '../../Api/features/medicaments/medicamentThunk'; // Importer le thunk des médicaments
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import TableWithPagination from '../../utils/TableWithPagination';
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";
import {removeGroup} from "../../Api/features/groupe/groupeThunks";

const Medicament = () => {
  const dispatch = useDispatch();
  const { medicaments, loading } = useSelector((state) => state.medicaments);  // Utilisation de l'état des médicaments

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedMedicament, setSelectedMedicament] = useState(null)

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation avec les données récupérées des médicaments
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchMedicaments());  // Charge les médicaments au premier rendu
  }, [dispatch]);

  useEffect(() => {
    setDataTable(medicaments);  // Met à jour les données de la table lorsque `medicaments` change
  }, [medicaments]);

  // Configuration de la pagination
  const totalResults = dataTable.length;
  const displayedMedicaments = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Changer de page dans la pagination
  function onPageChange(p) {
    setPageTable(p);
  }

  const openDeleteModal = (pharmacie) => {
    setSelectedMedicament(pharmacie)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {

    dispatch(deleteMedicament(selectedMedicament?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des Médicaments</PageTitle>

      {/* Zone de recherche */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher un médicament"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons de gestion */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchMedicaments())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        {/* Bouton d'ajout de médicament */}
        <NavLink to="/app/pharmacie/medicaments/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un médicament
          </button>
        </NavLink>
      </div>

      {/* Table des médicaments */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedMedicaments.map((medicament, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1}</p>
                      {/* Affiche d'autres informations si besoin */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{medicament.nom}</p>
                      {/* Affiche d'autres informations si besoin */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{medicament.prix} €</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button onClick={() => openDeleteModal(medicament)} layout="link" size="icon" aria-label="Delete">
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
          title={"Supprimer le medicament"}
          message={`Êtes-vous sûr de vouloir supprimer le medicament ${selectedMedicament?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Medicament supprimé"}
          message={`Le medicament ${selectedMedicament?.id} a été supprimé avec succès.`}
      />
    </>
  );
};

export default Medicament;
