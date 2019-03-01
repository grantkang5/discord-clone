import React, { useContext } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'

import { CURRENT_USER } from '../graphql/queries'
import { useSubscriptions } from './useSubscriptions';

export const MyContext = React.createContext(null)
export const useMe = () => useContext(MyContext)

const requireAuth = (Component: React.ComponentType) => {
  return props => {
    const { data } = useQuery(CURRENT_USER, { suspend: true })

    if (!data.me) {
      return (
        <Redirect to="/login" />
      )
    }

    // TODO - Add useSubscriptions() function to start up all subscription watchers
    useSubscriptions()

    return (
      <MyContext.Provider value={data.me}>
        <Component {...props} />
      </MyContext.Provider>
    )
  }
}

export default requireAuth