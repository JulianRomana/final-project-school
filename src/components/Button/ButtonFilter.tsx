import React, { FC } from 'react'

interface ButtonFilterProps {
  readonly children: string
  readonly color?: string
  readonly icon?: string
  readonly active?: boolean
  readonly onClick?: () => void
}

const ButtonFilter: FC<ButtonFilterProps> = ({ children, color, icon, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-auto h-10 pl-2 pr-4 flex items-center justify-center transition-colors duration-200 rounded-full text-cloud  border-cloud border-2 ${
        active ? 'shadow-lg bg-blue-25 bg-opacity-50 bg-stale' : 'border-opacity-20'
      }`}
    >
      <div
        className={`h-5 w-5 ${color || 'bg-onyx'} rounded-full mr-2 border-[1px] transition-colors duration-200 ${
          active ? 'border-cloud' : 'border-transparent'
        }`}
      >
        {icon && <img src={icon} alt={`${children} icon`} className='h-full w-full' />}
      </div>
      {children}
    </button>
  )
}

export default ButtonFilter
