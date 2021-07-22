import React, { FC } from 'react'
import Header from './components/Header/Header'
import Router from './router'

const App: FC = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  )
}

export default App
