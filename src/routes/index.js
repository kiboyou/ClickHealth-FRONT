import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/admin/Dashboard'))


const User = lazy(() => import('../pages/configuration/User'))
const ProfileUser = lazy(() => import('../pages/user/ProfileUser'))
const AjoutUser = lazy(() => import('../pages/Formulaire/personnel/AjoutUser'))

const Planning = lazy(() => import('../pages/rendezVous/Planning'))
const AjoutPlanning = lazy(() => import('../pages/Formulaire/rendez_vous/AjoutPlanning'))


const AjoutRDV = lazy(() => import('../pages/Formulaire/rendez_vous/AjoutRDV'))
const UpdateRendezVous = lazy(() => import('../pages/Formulaire/rendez_vous/UpdateRendezVous'))


const RendezVous = lazy(() => import('../pages/rendezVous/RendezVous'))
// const AjoutRendezVous = lazy(() => import('../pages/Formulaire/rendez_vous/AjoutRendezVous'))

const Patients = lazy(() => import('../pages/user/Patient'))
const AjoutPatient = lazy(() => import('../pages/Formulaire/patient/AjoutPatient'))


//reception
const FacturationsExamen = lazy(() => import('../pages/reception/FactureExamen'))
const AjoutFactureExamen = lazy(() => import('../pages/Formulaire/facture/AjoutFactureExamen'))
const DetailFactureRdv = lazy(() => import('../pages/reception/detailsFactures/DetailFactureRdv'))
const DetailFactureExamen = lazy(() => import('../pages/reception/detailsFactures/DetailFactureExamen'))
const FacturationsRdv = lazy(() => import('../pages/reception/FactureRdv'))
const FacturePaiement = lazy(() => import('../pages/reception/FacturePaiement'))
const AjoutPaiement = lazy(() => import('../pages/Formulaire/facture/AjoutPaiement'))
const DetailRecu = lazy(() => import('../pages/reception/detailsFactures/DetailRecu'))

const Queues = lazy(() => import('../pages/reception/Queue'))
const AjoutQueue = lazy(() => import('../pages/Formulaire/queue/AjoutQueue'))

//sante
const Consultations = lazy(() => import('../pages/sante/Consultation'))
const AjoutConsultations = lazy(() => import('../pages/Formulaire/sante/AjoutConsultation'))

const Ordonnances = lazy(() => import('../pages/sante/Ordonnance'))
const DetailOrdonnances= lazy(() => import('../pages/sante/detailsOrdonnances/DetailOrdonnance'))
const AjoutOrdonnances = lazy(() => import('../pages/Formulaire/sante/AjoutOrdonnance'))
const Examens = lazy(() => import('../pages/sante/Examen'))
const AjoutExamens = lazy(() => import('../pages/Formulaire/sante/AjoutExamen'))

const Prescriptions = lazy(() => import('../pages/sante/Prescription')) 
const AjoutPrescriptions = lazy(() => import('../pages/Formulaire/sante/AjoutPrescription'))



const Groupe = lazy(() => import('../pages/configuration/Groupe'))
const AjoutGroupe = lazy(() => import('../pages/Formulaire/groupe/AjoutGroupe'))

const Fonction = lazy(() => import('../pages/configuration/Fonction'))
const Specialite = lazy(() => import('../pages/configuration/Specialite'))
const TypeOrdonnances = lazy(() => import('../pages/configuration/TypeOrdonnance'))
const TypeExamens = lazy(() => import('../pages/configuration/TypeExamen'))
const TypeConsultations = lazy(() => import('../pages/configuration/TypeConsultation'))
const Caisses = lazy(() => import('../pages/configuration/Caisse'))
const Medicaments = lazy(() => import('../pages/pharmacie/Medicament'))
const AjoutMedicaments = lazy(() => import('../pages/Formulaire/pharmacie/AjoutMedicament'))




const Receptionnistes = lazy(() => import('../pages/personnel/Receptionniste'))
const AjoutReceptionnistes = lazy(() => import('../pages/Formulaire/personnel/AjoutReceptionniste'))

const Medecins = lazy(() => import('../pages/personnel/Medecin'))
const AjoutMedecin = lazy(() => import('../pages/Formulaire/personnel/AjoutMedecin'))
const AjoutSpecialites = lazy(() => import('../pages/Formulaire/configuration/AjoutSpecialite'))
const AjoutFonctions = lazy(() => import('../pages/Formulaire/configuration/AjoutFonction'))
const AjoutTypeOrdonnances = lazy(() => import('../pages/Formulaire/configuration/AjoutTypeOrdonnance'))
const AjoutTypeExamens = lazy(() => import('../pages/Formulaire/configuration/AjoutTypeExamen'))
const AjoutTypeConsultations = lazy(() => import('../pages/Formulaire/configuration/AjoutTypeConsultation'))
const AjoutCaisses = lazy(() => import('../pages/Formulaire/configuration/AjoutCaisse'))



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
    path: '/profile', 
    component: ProfileUser, 

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
    component: AjoutFactureExamen
  },

  {
    path: '/reception/factures/examens/detail',
    component: DetailFactureExamen
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
    path: '/reception/factures/rdv/detail',
    component: DetailFactureRdv
  },

  {
    path: '/reception/factures/paiement',
    component: FacturePaiement
  },

  {
    path: '/reception/factures/paiement/add',
    component: AjoutPaiement
  },

  {
    path: '/reception/factures/paiement/detail',
    component: DetailRecu
  },

  {
    path: '/reception/queue',
    component: Queues
  },
  {
    path: '/reception/queue/add',
    component: AjoutQueue
  },

  // end reception

    

  //start consultation

  {
    path: '/consultation/',
    component: Consultations
  },

  {
    path: '/consultation/add',
    component: AjoutConsultations
  },

  {
    path: '/consultation/ordonnance',
    component: Ordonnances
  },
   {
    path: '/consultation/ordonnance/detail',
    component:  DetailOrdonnances
  },

  {
    path: '/consultation/ordonnance/add',
    component:  AjoutOrdonnances
  },

  {
    path: '/consultation/prescription',
    component: Prescriptions
  },

  {
    path: '/consultation/prescription/add',
    component: AjoutPrescriptions
  },

  {
    path: '/consultation/examen',
    component: Examens
  },

  {
    path: '/consultation/examen/add',
    component: AjoutExamens
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

  //start pharmacie
    {
        path: '/pharmacie/medicaments',
        component: Medicaments,

    },
    {
        path: '/pharmacie/medicaments/add',
        component: AjoutMedicaments,

    },
    //end pharmacie

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




]

export default routes