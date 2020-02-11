import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import { Loading } from './components/Loaders'
import { requireAuth } from './services/auth.service'

const Main = lazy(() => import('./views/Main'))
const Login = lazy(() => import('./views/Auth/Login'))
const Logout = lazy(() => import('./views/Auth/Logout'))
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
* TODO: Add dropzone to upload images, emotes, and avatars
* TODO: markdown messages
* FIXME: Fix scruffed scrollbars on windows (https://github.com/Grsmto/simplebar#3-demo)
* TODO: Create better suspense components to load channel and servers
* TODO: Add email verification
* TODO: ADD VOICE
* TODO: Add migrations on production
* TODO: Lower volume storage requests
* TODO: Create graphql-code-generator types for client side
* TODO: Add refresh tokens & disable multiple sessions
*/