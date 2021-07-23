import React, { FC } from 'react'

interface ButtonIconProps {
  readonly icon: string
  readonly onClick?: () => void
}

const ButtonIcon: FC<ButtonIconProps> = ({ onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className='h-12 w-12 flex items-center justify-center transition-all duration-200 rounded-lg bg-cloud shadow-md active:(ring-blue-50 ring-4)'
    >
      <img src={icon} alt='Button icon' />
    </button>
  )
}

export default ButtonIcon
