import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { OperationDefinitionNode } from 'graphql'
import { createUploadLink } from 'apollo-upload-client'
import { getAuthHeader } from '../services/auth.service'

const httpUri = `${process.env.REACT_APP_SERVER_URL}/graphql`
const webSocketURI = httpUri.replace(
  /^https?/,
  process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
)

const httpLink = createUploadLink({
  uri: httpUri
})
/* Replace HttpLink w/ createUploadLink for file mutations */
// const httpLink = new HttpLink({
//   uri: httpUri
// })

const webSocketLink = new WebSocketLink({
  uri: webSocketURI,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: getAuthHeader()
    })
  }
})

const authLink = setContext((_, { headers }) => {
  const token = getAuthHeader()

  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : ''
    }
  }
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query
    ) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  webSocketLink,
  authLink.concat(httpLink)
)
const apolloUploadLink = createUploadLink()

const link = ApolloLink.from([terminatingLink])
const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache
})
