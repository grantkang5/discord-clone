import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ChannelsProvider from '../../services/ChannelsProvider'
import Channels from '../Channels'
import { Loading } from '../../components/Loaders'

const Main = () => {
  return (
    <ChannelsProvider>
      <Channels />
    </ChannelsProvider>
  )
}

export default Main
