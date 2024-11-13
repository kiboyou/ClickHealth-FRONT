/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
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
        path: '/app/reception/factures',
        name: 'Facturation',
      },
      {
        path: '/app/reception/queue',
        name: 'File d\'attente',
      },
    ],
  },
  {
    icon: 'DiagnosticIcon',
    name: 'Consulation',
    routes: [
      // submenu
      {
        path: '/app/consultation/ordonnance',
        name: 'Ordornance',
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
      
    ],
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
        path: '/app/personnel/specialites',
        name: 'Specialites',
      },
      {
        path: '/app/personnel/receptionnistes',
        name: 'Receptionnistes',
      },
    ],
  },
  // {
  //   path: '/app/avion', // the url
  //   icon: 'ModalsIcon', // the component being exported from icons/index.js
  //   name: 'Avion', // name that appear in Sidebar
  // },

  // {
  //   path: '/app/reservation', // the url
  //   icon: 'ModalsIcon', // the component being exported from icons/index.js
  //   name: 'Reservation', // name that appear in Sidebar
  // },

  // {
  //   path: '/app/personne', // the url
  //   icon: 'ModalsIcon', // the component being exported from icons/index.js
  //   name: 'Personne', // name that appear in Sidebar
  // },

  // {
  //   path: '/app/conges', // the url
  //   icon: 'ModalsIcon', // the component being exported from icons/index.js
  //   name: 'Conges', // name that appear in Sidebar
  // },

  // {
  //   path: '/app/notification', // the url
  //   icon: 'ModalsIcon', // the component being exported from icons/index.js
  //   name: 'Notification', // name that appear in Sidebar
  // },


  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create new account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot my password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404 Page',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank Page',
  //     },
  //   ],
  // },
]

export default routes
