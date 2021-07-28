import { format } from 'date-fns'
import React, { FC } from 'react'
import ToastAlertIcon from '../../assets/images/toast-alert.svg'
import ToastCloseIcon from '../../assets/images/toast-close.svg'

interface ToastAlertProps {
  readonly name: string
  readonly location: string
  readonly date: string
}

const ToastAlert: FC<ToastAlertProps> = ({ name, location, date }) => {
  return (
    <div className='w-full rounded-lg bg-yellow-25 border-yellow border-2 p-2 shadow-sm'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img src={ToastAlertIcon} alt='Toast alert icon' className='h-6 mr-2' />
          <div className='text-sm'>
            <h3 className='uppercase'>{name}</h3>
            <p className='text-stale-light capitalize'>{location.replace(/_+/g, ' ').toLowerCase()}</p>
          </div>
        </div>
        <div className='flex flex-col items-end justify-between text-right'>
          <img src={ToastCloseIcon} alt='Toast close icon' className='h-3 w-3 cursor-pointer' />
          <div className='leading-[14px] mt-2'>
            <p className='text-onyx'>{format(new Date(date), 'HH:mm')}</p>
            <p className='text-stale-light'>{format(new Date(date), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastAlert
