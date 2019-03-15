import React, { useEffect } from 'react'
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { LOG_OUT } from '../../graphql/mutations';
import { useMe, logout } from '../../services/requireAuth';
import history from '../../config/history';
import { CURRENT_USER } from '../../graphql/queries';
import axios from 'axios'

const Logout = () => {
  const me = useMe()
  
  useEffect(() => {
    if (me) {
      logout()
    }
  }, [])

  return (
    <div>Logging out...</div>
  )
}

export default Logout