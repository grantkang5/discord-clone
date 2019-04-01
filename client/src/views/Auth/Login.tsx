import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
import { ReactComponent as Logo } from '../../assets/logo1.svg'
import classNames from 'classnames'
import discordLogo from '../../assets/discordLogo.png'

import './Auth.css'
import { logIn } from '../../services/auth.service';

const Login = (props: any) => {
  return (
    <div className='authBackground'>
      <img src={discordLogo} className='logo' alt="Logo" />
      <div className='authBox'>
        <header>
          <p className='title'>Welcome back!</p>
          <p className='subTitle'>We're so excited to see you again!</p>
        </header>

        <AuthForm onSubmit={logIn} buttonLabel="Log in" />

        <Link to="/signup" className="app-link">
          Need an account?
        </Link>
      </div>
    </div>
  )
}

export default Login
