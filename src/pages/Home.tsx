import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { Routes } from '../enums/router.enum'

const HomePage: FC = () => {
  return <Redirect to={Routes.LOGIN} />
}

export default HomePage
