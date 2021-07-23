import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ProductPageParams } from '../../types'
import ProductActivity from './components/ProductActivity'
import ProductDetails from './components/ProductDetails'

const Product: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { id }: ProductPageParams = useParams()
  const { pathname } = useLocation()

  const isDetector = pathname.includes('detector')

  const mock = {
    sensorId: 124,
    isActive: true,
    nodeName: 'VEIL',
    lastModifiedDate: format(new Date(), 'd/MM/yyyy'),
    details: ['type: CO2', 'class AB'],
    usage: 'Pour tous types de feu',
  }

  const activityMock = [
    {
      _time: '2021-07-22T09:19:19.411737Z',
      _value: 0,
      _measurement: 'Flexibility',
      nodeId: '4574379',
      nodeName: 'La maison',
      topic: 'WEB3-GROUPE7/4574379/119',
      sensorId: 119,
      isActive: false,
    },
    {
      _time: '2021-07-22T09:19:09.417807Z',
      _value: 1,
      _measurement: 'Flexibility',
      nodeId: '457437912',
      nodeName: 'La maison',
      topic: 'WEB3-GROUPE7/4574379/119',
      sensorId: 119,
      isActive: true,
    },
    {
      _time: '2021-07-21T13:04:07.182709Z',
      _value: 0,
      _measurement: 'Flexibility',
      nodeId: '457437944"',
      nodeName: 'La maison',
      topic: 'WEB3-GROUPE7/4574379/119',
      sensorId: 119,
      isActive: false,
    },
  ]
  useEffect(() => {
    //fetch
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id])

  return (
    <section className='container'>
      {isLoading ? (
        <div> isLoading </div>
      ) : (
        <>
          <ProductDetails product={mock} isDetector={isDetector} />
          <ProductActivity activity={activityMock} isDetector={isDetector} />
        </>
      )}
    </section>
  )
}

export default Product
