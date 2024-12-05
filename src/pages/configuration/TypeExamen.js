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
import { fetchTypeExamens } from '../../Api/features/examen/typeExamenThunk'; // Assurez-vous que le thunk est bien défini
import PageTitle from '../../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../../icons';
import Loading from '../../utils/Loading';
import TableWithPagination from '../../utils/TableWithPagination';

const TypeExamen = () => {
  const dispatch = useDispatch();
  const { success, typeExamens, loading } = useSelector((state) => state.typeExamens);

  const [pageTable, setPageTable] = useState(1);
  const [resultsPerPage] = useState(10);

  // Synchronisation des données avec celles des types d'examen récupérés
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    dispatch(fetchTypeExamens()); // Déclenche l'action pour récupérer les types d'examen
  }, [dispatch]);

  useEffect(() => {
    // Met à jour les données à afficher lorsque typeExamens change
    setDataTable(typeExamens);
  }, [typeExamens]);

  // Pagination setup
  const totalResults = dataTable.length;
  const displayedTypeExamens = dataTable.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

  // Fonction pour gérer la pagination
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  return (
    <>
      {loading && <Loading />}
      <PageTitle>Liste des types d'examen</PageTitle>

      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 bg-text">
          <div className="absolute inset-y-0 flex items-center pl-2">
            {/* Icône de recherche */}
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0 border-0 focus:ring-0"
            placeholder="Rechercher un type d'examen"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Boutons pour rafraîchir ou ajouter un type d'examen */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch(fetchTypeExamens())}
          className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        <NavLink to="/app/configuration/type_examen/add">
          <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
            Ajouter un type d'examen
          </button>
        </NavLink>
      </div>

      {/* Table pour afficher les types d'examen */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-gray-900">
            <tr>
              <TableCell>Examen ID</TableCell>
              <TableCell>Nom du type d'examen</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedTypeExamens.map((examen, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{examen.nom}</span> {/* Utilisation de nom pour le type d'examen */}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{examen.prix} €</span> {/* Affichage du prix de l'examen */}
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* Modifier un type d'examen */}
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>

                    {/* Supprimer un type d'examen */}
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
    onPageChange={onPageChangeTable}
  />
</TableFooter>
      </TableContainer>
    </>
  );
};

export default TypeExamen;
