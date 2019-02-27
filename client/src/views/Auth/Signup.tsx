import React from 'react'
import { Link } from 'react-router-dom'
import { SIGN_UP } from '../../graphql/mutations'
import AuthForm from './AuthForm'
import { ReactComponent as Logo } from '../../assets/logo1.svg'

import style from './Auth.module.css'

const Signup = () => (
  <div className={style.authBackground}>
    <Logo className={style.logo} />
    <div className={style.authBox}>
      <header>
        <p className={style.title}>Create an account</p>
      </header>
      <AuthForm mutation={SIGN_UP} buttonLabel="Sign up" />

      <Link to="/login" className="app-link">
        Already have an account?
      </Link>
    </div>
  </div>
)

export default Signup
