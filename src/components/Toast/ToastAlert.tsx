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
    <div className='w-full h-14 rounded-lg bg-yellow-25 border-yellow border-2  text-xs p-2 shadow-sm'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img
            src={ToastAlertIcon}
            alt='Toast alert icon'
            className='h-5 mr-2'
          />
          <div className=''>
            <h3 className='font-bold uppercase'>{name}</h3>
            <p className='text-stale'>{location}</p>
          </div>
        </div>
        <div className='flex flex-col items-end justify-end text-right'>
          <img
            src={ToastCloseIcon}
            alt='Toast close icon'
            className='h-[6px] w-[6px] mb-1 cursor-pointer'
          />
          <div className='leading-[14px]'>
            <p className='text-onyx font-bold'>
              {format(new Date(date), 'HH:mm')}
            </p>
            <p className='text-stale'>{format(new Date(date), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastAlert
