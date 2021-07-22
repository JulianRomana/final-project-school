import React, { FC } from 'react'

interface ButtonProps {
  readonly children: string
  readonly block?: boolean
  readonly onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick, block = false }) => {
  return (
    <button
      onClick={onClick}
      className={`w-${
        block ? 'full' : 'auto'
      } h-12 px-8 transition-all duration-200 rounded-lg bg-blue text-cloud font-bold uppercase active:(ring-blue-50 ring-4)`}
    >
      {children}
    </button>
  )
}

export default Button
