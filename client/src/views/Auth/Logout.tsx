import React, { useEffect } from 'react'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks';
import { LOG_OUT } from '../../graphql/mutations';
import { useMe } from '../../services/requireAuth';
import history from '../../config/history';
import { CURRENT_USER } from '../../graphql/queries';
import axios from 'axios'

const Logout = () => {
  const me = useMe()
  const logout = useMutation(LOG_OUT)

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