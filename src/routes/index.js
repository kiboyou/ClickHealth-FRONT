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


const Vols = lazy(() => import('../pages/Vols'))
const AjoutVols = lazy(() => import('../pages/formulaire/vols/AjoutVols'))

const Patients = lazy(() => import('../pages/Patient'))
const Facturations = lazy(() => import('../pages/reception/Facturation'))
const Queues = lazy(() => import('../pages/reception/Queue'))
const Ordonnances = lazy(() => import('../pages/consultation/Ordonance'))
const Examens = lazy(() => import('../pages/consultation/Examen'))
const Groupes = lazy(() => import('../pages/configuration/Groupe'))
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
    path: '/vols', 
    component: Vols, 

  },

  {
    path: '/vols/add', 
    component: AjoutVols, 
  },
  {
    path: '/patients',
    component: Patients
  },
  // start les reception
  {
    path: '/reception/factures',
    component: Facturations
  },
  {
    path: '/reception/queue',
    component: Queues
  },
  // end reception

  //start consultation
  {
    path: '/consultation/ordonnance',
    component: Ordonnances
  },
  {
    path: '/consultation/examen',
    component: Examens
  },
  //end consultation
  //start configuration
  {
    path: '/configuration/groupes',
    component: Groupes
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