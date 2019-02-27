import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { Loading } from './components/Loaders'
import requireAuth from './services/requireAuth'

const Main = lazy(() => import('./views/Main'))
const Login = lazy(() => import('./views/Auth/Login'))
const Signup = lazy(() => import('./views/Auth/Signup'))

const AuthMain = requireAuth(Main)

const App = () => (
  <div className="App">
    <Suspense fallback={<Loading delay={250} />}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={AuthMain} />
      </Switch>
    </Suspense>
  </div>
)

export default App

/*
 * TODO: Create graphql-code-generator types for client side
 * TODO: Create query/mutation fragments
 * TODO: Optimize performance for queries using `client.query()` on hover links
 * TODO: Make sure to do lazy imports
 * ANCHOR: look into persist-cache
 * TODO: Rewrite imports using es7
 */
