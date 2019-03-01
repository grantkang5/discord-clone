import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import MainProvider from '../../services/MainProvider';
import Channels from '../Channels'

const Main = () => {
  return (
    <MainProvider>
      <Switch>
        <Route path="/channels/:serverId" component={Channels} />
        <Redirect to="/channels/@me" />
      </Switch>
    </MainProvider>
  )
}

export default Main
