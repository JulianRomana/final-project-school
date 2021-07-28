import React, { FC } from 'react'
import LoaderSpinner, { LoaderProps as LoaderSpinnerProps } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

interface LoaderProps {
  loader: LoaderSpinnerProps
  centered?: boolean
}

const Loader: FC<LoaderProps> = ({ loader, centered }) => (
  <div className={centered ? 'h-screen w-full flex justify-center items-center' : ''}>
    <LoaderSpinner {...loader} />
  </div>
)

export default Loader
