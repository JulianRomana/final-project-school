import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ProductActivity from './components/ProductActivity'
import ProductDetails from './components/ProductDetails'
import axios from '/@/config/axios'

const Product: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [activity, setActivity] = useState([])

  const { pathname } = useLocation()
  const history = useHistory()

  const isDetector = pathname.includes('detector')

  const mock = {
    sensorId: 124,
    isActive: true,
    nodeId: 8364979,
    name: 'BU',
    nodeName: 'VEIL',
    _measurement: 'Flexibility',
    lastModifiedDate: format(new Date(), 'd/MM/yyyy'),
    details: ['type: CO2', 'class AB'],
    usage: 'Pour tous types de feu',
  }

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/influx/filter?area=BU&sensor=Luminosity&sortBy=_time')
        setActivity(data.data)
      } catch (err) {
        history.push('map')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [history])

  return (
    <section className='container'>
      {isLoading ? (
        <div> isLoading </div>
      ) : (
        <>
          <ProductDetails product={mock} isDetector={isDetector} />
          <ProductActivity activity={activity} isDetector={isDetector} />
        </>
      )}
    </section>
  )
}

export default Product
