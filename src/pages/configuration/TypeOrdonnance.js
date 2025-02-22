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
import { NavLink } from 'react-router-dom';
import {fetchTypeOrdonnances, removeTypeOrdonnance} from '../../Api/features/ordonnance/typeOrdonnanceThunk'; // Assurez-vous que le thunk est bien défini
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import TableWithPagination from '../../utils/TableWithPagination';
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";

const TypeOrdonnance = () => {
  const dispatch = useDispatch();
  const { success, typeOrdonnances, loading } = useSelector((state) => state.typeOrdonnances);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedTypeOr, setSelectedTypeOr] = useState(null)

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation des données avec celles des types d'ordonnances récupérés
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchTypeOrdonnances()); // Déclenche l'action pour récupérer les types d'ordonnances
  }, [dispatch]);

  useEffect(() => {
    // Met à jour les données à afficher lorsque typeOrdonnances change
    setDataTable(typeOrdonnances);
  }, [typeOrdonnances]);

  // Pagination setup
  const totalResults = dataTable.length;
  const displayedTypeOrdonnances = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Fonction pour gérer la pagination
  function onPageChangeTable(p) {
    setPageTable(p);
  }
  const openDeleteModal = (groupe) => {
    setSelectedTypeOr(groupe)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeTypeOrdonnance(selectedTypeOr?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }
  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des types d'ordonnances</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            {/* Icône de recherche */}
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher un type d'ordonnance"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons pour rafraîchir ou ajouter un type d'ordonnance */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchTypeOrdonnances())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        <NavLink to="/app/configuration/type_ordonnances/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un type d'ordonnance
          </button>
        </NavLink>
      </div>

      {/* Table pour afficher les types d'ordonnances */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Type Ordonnance ID</TableCell>
              <TableCell>Nom du type d'ordonnance</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedTypeOrdonnances.map((type, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1} </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{type.nom}</span> {/* Utilisation de nom_type_ordonnance */}
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* Modifier un type d'ordonnance */}
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>

                    {/* Supprimer un type d'ordonnance */}
                    <Button onClick={() => openDeleteModal(type)} layout="link" size="icon" aria-label="Delete">
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
          title={"Supprimer le type d'ordonnance"}
          message={`Êtes-vous sûr de vouloir supprimer le type d'ordonnance ${selectedTypeOr?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Type d'ordonnance supprimé"}
          message={`Le type d'ordonnance ${selectedTypeOr?.id} a été supprimé avec succès.`}
      />
    </>
  );
};

export default TypeOrdonnance;
