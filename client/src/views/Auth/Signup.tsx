import React from 'react'
import { Link } from 'react-router-dom'
import { SIGN_UP } from '../../graphql/mutations'
import AuthForm from './AuthForm'
import { ReactComponent as Logo } from '../../assets/logo1.svg'

import './Auth.css'

const Signup = () => (
  <div className='authBackground'>
    <Logo className='logo' />
    <div className='authBox'>
      <header>
        <p className='title'>Create an account</p>
      </header>
      <AuthForm mutation={SIGN_UP} buttonLabel="Sign up" />

      <Link to="/login" className="app-link">
        Already have an account?
      </Link>
    </div>
  </div>
)

export default Signup
