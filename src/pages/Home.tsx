import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../enums/router.enum'
import logo from './../logo.svg'

const HomePage: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p className='text-4xl'>Hello Vite + React!</p>
        <p>
          <button type='button' onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <div className='flex flex-col'>
          <Link to={Routes.LOGIN}>View login</Link>
          <Link to={Routes.DASHBOARD}>View dashboard</Link>
          <Link to={Routes.MAP}>View map</Link>
        </div>
      </header>
    </div>
  )
}

export default HomePage
