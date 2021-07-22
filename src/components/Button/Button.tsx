import React, { FC } from 'react'

interface ButtonProps {
  readonly type?: string
  readonly label?: string
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className='w-full h-12 transition-all duration-200 rounded-lg bg-blue text-cloud font-bold uppercase active:(ring-blue-50 ring-4)'>
      {children}
    </button>
  )
}

export default Button
