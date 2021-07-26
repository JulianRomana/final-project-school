import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { FC } from 'react'
import DetectorIcon from '../../assets/images/detector.svg'
import ExtinguisherIcon from '../../assets/images/extinguisher.svg'

interface HistoryCardProps {
  readonly id: number
  readonly isExtinguisher: boolean
  readonly date: string
}

const HistoryCard: FC<HistoryCardProps> = ({ isExtinguisher, id, date }) => {
  return (
    <div className='w-full rounded-lg bg-cloud p-4 shadow flex text-sm'>
      <div className='bg-onyx p-2 rounded-full h-8 w-8 mr-2'>
        <img src={isExtinguisher ? ExtinguisherIcon : DetectorIcon} alt='' />
      </div>
      <div>
        <h3 className='font-bold uppercase'>
          {isExtinguisher ? 'Extincteur' : 'Détecteur de fumée'} n°{id}
        </h3>
        <p className='leading-[14px]'>{isExtinguisher ? "L'extincteur a été déplacé" : "L'alarme a été déclenchée"}</p>
        <p className='text-onyx mt-2 text-stale-light'>{format(new Date(date), 'd MMM yyyy HH:mm', { locale: fr })}</p>
      </div>
    </div>
  )
}

export default HistoryCard
