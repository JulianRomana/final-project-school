import React, { FC } from 'react'
import fireIcon from '/@/assets/fire.svg'
import warningIcon from '/@/assets/warning.svg'

interface ProductActivityProps {
  readonly activity: {
    _time: string
    _value: number
    _measurement: string
    nodeId: string
    nodeName: string
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
              <div> {_time} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductActivity
