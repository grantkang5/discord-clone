import React, { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { CURRENT_USER } from '../graphql/queries'
import { useSubscriptions } from './useSubscriptions'

export const MyContext = React.createContext(null)
export const useMe = () => useContext(MyContext)

export const storeAuthHeader = (token: string) => {
  localStorage.setItem('Authorization', token)
}
export const getAuthHeader = (): string | null => {
  return localStorage.getItem('Authorization') || null
}
export const logIn = ({ email, password }) => axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { email, password })
  .then(({ data }) => storeAuthHeader(data.token))
export const signUp = ({ email, password }) => axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, { email, password })
  .then(({ data }) => storeAuthHeader(data.token))
export const logOut = () => axios.post('/auth/logout')

export const requireAuth = (Component: React.ComponentType) => {
  return props => {
    const { data } = useQuery(CURRENT_USER, { suspend: true })
    if (!data.me) {
      return <Redirect to="/login" />
    }

    useSubscriptions()
    return (
      <MyContext.Provider value={data.me}>
        <Component {...props} />
      </MyContext.Provider>
    )
  }
}

export default requireAuth
