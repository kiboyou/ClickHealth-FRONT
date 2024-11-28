// Graph Legends
export const doughnutLegends = [
  { title: 'Confirmés', color: 'bg-green-500' },
  { title: 'Annulés', color: 'bg-red-500' },
  { title: 'En attente', color: 'bg-yellow-500' },
];

export const lineLegends = [
  { title: 'Consultations', color: 'bg-blue-500' },
  { title: 'Examens', color: 'bg-teal-600' },
];

export const barLegends = [
  { title: 'Consultations', color: 'bg-green-500' },
  { title: 'Examens', color: 'bg-yellow-500' },
];

// Donut Chart Configuration
export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [40, 30, 30], // Pourcentage des rendez-vous confirmés, annulés, en attente
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'], // Vert, rouge, jaune
        label: 'Rendez-vous',
      },
    ],
    labels: ['Confirmés', 'Annulés', 'En attente'],
  },
  options: {
    responsive: true,
    cutoutPercentage: 70, // Ajuster l'épaisseur du donut
  },
  legend: {
    display: false,
  },
};

// Line Chart Configuration
export const lineOptions = {
  data: {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'], // Mois
    datasets: [
      {
        label: 'Consultations',
        backgroundColor: '#3b82f6', // Bleu
        borderColor: '#3b82f6',
        data: [120, 150, 180, 200, 220, 250, 300], // Nombre de consultations
        fill: false,
      },
      {
        label: 'Examens',
        backgroundColor: '#14b8a6', // Teal
        borderColor: '#14b8a6',
        data: [50, 70, 90, 110, 130, 150, 170], // Nombre d'examens
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Mois',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Nombre',
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

// Bar Chart Configuration
export const barOptions = {
  data: {
    labels: ['Cardiologie', 'Dermatologie', 'Pédiatrie', 'Neurologie'], // Spécialités
    datasets: [
      {
        label: 'Consultations',
        // Utiliser une couleur orange pour toutes les barres de consultations
        backgroundColor: '#f59e0b', // Orange
        borderWidth: 1,
        data: [40, 50, 35, 60], // Consultations par spécialité
      },
      {
        label: 'Examens',
        // Utiliser une couleur vert clair pour toutes les barres d'examen
        backgroundColor: '#10b981', // Vert clair
        borderWidth: 1,
        data: [20, 30, 25, 35], // Examens par spécialité
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Empiler les barres
      },
      y: {
        stacked: true,
      },
    },
  },
  legend: {
    display: false,
  },
};
