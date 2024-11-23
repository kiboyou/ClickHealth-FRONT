import { lazy } from 'react'


// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))


const Planning = lazy(() => import('../pages/Planning'))
const AjoutPlanning = lazy(() => import('../pages/formulaire/rendez_vous/AjoutPlanning'))

const User = lazy(() => import('../pages/configuration/User'))
const AjoutUser = lazy(() => import('../pages/formulaire/personnel/AjoutUser'))

const RendezVous = lazy(() => import('../pages/RendezVous'))
const AjoutRDV = lazy(() => import('../pages/formulaire/rendez_vous/AjoutRDV'))
const UpdateRendezVous = lazy(() => import('../pages/formulaire/rendez_vous/UpdateRendezVous'))

// const AjoutRendezVous = lazy(() => import('../pages/formulaire/rendez_vous/AjoutRendezVous'))

const Patients = lazy(() => import('../pages/Patient'))
const AjoutPatient = lazy(() => import('../pages/formulaire/patient/AjoutPatient'))


//reception
const FacturationsExamen = lazy(() => import('../pages/reception/FactureExamen'))
const FacturationsRdv = lazy(() => import('../pages/reception/FactureRdv'))
const Queues = lazy(() => import('../pages/reception/Queue'))

//sante
const Consultations = lazy(() => import('../pages/sante/Consultation'))
const Ordonnances = lazy(() => import('../pages/sante/Ordonnance'))
const Examens = lazy(() => import('../pages/sante/Examen'))
const Prescriptions = lazy(() => import('../pages/sante/Prescription'))


const Groupe = lazy(() => import('../pages/configuration/Groupe'))
const AjoutGroupe = lazy(() => import('../pages/formulaire/groupe/AjoutGroupe'))

const Specialites = lazy(() => import('../pages/personnel/Specialiste'))
const Receptionnistes = lazy(() => import('../pages/personnel/Receptionniste'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [ 
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },

  {
    path: '/configuration/user', 
    component: User, 

  },

  {
    path: '/configuration/user/add', 
    component: AjoutUser, 

  },

  {
    path: '/planning', 
    component: Planning, 
  },

  {
    path: '/planning/add', 
    component: AjoutPlanning, 
  },

  {
    path: '/rendez_vous', 
    component: RendezVous, 
  },

  {
    path: '/rendez_vous/add', 
    component: AjoutRDV, 
  },

  {
    path: '/patients',
    component: Patients
  },

  {
    path: '/patients/add',
    component: AjoutPatient
  },

  // start les reception
  {
    path: '/reception/factures/examens',
    component: FacturationsExamen
  },

  {
    path: '/reception/factures/examens/add',
    component: FacturationsExamen
  },

  {
    path: '/reception/factures/rdv',
    component: FacturationsRdv
  },

  {
    path: '/reception/factures/rdv/add',
    component: FacturationsRdv
  },

  {
    path: '/reception/queue',
    component: Queues
  },
  // end reception

  //start consultation

  {
    path: '/consultation/',
    component: Consultations
  },

  {
    path: '/consultation/add',
    component: Ordonnances
  },

  {
    path: '/consultation/ordonnance',
    component: Ordonnances
  },

  {
    path: '/consultation/ordonnance/add',
    component: Ordonnances
  },

  {
    path: '/consultation/prescription',
    component: Prescriptions
  },

  {
    path: '/consultation/prescription/add',
    component: Ordonnances
  },

  {
    path: '/consultation/examen',
    component: Examens
  },

  {
    path: '/consultation/examen/add',
    component: Examens
  },


  //end consultation
  //start configuration
  {
    path: '/configuration/groupes',
    component: Groupe
  },

  {
    path: '/configuration/groupes/add', 
    component: AjoutGroupe, 

  },

  //end configuration

  //start personnel path
  {
    path: '/personnel/specialites',
    component: Specialites
  },
  {
    path: '/personnel/receptionnistes',
    component: Receptionnistes
  },



  //end personnel path

  // {
  //   path: '/forms',
  //   component: Forms,
  // },
  // {
  //   path: '/cards',
  //   component: Cards,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  // {
  //   path: '/buttons',
  //   component: Buttons,
  // },
  // {
  //   path: '/modals',
  //   component: Modals,
  // },
  // {
  //   path: '/tables',
  //   component: Tables,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes