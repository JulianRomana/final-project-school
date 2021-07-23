import { format } from 'date-fns'
import React, { FC } from 'react'
import DetectorIcon from '../../assets/images/detector.svg'
import ExtinguisherIcon from '../../assets/images/extinguisher.svg'

interface HistoryCardProps {
  readonly id: number
  readonly isExtinguisher: boolean
  readonly name: string
  readonly date: string
}

const HistoryCard: FC<HistoryCardProps> = ({ isExtinguisher, id, name, date }) => {
  return (
    <div className='w-full rounded-lg bg-cloud p-4 shadow flex'>
      <div className='bg-onyx p-2 rounded-full h-8 w-8 mr-2'>
        <img src={isExtinguisher ? ExtinguisherIcon : DetectorIcon} alt='' />
      </div>
      <div>
        <h3 className='font-bold uppercase'>
          {isExtinguisher ? 'Extincteur' : 'Détecteur de fumée'} n°{id}
        </h3>
        <p className='leading-[14px]'>{name}</p>
        <p className='text-onyx mt-1'>{format(new Date(date), 'HH : mm')}</p>
      </div>
    </div>
  )
}

export default HistoryCard
