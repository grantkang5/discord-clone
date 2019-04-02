import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'
import { useMe } from '../../services/auth.service'
import history from '../../config/history'
import { CURRENT_USER } from '../../graphql/queries'
import axios from 'axios'
import { LOG_OUT } from '../../graphql/mutations';

const Logout = () => {
  const me = useMe()
  const client = useApolloClient()
  const logOut = useMutation(LOG_OUT)

  useEffect(() => {
    if (me) {
      logOut().then(async () => {
        await localStorage.removeItem('Authorization')
        await client.clearStore()
        history.push('/login')
      })
    }
  }, [])

  return <div>Logging out...</div>
}

export default Logout
