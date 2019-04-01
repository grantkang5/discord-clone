import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
import { ReactComponent as Logo } from '../../assets/logo1.svg'

import './Auth.css'
import { signUp } from '../../services/auth.service';

const Signup = () => (
  <div className='authBackground'>
    <Logo className='logo' />
    <div className='authBox'>
      <header>
        <p className='title'>Create an account</p>
      </header>
      <AuthForm onSubmit={signUp} buttonLabel="Sign up" />

      <Link to="/login" className="app-link">
        Already have an account?
      </Link>
    </div>
  </div>
)

export default Signup
