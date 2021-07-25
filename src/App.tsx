import React, { FC } from 'react'
import Router from './router'
import { Header } from '/@/components/Header'

const App: FC = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  )
}

export default App
