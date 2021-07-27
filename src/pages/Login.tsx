import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Illustration1 from '/@/assets/images/illustration-1.svg'
import Illustration2 from '/@/assets/images/illustration-2.svg'
import Illustration3 from '/@/assets/images/illustration-3.svg'
import { Button } from '/@/components/Button'
import { Input } from '/@/components/Input'
import { Routes } from '/@/enums/router'

const LoginPage: FC = () => {
  const { push } = useHistory()

  return (
    <div className='container'>
      <div className='relative pt-24 pb-44'>
        <div className='space-y-4'>
          <h1 className='text-blue text-2xl font-bold tracking-[-2%]'>Bienvenue sur Fleux</h1>
          <Input id='email' type='email' label='Identifiant' />
          <Input id='password' type='password' label='Mot de passe' />
          <Button block onClick={() => push('map')}>
            Se connecter
          </Button>

          <div className='mt-4 text-center'>
            <Link to={Routes.MAP} className='font-bold text-blue uppercase'>
              Se connecter en tant qu’invité
            </Link>
          </div>
        </div>
        <img src={Illustration1} alt='Illustration 1' className='absolute -top-14 left-4 pointer-events-none' />
        <img src={Illustration2} alt='Illustration 2' className='absolute -top-14 right-4 pointer-events-none' />
        <img src={Illustration3} alt='Illustration 3' className='absolute bottom-0 right-0' />
      </div>
    </div>
  )
}

export default LoginPage
