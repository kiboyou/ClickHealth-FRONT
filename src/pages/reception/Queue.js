import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
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
import { editPatient, fetchQueue, removePatient } from '../../Api/features/fileAttente/fileAttenteThunks';

import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import PageTitle from '../../components/Typography/PageTitle';
import { SearchIcon } from '../../icons';
import Loading from '../../utils/Loading';
import groupeUser from '../../utils/GrourpeUser';
import TableWithPagination from '../../utils/TableWithPagination';

const Queue = () => {
  const dispatch = useDispatch();
  const { queue, loading } = useSelector((state) => state.fileAttente);
  const { user } = useSelector((state) => state.auth);

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronise dataTable avec les données de la file d'attente une fois récupérées
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch, queue.length]);

  useEffect(() => {
    // Met à jour les données à afficher lorsque queue change
    setDataTable(queue);
  }, [queue]);

  // Pagination setup
  const totalResults = dataTable.length;
  const displayedQueue = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

    // Update the status of a patient
    const handleUpdateStatus = (id, status) => {
      dispatch(editPatient({ 
        id : id, 
        patient: { 
          "status": status 
        } 
      }));
    };
  
    // Remove a patient from the queue
    const handleDelete = (id) => {
      dispatch(removePatient(id));
    };

  return (
    <>
      {loading && <Loading />}
      <PageTitle>File d'attente</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
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

      {user && (user.groups[0].name == groupeUser.receptionniste || user.groups[0].name == groupeUser.administrateur) && (
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
                      <p className="font-semibold">{i+1}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{entry.patient_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{entry.patient_email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">
                      {entry.created_at ? new Date(entry.created_at).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        // hour: '2-digit',
                        // minute: '2-digit',
                        // second: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {entry.heure_arrivee ? new Date(entry.created_at).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </TableCell>

                  <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold text-blue-700">{entry.status}</p>
                    </div>
                  </div>
                  </TableCell>
                
                <TableCell>
                <div className="space-x-2 actions">
                  <button
                    onClick={() => handleUpdateStatus(entry.id, "En consultation")}
                    className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:border-none"
                  >
                    En Consultation
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(entry.id, "Terminé")}
                    className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:border-none"
                  >
                    Terminé
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:border-none"
                  >
                    Supprimer
                  </button>
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
    </>
  );
};

export default Queue;
