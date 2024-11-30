/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routesReceptionniste = [
  {
    icon: 'ReceptionIcon',
    name: 'Reception',
    routes: [
      // submenu
      {
        path: '/app/reception/queue',
        name: 'File d\'attente',
      },
      {
        path: '/app/reception/factures/examens',
        name: 'Facture des Examen',
      },
      {
        path: '/app/reception/factures/rdv',
        name: 'Facture des RDV',
      },
      {
        path: '/app/reception/factures/paiement',
        name: 'Reçu de paiement',
      },
      
    ],
  },
  
  {
    path: '/app/planning', // the url
    icon: 'DiagnosticIcon',
    name: 'Planning', // name that appear in Sidebar
  },

  {
    path: '/app/rendez_vous', // the url
    icon: 'DiagnosticIcon',
    name: 'Rendez-vous', // name that appear in Sidebar
  },

  {
    path: '/app/patients', // the url
    icon: 'PatientIcon', // the component being exported from icons/index.js
    name: 'Patients', // name that appear in Sidebar
  },

  {
    path: '/app/personnel/medecin', // the url
    icon: 'DoctorIcon', // the component being exported from icons/index.js
    name: 'Medecins', // name that appear in Sidebar
  }
 
]

export default routesReceptionniste
