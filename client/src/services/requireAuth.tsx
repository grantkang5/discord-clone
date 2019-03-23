import React, { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { CURRENT_USER } from '../graphql/queries'
import { useSubscriptions } from './useSubscriptions'

export const MyContext = React.createContext(null)
export const useMe = () => useContext(MyContext)
export const logIn = ({ email, password }) => axios.post('/api/auth/login', { email, password })
export const signUp = ({ email, password }) => axios.post('/api/auth/signup', { email, password })
export const logOut = () => axios.post('/api/auth/logout')

const requireAuth = (Component: React.ComponentType) => {
  return props => {
    const { data } = useQuery(CURRENT_USER, { suspend: true })
    console.log('[REQUIRE AUTH]: ', data.me)

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
