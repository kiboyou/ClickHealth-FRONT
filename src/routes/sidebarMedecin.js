/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routesMedecin = [
 
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

]

export default routesMedecin