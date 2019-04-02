import React, { Suspense } from 'react'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import client from './config/apollo-client'
import App from './App'
import history from './config/history'
import './index.css'
import 'simplebar/dist/simplebar.css'
import './assets/css/style.css'
import * as serviceWorker from './serviceWorker'
import theme from './config/theme'

const Root = () => (
  <ApolloHooksProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloHooksProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
