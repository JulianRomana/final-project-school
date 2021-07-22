import React, { FC } from 'react'

interface InputProps {
  readonly id: string
  readonly type?: string
  readonly label?: string
}

const Input: FC<InputProps> = ({ id, label, type }) => {
  return (
    <div className=''>
      {label && (
        <label htmlFor={id} className='mb-2 block'>
          {label}
        </label>
      )}
      <input
        type={type ?? 'text'}
        name={id}
        id={id}
        className='w-full rounded-lg h-12 text-stale transition-all duration-200 border-stale-light bg-dorian focus:(ring-blue-50 ring-4 bg-cloud) valid:(bg-cloud)'
        required
      />
    </div>
  )
}

export default Input
