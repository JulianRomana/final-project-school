import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { FC } from 'react'
import detectorIllu from '/@/assets/detector.svg'
import extinguisherIllu from '/@/assets/extinguisher.svg'
import { ProductInfos } from '/@/types'

interface ProductDetailsProps {
  readonly product: ProductInfos
  readonly isDetector: boolean
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, isDetector }) => {
  const illu = isDetector ? detectorIllu : extinguisherIllu
  const lastModifiedDate = format(new Date(product.lastModified), 'dd/MM/yyyy', { locale: fr })
  const details = [`Type: ${product.details.type}`, `Classe: ${product.details.class}`]

  return (
    <div className='flex justify-between pt-4'>
      <div className='flex flex-col pt-3 px-2'>
        <div className={`text-sm font-font-bold ${isDetector ? 'text-blue' : 'text-orange'}`}>
          {isDetector ? 'DETECTEUR' : 'EXTINCTEUR'}
        </div>
        <div className='text-sm'>{product.room}</div>
        <div className='text-stale-light my-4 font-bold'>N°{product.id}</div>
        <img className='justify-center self-center mb-4' src={illu} alt='illustration' />
        <div
          className={`mt-auto relative mb-3 text-sm ${
            product.isActive
              ? 'text-evergreen before:(absolute top-1 right-0 w-3 h-3 rounded-1 content bg-evergreen)'
              : 'text-stale-light before:(absolute top-1 -right-2 w-3 h-3 rounded-1 content bg-stale-light)'
          }`}
        >
          {product.isActive ? 'En service' : 'Hors service'}
        </div>
      </div>
      <div className={`rounded-lg flex flex-col p-3 ${isDetector ? 'bg-blue-25' : 'bg-orange-25'}`}>
        <h3 className={`mb-2 text-sm font-bold ${isDetector ? 'text-blue' : 'text-orange'}`}>STATUS</h3>
        <p className={`${isDetector ? 'text-blue' : 'text-orange'} mt-2 text-sm`}>Dernières modifications:</p>
        <span className='text-sm text-onyx'>{lastModifiedDate}</span>
        <p className={`${isDetector ? 'text-blue' : 'text-orange'} mt-2 text-sm`}>Détails: </p>
        <div className='mb-2'>
          {details.map((detail, index) => (
            <div className='text-sm text-onyx' key={index}>
              {detail}
            </div>
          ))}
        </div>
        <p className={`${isDetector ? 'text-blue' : 'text-orange'} mt-auto text-sm`}>Usage: </p>
        <span className='text-sm text-onyx'>{product.details.usage}</span>
      </div>
    </div>
  )
}

export default ProductDetails
