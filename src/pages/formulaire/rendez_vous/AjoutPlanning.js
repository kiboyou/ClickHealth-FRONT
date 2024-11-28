// import React, { useEffect, useState } from 'react';

// import { Input, Label } from '@windmill/react-ui';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import { fetchMedecins } from '../../../Api/features/medecins/medecinThunks';
// import { createPlanning } from '../../../Api/features/plannig/plannigThunks';

// import { clearSuccess } from '../../../Api/features/plannig/plannigSlice';
// import Loading from '../../../utils/Loading';

// const AjoutPlanning = () => {
//   const dispatch = useDispatch();
//   const navigate = useHistory().push;

//   const [date, setDate] = useState('');
//   const [jour, setJour] = useState('');
//   const [heure_debut, setHeureDebut] = useState('');
//   const [heure_fin, setHeureFin] = useState('');

//   const { success, plannings, loading } = useSelector((state) => state.planning)
//   const { user } = useSelector((state) => state.auth);
//   const { medecins } = useSelector((state) => state.medecins);
  
//   // Filtrer pour trouver le médecin associé à l'utilisateur connecté
//   const medecinConnecte = medecins.find((medecin) => medecin.utilisateur === user.id);

//   // Calculer le jour en fonction de la date sélectionnée
//   const calculerJour = (dateString) => {
//     const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
//     const dateObj = new Date(dateString);
//     return jours[dateObj.getDay()];
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(
//     createPlanning({
//         medecin: medecinConnecte.id,
//         date,
//         jour,
//         heure_debut,
//         heure_fin,
//       })
//     );
//   };

//   useEffect(() => {
//     dispatch(fetchMedecins());
//   }, [dispatch, medecins.length]);

  
//   useEffect(() => {
//     if (success == 'Planning created successfully') {
//       dispatch(clearSuccess()); // Réinitialiser success à null
//       navigate('/app/planning');
//     }
//   }, [dispatch, navigate, success]);

//   return (
//     <div className="px-4 py-3 mt-10 mb-8 rounded-lg">
//       {loading && <Loading />}

//       <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl flex- bg-cadre1">
//         <div className="">
//           <main className="flex items-center justify-center p-6 sm:p-12 ">
//             <div className="w-full">
//               <form onSubmit={handleSubmit}>
//                 <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
//                   Ajouter un planning
//                 </h1>

//                 <Label className="mt-4">
//                   <span>Date</span>
//                   <Input
//                     type="date"
//                     className="px-4 py-3 mt-1"
//                     onChange={(e) => {
//                       setDate(e.target.value);
//                       setJour(calculerJour(e.target.value)); // Met à jour le jour automatiquement
//                     }}
//                   />
//                 </Label>

//                 <Label className="mt-4">
//                   <span>Jour</span>
//                   <Input
//                     className="px-4 py-3 mt-1"
//                     placeholder="Jour automatique"
//                     value={jour}
//                     readOnly
//                   />
//                 </Label>

//                 <Label className="mt-4">
//                   <span>Heure de début</span>
//                   <Input
//                     type="time"
//                     className="px-4 py-3 mt-1"
//                     onChange={(e) => setHeureDebut(e.target.value)}
//                   />
//                 </Label>

//                 <Label className="mt-4">
//                   <span>Heure de fin</span>
//                   <Input
//                     type="time"
//                     className="px-4 py-3 mt-1"
//                     onChange={(e) => setHeureFin(e.target.value)}
//                   />
//                 </Label>

//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
//                 >
//                   Ajouter
//                 </button>
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AjoutPlanning;


import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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

  // Fonction pour gérer la sélection d'un créneau horaire
  const handleSelectSlot = ({ start, end }) => {
    const selectedDay = moment(start).format('dddd'); // Récupérer le jour de la semaine
    const selectedDateTime = {
      date: moment(start).format('YYYY-MM-DD'), // Date
      jour: selectedDay, // Jour de la semaine
      heureDebut: moment(start).format('HH:mm'), // Heure de début
      heureFin: moment(end).format('HH:mm'), // Heure de fin
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
    <div className="px-4 py-3 mt-10 mb-8 rounded-lg shadow-xl">
      {/* <h1 className="text-3xl font-semibold text-center">Ajouter un planning</h1> */}
      {loading && <Loading />}

      
      <button onClick={handleSubmit}
        className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
      >
        Ajouter mes plannings
      </button>

      {/* Affichage du calendrier */}
      <div className="my-6">
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
        />
      </div>

      {/* Affichage des plannings existants */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Plannings existants :</h2>
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
    </div>
  );
};

export default AjoutPlanning;


