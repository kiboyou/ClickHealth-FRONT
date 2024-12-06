import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchMedecins } from '../../../Api/features/medecins/medecinThunks';
import { clearSuccess } from '../../../Api/features/plannig/plannigSlice';
import { createPlanning } from '../../../Api/features/plannig/plannigThunks';
import Loading from '../../../utils/Loading';


// Configurer moment pour utiliser le français
moment.locale('fr');

// Localizer pour React Big Calendar
const localizer = momentLocalizer(moment);

const AjoutPlanning = () => {
  const [events, setEvents] = useState([]); // Liste des événements
  const [selectedDate, setSelectedDate] = useState(null); // Date et heure sélectionnées
  const dispatch = useDispatch();
  const navigate = useHistory().push;

  //   const { user } = useSelector((state) => state.auth);
  const { success, plannings, loading } = useSelector((state) => state.planning)
  const { medecins } = useSelector((state) => state.medecins);
  const { user } = useSelector((state) => state.auth);

  
//   // Filtrer pour trouver le médecin associé à l'utilisateur connecté
  const medecinConnecte = medecins.find((medecin) => medecin.utilisateur === user.id);

  useEffect(() => {
    dispatch(fetchMedecins());
  }, [dispatch, medecins.length]);

//   // Gestion de la sélection des créneaux horaires
  const handleSelectSlot = ({ start, end }) => {
    const now = new Date(); // Date actuelle
    if (moment(start).isBefore(now, "day")) {
      alert("Vous ne pouvez pas sélectionner une date passée !");
      return;
    }

    const selectedDay = moment(start).format("dddd");
    const selectedDateTime = {
      date: moment(start).format("YYYY-MM-DD"),
      jour: selectedDay,
      heureDebut: moment(start).format("HH:mm"),
      heureFin: moment(end).format("HH:mm"),
    };

    // Vérifier si un événement existe déjà pour cette plage horaire
    const existingEventIndex = events.findIndex(
      (event) =>
        moment(event.start).isSame(moment(start), 'minute') &&
        moment(event.end).isSame(moment(end), 'minute')
    );

    if (existingEventIndex !== -1) {
      // Si un événement existe déjà, désélectionner (supprimer l'événement)
      const updatedEvents = events.filter((_, index) => index !== existingEventIndex);
      setEvents(updatedEvents); // Mettre à jour la liste des événements
      setSelectedDate(null); // Réinitialiser la sélection
    } else {
      // Ajouter un nouvel événement à la liste
      const newEvent = {
        title: `Planning: ${selectedDateTime.date} - ${selectedDateTime.heureDebut} à ${selectedDateTime.heureFin}`,
        start: moment(selectedDateTime.date + ' ' + selectedDateTime.heureDebut).toDate(),
        end: moment(selectedDateTime.date + ' ' + selectedDateTime.heureFin).toDate(),
      };

      setEvents([...events, newEvent]); // Ajouter l'événement au calendrier
      setSelectedDate(selectedDateTime); // Stocker les informations de la sélection
    }
  };

  // Personnalisation de l'événement (par exemple, couleur)
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#003d3bc9', // Couleur d'arrière-plan
        borderRadius: '4px',
        color: '#a1e455', // Couleur du texte
        fontWeight: 'bold',
      },
    };
  };

  // Fonction pour supprimer un événement
  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const handleSubmit = () => {
    events.forEach((event) => {
      dispatch(
        createPlanning({
          medecin: medecinConnecte.id,
          date: moment(event.start).format('YYYY-MM-DD'),
          jour: moment(event.start).format('dddd'),
          heure_debut: moment(event.start).format('HH:mm'),
          heure_fin: moment(event.end).format('HH:mm'),
        })
      );
    });
  };
  
    
  useEffect(() => {
    if (success == 'Planning created successfully') {
      dispatch(clearSuccess()); // Réinitialiser success à null
      navigate('/app/planning');
    }
  }, [dispatch, navigate, success]);

  return (
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg ">
      {/* <h1 className="text-3xl font-semibold text-center">Ajouter un planning</h1> */}
      {loading && <Loading />}

      
      <button onClick={handleSubmit}
        className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
      >
        Ajouter mes plannings
      </button>

      {/* Affichage des plannings existants */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-300">Plannings existants :</h2>
        <table className="w-full mt-4 border border-gray-200 table-auto">
          <thead>
            <tr style={{ backgroundColor: '#003d3bc9', color: '#a1e455' }}>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Jour</th>
              <th className="px-4 py-2 border">Heure de début</th>
              <th className="px-4 py-2 border">Heure de fin</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className="text-center"
                style={{
                  backgroundColor: '#003d3bc9' , // Alternance de couleurs
                  color: '#a1e455',
                }}
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{moment(event.start).format('YYYY-MM-DD')}</td>
                <td className="px-4 py-2 border">{moment(event.start).format('dddd')}</td>
                <td className="px-4 py-2 border">{moment(event.start).format('HH:mm')}</td>
                <td className="px-4 py-2 border">{moment(event.end).format('HH:mm')}</td>
                <td className="px-4 py-2 bg-white border">
                  <button
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleDeleteEvent(event)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage du calendrier */}
      <div className="my-6 mt-10 focus:outline-none">
        <Calendar
          localizer={localizer}
          events={events} // Affichage des événements
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot} // Permet la sélection d'un créneau horaire
          eventPropGetter={eventStyleGetter} // Applique un style personnalisé à l'événement
          style={{ height: 500, width: '100%' }}
          culture="fr" // Utiliser la culture française pour le calendrier
          views={{ week: true, day: true }} // Définit uniquement les vues autorisées
          defaultView={Views.WEEK}
          popup={true} // Affiche les événements en pop-up lors de la sélection
          min={new Date()} // Empêche la sélection avant aujourd'hui
          messages={{
            today: "Aujourd'hui",
            previous: "Précédent",
            next: "Suivant",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
          }} // Traduction en français

        />
      </div>
    </div>
  );
};

export default AjoutPlanning;
