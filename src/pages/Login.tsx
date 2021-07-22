import React, { FC } from 'react'
import Illustration1 from '../assets/images/illustration-1.svg'
import Illustration2 from '../assets/images/illustration-2.svg'
import Illustration3 from '../assets/images/illustration-3.svg'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'

const LoginPage: FC = () => {
  return (
    <div className='container'>
      <div className='relative pt-24 pb-44'>
        <div className='space-y-4'>
          <h1 className='text-blue text-2xl font-bold tracking-[-2%]'>Bienvenue sur Fleux</h1>
          <Input id='email' type='email' label='Identifiant' />
          <Input id='password' type='password' label='Mot de passe' />
          <Button block>Se connecter</Button>
        </div>
        <img src={Illustration1} alt='Illustration 1' className='absolute -top-14 left-4 pointer-events-none' />
        <img src={Illustration2} alt='Illustration 2' className='absolute -top-14 right-4 pointer-events-none' />
        <img src={Illustration3} alt='Illustration 3' className='absolute bottom-0 right-0' />
      </div>
    </div>
  )
}

export default LoginPage
