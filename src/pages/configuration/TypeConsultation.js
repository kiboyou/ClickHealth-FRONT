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
import {fetchTypeConsultations, removeTypeConsultation} from '../../Api/features/consultation/typeConsultationThunk'; // Assurez-vous que le thunk est bien défini
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import { NavLink } from 'react-router-dom';
import TableWithPagination from '../../utils/TableWithPagination';
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";

const TypeConsultation = () => {
  const dispatch = useDispatch();
  const { success, typeConsultations, loading } = useSelector((state) => state.typeConsultations);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedTypeC, setSelectedTypeC] = useState(null)

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation avec les données récupérées des types de consultations
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchTypeConsultations());  // Charge les types de consultations au premier rendu
  }, [dispatch]);

  useEffect(() => {
    // Met à jour les données de la table lorsque `typeConsultations` est modifié
    setDataTable(typeConsultations);
  }, [typeConsultations]);

  // Configuration de la pagination
  const totalResults = dataTable.length;
  const displayedTypeConsultations = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Changer de page dans la pagination
  function onPageChange(p) {
    setPageTable(p);
  }
  const openDeleteModal = (groupe) => {
    setSelectedTypeC(groupe)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeTypeConsultation(selectedTypeC?.id))
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }
  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des Types de Consultation</PageTitle>

      {/* Zone de recherche */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher un type de consultation"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons de gestion */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchTypeConsultations())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        <NavLink to="/app/configuration/type_consultation/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un type de consultation
          </button>
        </NavLink>
      </div>

      {/* Table des types de consultations */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Nom du Type de Consultation</TableCell>
              <TableCell>Spécialité</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedTypeConsultations.map((consultation, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.nom}</span> {/* Affichage du nom du type de consultation */}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.specialite_detail?.nom_specialite}</span> {/* Affichage de la spécialité */}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{consultation.prix} €</span> {/* Affichage du prix */}
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* Modifier un type de consultation */}
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>

                    {/* Supprimer un type de consultation */}
                    <Button onClick={() => openDeleteModal(consultation)} layout="link" size="icon" aria-label="Delete">
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
          title={"Supprimer le type de consultation"}
          message={`Êtes-vous sûr de vouloir supprimer le type de consultation ${selectedTypeC?.id} ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"Type de consultation supprimé"}
          message={`Le type de consultation ${selectedTypeC?.id} a été supprimé avec succès.`}
      />
    </>
  );
};

export default TypeConsultation;
