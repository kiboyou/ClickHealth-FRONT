/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routesAdmin = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },


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
    icon: 'DiagnosticIcon',
    name: 'Santé',
    routes: [
      // submenu
      {
        path: '/app/consultation',
        name: 'Consultation',
      },
      {
        path: '/app/consultation/ordonnance',
        name: 'Ordonnance',
      },
      {
        path: '/app/consultation/prescription',
        name: 'Prescription',
      },
      {
        path: '/app/consultation/examen',
        name: 'Examen',
      },
    ],
  },
  {
    icon: 'ConfigurationIcon',
    name: 'Configuration',
    routes: [
      // submenu
      {
        path: '/app/configuration/groupes',
        name: 'Groupes',
      },

      {
        path: '/app/configuration/user', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Utilisateur', // name that appear in Sidebar
      },
      
      {
        path: '/app/configuration/type_consultation', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Type consulation', // name that appear in Sidebar
      },
       {
        path: '/app/configuration/type_examen', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Type examen', // name that appear in Sidebar
      },
      {
        path: '/app/configuration/type_ordonnance', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Type ordonnance', // name that appear in Sidebar
      },
      {
        path: '/app/configuration/medicaments', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Médicaments', // name that appear in Sidebar
      },
       {
        path: '/app/configuration/fonction', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Fonction', // name that appear in Sidebar
      },
      {
        path: '/app/configuration/specialites', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Spécialités', // name that appear in Sidebar
      },
       {
        path: '/app/configuration/caisse', // the url
        icon: 'TeamIcon', // the component being exported from icons/index.js
        name: 'Caisse', // name that appear in Sidebar
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

  //personnel routing
  {
    icon: 'TeamIcon',
    name: 'Personnels',
    routes: [
      // submenu
     
      {
        path: '/app/personnel/receptionnistes',
        name: 'Receptionnistes',
      },
      {
    path: '/app/personnel/medecin', // the url
    icon: 'DoctorIcon', // the component being exported from icons/index.js
    name: 'Medecins', // name that appear in Sidebar
  }
    ],
  },

 
]

export default routesAdmin
