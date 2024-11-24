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


const User = lazy(() => import('../pages/configuration/User'))
const AjoutUser = lazy(() => import('../pages/formulaire/personnel/AjoutUser'))

const Planning = lazy(() => import('../pages/Planning'))
const AjoutPlanning = lazy(() => import('../pages/formulaire/rendez_vous/AjoutPlanning'))


const AjoutRDV = lazy(() => import('../pages/formulaire/rendez_vous/AjoutRDV'))
const UpdateRendezVous = lazy(() => import('../pages/formulaire/rendez_vous/UpdateRendezVous'))


const RendezVous = lazy(() => import('../pages/RendezVous'))
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

const Fonction = lazy(() => import('../pages/configuration/Fonction'))
const Specialite = lazy(() => import('../pages/configuration/Specialite'))
const TypeOrdonnances = lazy(() => import('../pages/configuration/TypeOrdonnance'))
const TypeExamens = lazy(() => import('../pages/configuration/TypeExamen'))
const TypeConsultations = lazy(() => import('../pages/configuration/TypeConsultation'))
const Caisses = lazy(() => import('../pages/configuration/Caisse'))
const Medicaments = lazy(() => import('../pages/configuration/Medicament'))
const AjoutMedicaments = lazy(() => import('../pages/formulaire/configuration/AjoutMedicament'))




const Receptionnistes = lazy(() => import('../pages/personnel/Receptionniste'))
const AjoutReceptionnistes = lazy(() => import('../pages/formulaire/personnel/ajouts/AjoutReceptionniste'))

const Medecins = lazy(() => import('../pages/personnel/Medecin'))
const AjoutMedecin = lazy(() => import('../pages/formulaire/personnel/ajouts/AjoutMedecin'))
const AjoutSpecialites = lazy(() => import('../pages/formulaire/configuration/AjoutSpecialite'))
const AjoutFonctions = lazy(() => import('../pages/formulaire/configuration/AjoutFonction'))
const AjoutTypeOrdonnances = lazy(() => import('../pages/formulaire/configuration/AjoutTypeOrdonnance'))
const AjoutTypeExamens = lazy(() => import('../pages/formulaire/configuration/AjoutTypeExamen'))
const AjoutTypeConsultations = lazy(() => import('../pages/formulaire/configuration/AjoutTypeConsultation'))
const AjoutCaisses = lazy(() => import('../pages/formulaire/configuration/AjoutCaisse'))



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
{
    path: '/configuration/fonction/',
    component: Fonction,

  },{
    path: '/configuration/fonctions/add',
    component: AjoutFonctions,

  },
  {
    path: '/configuration/medicaments',
    component: Medicaments,

  },
 {
    path: '/configuration/medicaments/add',
    component: AjoutMedicaments,

  },



  {
    path: '/configuration/specialites/',
    component: Specialite,

  },
   {
    path: '/configuration/specialites/add',
    component: AjoutSpecialites,

  },

   {
    path: '/configuration/type_ordonnance/',
    component: TypeOrdonnances,
  },
  {
    path: '/configuration/type_ordonnances/add',
    component: AjoutTypeOrdonnances,
  },

  {
    path: '/configuration/type_examen/',
    component: TypeExamens  ,
  },
  {
    path: '/configuration/type_examen/add',
    component: AjoutTypeExamens
  },

  {
    path: '/configuration/type_consultation',
    component: TypeConsultations ,
  },
  {
    path: '/configuration/type_consultation/add',
    component: AjoutTypeConsultations ,
  },
  {
    path: '/configuration/caisse',
    component: Caisses
  },
  {
    path: '/configuration/caisse/add',
    component: AjoutCaisses
  },



  //end configuration

  //start personnel path

  {
    path: '/personnel/receptionnistes',
    component: Receptionnistes
  },
  {
    path: '/personnel/receptionniste/add',
    component: AjoutReceptionnistes
  },

  {
    path: '/personnel/medecin',
    component: Medecins
  },
  {
    path: '/personnel/medecin/add',
    component: AjoutMedecin
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