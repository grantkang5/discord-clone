import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import { Loading } from './components/Loaders'
import requireAuth from './services/requireAuth'

const Main = lazy(() => import('./views/Main'))
const Login = lazy(() => import('./views/Auth/Login'))
const Logout = lazy(() => import ('./views/Auth/Logout'))
const Signup = lazy(() => import('./views/Auth/Signup'))
const AuthLogout = requireAuth(Logout)
const AuthMain = requireAuth(Main)

const App = () => (
  <div className="App">
    <Suspense fallback={<Loading delay={250} />}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={AuthLogout} />
        <Route path="/" component={AuthMain} />
      </Switch>
    </Suspense>
  </div>
)

export default App

/*
 * TODO: Create graphql-code-generator types for client side
 * TODO: Optimize performance for queries using `client.query()` on hover links
 * TODO: Create better suspense components to load channel and servers
 */
