import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ProductActivity from './components/ProductActivity'
import ProductDetails from './components/ProductDetails'
import axios from '/@/config/axios'
import { ProductInfos } from '/@/types'

const Product: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [activity, setActivity] = useState([])
  const [productInfos, setProductInfos] = useState<ProductInfos>()

  const { state } = useLocation<Record<string, string>>()
  const history = useHistory()

  const isDetector = location.pathname.includes('detector')

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`/influx/filter?area=${state.name}&sensor=${state._measurement}&sortBy=_time`)
        setActivity(data.data)
        setProductInfos(data.data[0])
      } catch (err) {
        history.push('map')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [history, state])

  return (
    <section className='container'>
      {isLoading ? (
        <div> isLoading </div>
      ) : (
        <>
          {productInfos && <ProductDetails product={productInfos} isDetector={isDetector} />}
          <ProductActivity activity={activity} isDetector={isDetector} />
        </>
      )}
    </section>
  )
}

export default Product
