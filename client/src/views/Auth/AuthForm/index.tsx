import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Formik, FormikActions, FormikProps } from 'formik'
import { DocumentNode } from 'graphql'
import { useQuery } from 'react-apollo-hooks'
import { useMe, logIn, signUp } from '../../../services/requireAuth'
import '../Auth.css'
import validationSchema from './validationSchema'
import { CURRENT_USER } from '../../../graphql/queries'
import FormInput from '../../../components/FormInput'
import Button from '../../../components/Button'
import axios from 'axios'

interface FormValues {
  email: string
  password: string
}

interface Props {
  type: string
  buttonLabel: string
}

const AuthForm = ({ type, buttonLabel }: Props) => {
  const { data } = useQuery(CURRENT_USER)

  if (data.me) {
    return <Redirect push to="/" />
  }

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(
          { email, password }: FormValues,
          { setSubmitting, setFieldError }: FormikActions<FormValues>
        ) => {
          if (type === 'LOGIN') {
            logIn({ email, password })
          } else {
            signUp({ email, password })
          }
        }}
        validationSchema={validationSchema}
        render={(props: FormikProps<FormValues>) => (
          <form onSubmit={props.handleSubmit}>
            <div className='inputWrapper'>
              <FormInput
                type="text"
                name="email"
                placeholder="example@email.com"
                formikProps={props}
                label="email"
              />
            </div>

            <div className='inputWrapper'>
              <FormInput
                type="password"
                name="password"
                formikProps={props}
                label="password"
              />
              {buttonLabel === 'Log in' && (
                <Link to="#" className="app-link">
                  Forgot your password?
                </Link>
              )}
            </div>


            <div className='buttonWrapper'>
              <Button type="submit" fullwidth={true} disabled={props.isSubmitting}>
                {buttonLabel}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default AuthForm
