import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ProductActivity from './components/ProductActivity'
import ProductDetails from './components/ProductDetails'
import { Loader } from '/@/components/Loader'
import axios from '/@/config/axios'
import { NodeType, ProductInfos } from '/@/types'

const Product: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [activity, setActivity] = useState([])
  const [productInfos, setProductInfos] = useState<ProductInfos>()

  const { state } = useLocation<NodeType>()
  const history = useHistory()

  const isDetector = location.pathname.includes('detector')
  const productUrl = `/details/${isDetector ? 'detector' : 'extinguisher'}/${state.nodeId}`
  const activityUrl = `/influx/filter?area=${state.name}&sensor=${state._measurement}&sortBy=_time`

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)

        const [{ data: productData }, { data: activityData }] = await Promise.all([
          axios.get(productUrl),
          axios.get(activityUrl),
        ])

        setActivity(activityData.data)
        setProductInfos(productData.data)
      } catch (err) {
        history.push('map')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [history, activityUrl, productUrl])

  return (
    <section className='container'>
      {isLoading ? (
        <Loader loader={{ type: 'Oval', width: 100, height: 100, color: '#0071B6' }} centered />
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
