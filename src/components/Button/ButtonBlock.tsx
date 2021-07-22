import React, { FC } from 'react'

interface ButtonBlockProps {
  readonly children: string
  readonly img: string
}

const ButtonBlock: FC<ButtonBlockProps> = ({ children, img }) => {
  return (
    <div className='aspect-w-1 aspect-h-1'>
      <button className='w-full h-full flex flex-col justify-center items-center transition-all duration-200 rounded-lg bg-cloud text-blue text-xs font-bold uppercase active:(ring-blue-50 ring-4) shadow-xl'>
        <img src={img} alt={`${children.toString()}`} className='mb-2' />
        {children}
      </button>
    </div>
  )
}

export default ButtonBlock
