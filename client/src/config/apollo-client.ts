import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

const httpUri = "http://localhost:3050/graphql"
const webSocketURI = httpUri.replace(/^https?/, 'ws')

const httpLink = new HttpLink({
  uri: httpUri
})

const webSocketLink = new WebSocketLink({
  uri: webSocketURI,
  options: {
    reconnect: true
  }
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  webSocketLink,
  httpLink
)

const link = ApolloLink.from([ terminatingLink ])
const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache
})