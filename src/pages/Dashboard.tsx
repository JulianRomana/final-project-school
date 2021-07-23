import React, { FC, useState } from 'react'
import AlertTitleIcon from '/@/assets/images/alert.svg'
import DashboardIllustration from '/@/assets/images/dashboard-illustration.svg'
import HistoryIcon from '/@/assets/images/history.svg'
import MaintenanceIcon from '/@/assets/images/maintenance.svg'
import { ButtonBlock } from '/@/components/Button'
import { ToastAlert } from '/@/components/Toast'

const DashboardPage: FC = () => {
  const [toastAlerts, setToastAlerts] = useState([
    {
      name: 'Extincteur déplomber',
      location: 'Centre sportif',
      date: 'Thu Jul 22 2021 10:12:56',
    },
    {
      name: 'Extincteur déplomber',
      location: 'Centre sportif',
      date: 'Thu Jul 22 2021 10:12:56',
    },
    {
      name: 'Extincteur déplomber',
      location: 'Centre sportif',
      date: 'Thu Jul 22 2021 10:12:56',
    },
  ])

  return (
    <div className='container'>
      <div className='relative pb-48'>
        <h1 className='flex mt-2'>
          <img src={AlertTitleIcon} alt='Alert title icon' className='mr-2' />
          <span className='text-onyx text-2xl tracking-[-2%]'>Alertes</span>
        </h1>
        <div className='my-4 space-y-4'>
          {toastAlerts.map((alert, index) => (
            <ToastAlert key={`Alert_${index}`} name={alert.name} location={alert.location} date={alert.date} />
          ))}
        </div>
        <div className='grid grid-cols-2 gap-8 p-4'>
          <ButtonBlock img={MaintenanceIcon}>Maintenance</ButtonBlock>
          <ButtonBlock img={HistoryIcon}>Historique</ButtonBlock>
        </div>
        <img src={DashboardIllustration} alt='Dashboard illustration' className='absolute bottom-0 right-0' />
      </div>
    </div>
  )
}

export default DashboardPage
