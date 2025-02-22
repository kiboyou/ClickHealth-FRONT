import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editPatient,
  fetchQueue,
  removePatient,
} from "../../Api/features/fileAttente/fileAttenteThunks";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import PageTitle from "../../components/Typography/PageTitle";
import { SearchIcon } from "../../icons";
import Loading from "../../utils/Loading";
import groupeUser from "../../utils/GrourpeUser";
import TableWithPagination from "../../utils/TableWithPagination";
import {removeGroup} from "../../Api/features/groupe/groupeThunks";
import DialogConfirm from "../../utils/dialog/DialogConfirm";
import DialogSuccess from "../../utils/dialog/DialogSuccess";

const Queue = () => {
  const dispatch = useDispatch();
  const { queue, loading } = useSelector((state) => state.fileAttente);
  const { user } = useSelector((state) => state.auth);

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation des données
  const [dataTable, setDataTable] = useState([]);

  // Modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedQueue, setSelectedQueue] = useState(null)


  // Tri les données en plaçant les "Terminé" à la fin
  const sortQueue = (queue) => {
    return [...queue].sort((a, b) => {
      if (a.status === "Terminé" && b.status !== "Terminé") return 1;
      if (a.status !== "Terminé" && b.status === "Terminé") return -1;
      return 0;
    });
  };

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch, queue.length]);

  useEffect(() => {
    setDataTable(sortQueue(queue)); // Trier les données au chargement
  }, [queue]);

  // Pagination setup
  const totalResults = dataTable.length;
  const displayedQueue = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  );

  // Pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  // Mise à jour du statut d'un patient
  const handleUpdateStatus = (id, status) => {
    dispatch(
      editPatient({
        id,
        patient: {
          status,
        },
      })
    );

    setDataTable((prevDataTable) => {
      const updatedTable = prevDataTable.map((entry) =>
        entry.id === id ? { ...entry, status } : entry
      );
      return sortQueue(updatedTable); // Tri après mise à jour
    });
  };


  const openDeleteModal = (queue) => {
    setSelectedQueue(queue)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    // Suppression du groupe ici (appel API si nécessaire)
    dispatch(removeGroup(selectedQueue))
    setDataTable((prevDataTable) =>
        prevDataTable.filter((entry) => entry.id !== selectedQueue)
    );
    setIsDeleteModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  return (
    <>
      {loading && <Loading />}
      <PageTitle>File d'attente</PageTitle>

      {/* Barre de recherche */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0"
            placeholder="Rechercher dans la file"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchQueue())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" />
        </button>

        {user &&
          (user.groups[0].name === groupeUser.receptionniste ||
            user.groups[0].name === groupeUser.administrateur) && (
            <NavLink to="/app/reception/queue/add">
              <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
                Ajouter à la file
              </button>
            </NavLink>
          )}
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Position</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date d'entrée</TableCell>
              <TableCell>Heure d'entrée</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedQueue.map((entry, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i + 1}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{entry.patient_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {entry.patient_email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {entry.created_at
                      ? new Date(entry.created_at).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {entry.heure_arrivee
                      ? new Date(entry.created_at).toLocaleTimeString("fr-FR")
                      : "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p
                        className={`px-2 py-1 font-semibold text-white rounded-full ${
                          entry.status === "En consultation"
                            ? "bg-yellow-800"
                            : entry.status === "Terminé"
                            ? "bg-green-800"
                            : "bg-blue-700"
                        }`}
                      >
                        {entry.status}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-x-2 actions">
                    {entry.status === "En attente" && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(entry.id, "En consultation")
                          }
                          className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:border-none"
                        >
                          En Consultation
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(entry.id, "Terminé")
                          }
                          className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:border-none"
                        >
                          Terminé
                        </button>
                        <button
                          onClick={() => openDeleteModal(entry.id)}
                          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:border-none"
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                    {entry.status === "En consultation" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(entry.id, "Terminé")
                        }
                        className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:border-none"
                      >
                        Terminé
                      </button>
                    )}
                    {entry.status === "Terminé" && (
                      <button
                        onClick={() => openDeleteModal(entry.id)}
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:border-none"
                      >
                        Supprimer
                      </button>
                    )}
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
          title={"Supprimer la file d'attente"}
          message={`Êtes-vous sûr de vouloir supprimer cette file d'attente ?`}
          onConfirm={confirmDelete}
      />

      <DialogSuccess
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title={"File d'attente supprimé"}
          message={`La file d'attente a été supprimée avec succès.`}
      />
    </>
  );
};

export default Queue;
