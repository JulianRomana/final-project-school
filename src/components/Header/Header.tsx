import React, { FC } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import BackIcon from '../../assets/images/back.svg'
import Logo from '../../assets/images/logo.svg'
import { Routes } from '../../enums/router.enum'

const Header: FC = () => {
  const location = useLocation()
  const history = useHistory()

  return (
    <div className='h-14 items-center px-4 w-full grid grid-cols-3'>
      {location.pathname !== Routes.LOGIN && (
        <a onClick={() => history.goBack()} className='cursor-pointer'>
          <img src={BackIcon} alt='Back button icon' className='h-5' />
        </a>
      )}
      <Link to={Routes.HOME} className='contents'>
        <img
          src={Logo}
          alt='Logo'
          className='h-5 justify-self-center col-start-2'
        />
      </Link>
    </div>
  )
}

export default Header
