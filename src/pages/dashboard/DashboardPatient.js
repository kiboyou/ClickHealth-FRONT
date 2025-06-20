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




function DashboardPatient() {
  const dispatch = useDispatch();
  const state = useSelector ((state) => state)
  
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }



  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser()); // Appel pour récupérer l'utilisateur connecté
    }
  }, [isAuthenticated, dispatch]);

  
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

        <InfoCard title="TOTAL GENERAL" value="9389">
          <RoundIcon
            icon={ChartsIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de patient" value="700">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre d'examen" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de specialistes" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Nombre de consultation" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de congès" value="$ 46,760.89">
          <RoundIcon
            icon={SunIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de receptionniste" value="376">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nombre de groupes" value="35">
          <RoundIcon
            icon={ModalsIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

    </>
  )
}

export default DashboardPatient
