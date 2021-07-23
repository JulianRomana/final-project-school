import { format } from 'date-fns'
import fr from 'date-fns/esm/locale/fr/index.js'
import React, { FC } from 'react'
import fireIcon from '/@/assets/fire.svg'
import warningIcon from '/@/assets/warning.svg'

/* 
  "_time": "2021-07-23T14:24:17.388788Z",
"_value": 9280.55,
"_measurement": "Luminosity",
"name": "BU",
"nodeId": 8364979,
"topic": "WEB3-GROUPE7/8364979/121",
"sensorId": 121,
"isActive": false */
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
      <h3 className='mb-2 font-bold'>Historique D’activité</h3>
      <div className='space-y-3'>
        {activity.map(({ _time, nodeId }) => (
          <div key={nodeId} className='p-2 bg-cloud flex items-center rounded-md '>
            <img src={isDetector ? warningIcon : fireIcon} alt='warning icon' />
            <div className='ml-3'>
              <span className='font-medium'>
                {isDetector ? "L'alarme a été déclenchée" : "L'extincteur a été déplacé"}
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
