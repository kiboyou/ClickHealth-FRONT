import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow
} from '@windmill/react-ui';
import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { fetchPlannings } from "../Api/features/plannig/plannigThunks"; // Action Redux pour récupérer les plannings
import PageTitle from '../components/Typography/PageTitle';
import { EditIcon, TrashIcon } from '../icons';
import groupeUser from "../utils/GrourpeUser";
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
      if (user.groups[0].name === groupeUser.medecin) {
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
      title: `Planning: ${planning.date} - ${planning.heure_debut} à ${planning.heure_fin}` || "Événement sans titre",
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
          className="px-4 py-2 text-lg font-bold text-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
        >
          <ArrowPathIcon className="w-5 h-5" /> {/* Icône de rafraîchissement */}
        </button>

        {user && user.groups[0].name == groupeUser.medecin && (
          <NavLink to="/app/planning/add">
            <button className="px-4 py-2 text-lg font-bold rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
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
          <div className="my-6 text-white focus:outline-none">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={eventStyleGetter}
              style={{ height: 500, width: "100%" }}
              culture="fr"
              defaultView={Views.WEEK}
              views={{ week: true, day: true }} // Définit uniquement les vues autorisées
            />
          </div>

        <PageTitle>Liste des plannings</PageTitle>
        <TableContainer className="mb-8">
           <Table>
             <TableHeader>
               <tr>
                 {user && user.groups[0].name == groupeUser.medecin ?  <TableCell>ID</TableCell> : <TableCell>Medecin</TableCell>}
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
                  { user && user.groups[0].name == groupeUser.medecin ? <span className="text-sm">{i+1}</span> :
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
