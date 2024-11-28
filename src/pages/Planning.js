// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
// import {
//   Badge,
//   Button,
//   Input,
//   Pagination,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
//   TableRow,
// } from '@windmill/react-ui';
// import { ArrowPathIcon } from '@heroicons/react/24/outline';
// import PageTitle from '../components/Typography/PageTitle';
// import { EditIcon, SearchIcon, TrashIcon } from '../icons';
// import Loading from '../utils/Loading';
// import { fetchPlannings } from '../Api/features/plannig/plannigThunks';

// const Planning = () => {
//   const dispatch = useDispatch();
//   const { success, plannings, loading } = useSelector((state) => state.planning);
//   const { user } = useSelector((state) => state.auth);

//   const [pageTable2, setPageTable2] = useState(1);
//   const [resultsPerPage] = useState(10);

//   // Synchronise dataTable2 avec les utilisateurs une fois récupérés
//   const [dataTable2, setDataTable2] = useState([]);

//   useEffect(() => {
//     dispatch(fetchPlannings());
//   }, [dispatch, plannings.length]);

//   useEffect(() => {
//     if (user && user.groups) {
//       // Si l'utilisateur est un médecin, on filtre les plannings
//       if (user.groups[0].name == 'medecin') {
//         setDataTable2(
//           plannings.filter(
//             (planning) =>
//               planning.medecin_detail.utilisateur_info.id === user.id // Filtre par l'ID du médecin
//           )
//         );
//       } else {
//         // Si administrateur ou autre, afficher tous les plannings
//         setDataTable2(plannings);
//       }
//     }
//   }, [plannings, user]);

//   // Pagination setup
//   const totalResults = dataTable2.length;
//   const displayedPlanning = dataTable2.slice(
//     (pageTable2 - 1) * resultsPerPage,
//     pageTable2 * resultsPerPage
//   );

//   // Pagination change control
//   function onPageChangeTable2(p) {
//     setPageTable2(p);
//   }

//   return (
//     <>
//       {loading && <Loading />}
//       <PageTitle>Liste des plannings</PageTitle>

//       {/* <!-- Search input --> */}
//       <div className="flex justify-center flex-1 lg:mr-32">
//         <div className="relative w-full max-w-xl mr-6 bg-text">
//           <div className="absolute inset-y-0 flex items-center pl-2">
//             <SearchIcon className="w-4 h-4" aria-hidden="true" />
//           </div>
//           <Input
//             className="px-6 py-3 pl-8 text-gray-700 bg-white border-0 rounded-lg focus:ring-0"
//             placeholder="Search for users"
//             aria-label="Search"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           onClick={() => dispatch(fetchPlannings())}
//           className="px-4 py-2 mt-10 mb-10 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
//         >
//           <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
//         </button>

//         {user && user.groups[0].name == 'medecin' && (
//           <NavLink to="/app/planning/add">
//             <button className="px-4 py-2 mt-10 mb-10 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
//               Ajouter un planning
//             </button>
//           </NavLink>
//         )}
//       </div>

//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               {user && user.groups[0].name == 'medecin' ?  <TableCell>ID</TableCell> : <TableCell>Medecin</TableCell>}
//               <TableCell>Date de disponibilité</TableCell>
//               <TableCell>Jour</TableCell>
//               <TableCell>Heure de début</TableCell>
//               <TableCell>Heure de fin</TableCell>
//               <TableCell>Disponibilité</TableCell>
//               <TableCell>Actions</TableCell>
//             </tr>
//           </TableHeader>
//           <TableBody>
//             {displayedPlanning.map((planning, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <div className="flex items-center text-sm">
//                   { user && user.groups[0].name == 'medecin' ? <span className="text-sm">{i+1}</span> :
//                     <div>
//                       <p className="font-semibold">
//                         {planning.medecin_detail.utilisateur_info.first_name}{' '}
//                         {planning.medecin_detail.utilisateur_info.last_name}
//                       </p>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">
//                         {planning.medecin_detail.utilisateur_info.email}
//                       </p>
//                     </div>
//                   }
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{planning.date}</span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{planning.jour}</span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{planning.heure_debut}</span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{planning.heure_fin}</span>
//                 </TableCell>
//                 <TableCell>
//                   {planning.disponible === true ? (
//                     <Badge type="success">Disponible</Badge>
//                   ) : (
//                     <Badge type="danger">Indisponible</Badge>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-4">
//                     <Button layout="link" size="icon" aria-label="Edit">
//                       <EditIcon
//                         className="w-5 h-5 focus:outline-none focus:border-none"
//                         aria-hidden="true"
//                       />
//                     </Button>
//                     <Button
//                       layout="link"
//                       size="icon"
//                       aria-label="Delete"
//                       className="focus:outline-none focus:border-none"
//                     >
//                       <TrashIcon className="w-5 h-5" aria-hidden="true" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TableFooter>
//           <Pagination
//             totalResults={totalResults}
//             resultsPerPage={resultsPerPage}
//             onChange={onPageChangeTable2}
//             label="Table navigation"
//             className="mt-4 bg-color-trait"
//           />
//         </TableFooter>
//       </TableContainer>
//     </>
//   );
// };

// export default Planning;

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlannings } from "../Api/features/plannig/plannigThunks"; // Action Redux pour récupérer les plannings
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
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
  TableRow,
} from '@windmill/react-ui';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import PageTitle from '../components/Typography/PageTitle';
import { EditIcon, SearchIcon, TrashIcon } from '../icons';
import Loading from '../utils/Loading';

moment.locale("fr");
const localizer = momentLocalizer(moment);

const Planning = () => {
  const dispatch = useDispatch();

  //   // Synchronise dataTable2 avec les plannings une fois récupérés
  const [dataTable2, setDataTable2] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [resultsPerPage] = useState(10);
  
  // Récupérer les plannings depuis le store Redux
  const { plannings, loading } = useSelector((state) => state.planning);
  const { user } = useSelector((state) => state.auth);

  const [events, setEvents] = useState([]); // Pour le calendrier

  // Charger les plannings lors du montage
  useEffect(() => {
    dispatch(fetchPlannings());
  }, [dispatch]);

    useEffect(() => {
    if (user && user.groups) {
      // Si l'utilisateur est un médecin, on filtre les plannings
      if (user.groups[0].name === 'medecin') {
        setDataTable2(
          plannings.filter(
            (planning) =>
              planning.medecin_detail.utilisateur_info.id === user.id // Filtre par l'ID du médecin
          )
        );
      } else {
        // Si administrateur ou autre, afficher tous les plannings
        setDataTable2(plannings);
      }
    }
  }, [plannings, user]);

  // Transformer les plannings en format compatible avec React Big Calendar
  useEffect(() => {
    const formattedEvents = dataTable2.map((planning) => ({
      title: `Planning: ${planning.date} - ${planning.heure_debut} à ${planning.heure_fin}`,
      start: moment(`${planning.date} ${planning.heure_debut}`).toDate(),
      end: moment(`${planning.date} ${planning.heure_fin}`).toDate(),
    }));
    setEvents(formattedEvents);
  }, [dataTable2]);

    // Pagination setup
  const totalResults = dataTable2.length;
  const displayedPlanning = dataTable2.slice(
    (pageTable2 - 1) * resultsPerPage,
    pageTable2 * resultsPerPage
  );

  // Pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // Fonction pour styliser les événements
  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#003d3bc9",
      borderRadius: "4px",
      color: "#a1e455",
      fontWeight: "bold",
    },
  });

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg shadow-xl">
      {loading && <Loading />}
      <div className="flex justify-end space-x-4">
       <button
          onClick={() => dispatch(fetchPlannings())}
          className="px-4 py-2 text-lg font-bold text-white rounded-lg bg-cadre1 focus:outline-none focus:border-none sm:text-xl font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        {user && user.groups[0].name == 'medecin' && (
          <NavLink to="/app/planning/add">
            <button className="px-4 py-2 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
              Ajouter un planning
            </button>
          </NavLink>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Chargement des plannings...</p>
      ) : (
        <>
          {/* Calendrier interactif */}
          <div className="my-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={eventStyleGetter}
              style={{ height: 500, width: "100%" }}
              culture="fr"
            />
          </div>
        <PageTitle>Liste des plannings</PageTitle>
        <TableContainer className="mb-8">
           <Table>
             <TableHeader>
               <tr>
                 {user && user.groups[0].name == 'medecin' ?  <TableCell>ID</TableCell> : <TableCell>Medecin</TableCell>}
                 <TableCell>Date de disponibilité</TableCell>
                 <TableCell>Jour</TableCell>
                 <TableCell>Heure de début</TableCell>
                 <TableCell>Heure de fin</TableCell>
                 <TableCell>Disponibilité</TableCell>
                 <TableCell>Actions</TableCell>
               </tr>
             </TableHeader>
             <TableBody>
               {displayedPlanning.map((planning, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                  { user && user.groups[0].name == 'medecin' ? <span className="text-sm">{i+1}</span> :
                    <div>
                      <p className="font-semibold">
                        {planning.medecin_detail.utilisateur_info.first_name}{' '}
                        {planning.medecin_detail.utilisateur_info.last_name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {planning.medecin_detail.utilisateur_info.email}
                      </p>
                    </div>
                  }
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{planning.date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{planning.jour}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{planning.heure_debut}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{planning.heure_fin}</span>
                </TableCell>
                <TableCell>
                  {planning.disponible === true ? (
                    <Badge type="success">Disponible</Badge>
                  ) : (
                    <Badge type="danger">Indisponible</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon
                        className="w-5 h-5 focus:outline-none focus:border-none"
                        aria-hidden="true"
                      />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      className="focus:outline-none focus:border-none"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
            className="mt-4 "
          />
        </TableFooter>
      </TableContainer>
      </>
      )}
    </div>
  );
};

export default Planning;
