/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routesPatient = [

  {
    icon: 'ReceptionIcon',
    name: 'Mes factures',
    routes: [
      // submenu
      {
        path: '/app/reception/factures/examens',
        name: 'Facture des Examen',
      },
      {
        path: '/app/reception/factures/rdv',
        name: 'Facture des RDV',
      },
    ],
  },

  {
    icon: 'DiagnosticIcon',
    name: 'Ma Santé',
    routes: [
      // submenu
      {
        path: '/app/consultation',
        name: 'Mes Consultation',
      },
      {
        path: '/app/consultation/ordonnance',
        name: 'Mes Ordonnance',
      },
      {
        path: '/app/consultation/prescription',
        name: 'Mes Prescription',
      },
      {
        path: '/app/consultation/examen',
        name: 'Mes Examen',
      },
    ],
  },

  {
    path: '/app/rendez_vous', // the url
    icon: 'DiagnosticIcon',
    name: 'Mes Rendez-vous', // name that appear in Sidebar
  },

]

export default routesPatient
