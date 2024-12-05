import React, { useEffect, useState } from 'react'

import { Bar, Doughnut, Line } from 'react-chartjs-2'
import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import ChartLegend from '../../components/Chart/ChartLegend'
import RoundIcon from '../../components/RoundIcon'
import PageTitle from '../../components/Typography/PageTitle'
import { CartIcon, ChartsIcon, ChatIcon, ModalsIcon, MoneyIcon, PeopleIcon, SunIcon } from '../../icons'
import response from '../../utils/demo/tableData'


import {
  barLegends,
  barOptions,
  doughnutLegends,
  doughnutOptions,
  lineLegends,
  lineOptions,
} from '../../utils/demo/chartsData'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUser } from '../../Api/features/userAuth/authThunks'
import { fetchPatients } from '../../Api/features/patient/patientThunks'
import { fetchMedecins } from '../../Api/features/medecins/medecinThunks'
import { fetchRendezVous } from '../../Api/features/rendezVous/rendezVousThunks'
import { fetchGroups } from '../../Api/features/groupe/groupeThunks'
import { fetchExamens } from '../../Api/features/examen/examenThunks'
import { fetchFacturesRdv } from '../../Api/features/factureRdv/factureRdvThunks'
import { fetchFacturesExamen } from '../../Api/features/factureExamen/factureExamenThunks'
import { fetchConsultations } from '../../Api/features/consultation/consultationThunks'




function Dashboard() {
  const dispatch = useDispatch();

  
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { patients } = useSelector((state) => state.patient);
  const { rendezVousList } = useSelector((state) => state.rendezVous)
  const { examens } = useSelector((state) => state.examen)
  const { consultations } = useSelector((state) => state.consultation)
  const { medecins } = useSelector((state) => state.medecins);  
  const { groups } = useSelector((state) => state.groupe);

  const { prescriptions } = useSelector((state) => state.prescription);
  const { ordonnances } = useSelector((state) => state.ordonnance);
  const { factures: factureRdv } = useSelector((state) => state.factureRdv);
  const { factures: factureExamen } = useSelector((state) => state.factureExamen);

  

  


  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }



  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
      
      dispatch(fetchPatients());
      dispatch(fetchExamens());
      dispatch(fetchMedecins());
      dispatch(fetchConsultations());
      dispatch(fetchFacturesRdv());
      dispatch(fetchFacturesExamen());  
      dispatch(fetchRendezVous());
      dispatch(fetchGroups());
      // Ajoutez d'autres fetch nécessaires ici
    }
  }, [isAuthenticated, dispatch]); // Dépendances réduites
  
  
  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

  
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

        <InfoCard title="TOTAL GENERAL" value={patients.length + consultations.length +
        examens.length + medecins.length +consultations.length+factureExamen.length + factureRdv.length
        +rendezVousList.length+groups.length}>
          <RoundIcon
            icon={ChartsIcon}
            iconColorClass="text-orange-100"
            bgColorClass="bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de patient" value={patients.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-green-100"
            bgColorClass="bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre d'examen" value={examens.length}>
          <RoundIcon
            icon={SunIcon}
            iconColorClass="text-blue-100"
            bgColorClass="bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de specialistes" value={medecins.length}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-teal-100"
            bgColorClass="bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Nombre de consultation" value={consultations.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-100"
            bgColorClass="bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de facture" value={factureExamen.length + factureRdv.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-green-100"
            bgColorClass="bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de rendez-vous" value={rendezVousList.length}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-blue-100"
            bgColorClass="bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de groupes" value={groups.length}>
          <RoundIcon
            icon={ModalsIcon}
            iconColorClass="text-teal-100"
            bgColorClass="bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>


      <PageTitle>Charts</PageTitle>
      
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Rendez-vous">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Nombre de consultation / examen par mois">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="conusltation / examen par specialités">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        
      </div>
    </>
  )
}

export default Dashboard
