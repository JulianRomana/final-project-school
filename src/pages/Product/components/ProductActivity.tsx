import { format } from 'date-fns'
import fr from 'date-fns/esm/locale/fr/index.js'
import React, { FC } from 'react'
import fireIcon from '/@/assets/fire.svg'
import warningIcon from '/@/assets/warning.svg'

interface ProductActivityProps {
  readonly activity: {
    _time: string
    _value: number
    _measurement: string
    nodeId: string
    name: string
    sensorId: number
    topic: string
    isActive: boolean
  }[]
  readonly isDetector: boolean
}

const ProductActivity: FC<ProductActivityProps> = ({ activity, isDetector }) => {
  return (
    <div className='mt-5'>
      <h3 className='mb-2 font-bold'>Historique D’activités</h3>
      <div className='space-y-3'>
        {activity.map(({ _time }) => (
          <div key={_time} className='p-2 bg-cloud flex items-center rounded-md '>
            <img src={isDetector ? warningIcon : fireIcon} alt='warning icon' />
            <div className='ml-3'>
              <span className='font-medium'>
                {isDetector ? 'Le détecteur a été enclenché' : "L'extincteur a été déplacé"}
              </span>
              <div> {format(new Date(_time), 'd MMM yyyy hh:mm', { locale: fr })} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductActivity
