import React from 'react'
import { Link } from 'react-router-dom'
import { LOG_IN } from '../../graphql/mutations'
import AuthForm from './AuthForm'
import { ReactComponent as Logo } from '../../assets/logo1.svg'

import style from './Auth.module.css'

const Login = (props: any) => (
  <div className={style.authBackground}>
    <Logo className={style.logo} />
    <div className={style.authBox}>
      <header>
        <p className={style.title}>Welcome back!</p>
        <p className={style.subTitle}>We're so excited to see you again!</p>
      </header>

      <AuthForm mutation={LOG_IN} buttonLabel="Log in" />

      <Link to="/signup" className="app-link">
        Need an account?
      </Link>
    </div>
  </div>
)

export default Login
