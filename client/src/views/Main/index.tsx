import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Channels from '../Channels'
import { Loading } from '../../components/Loaders'

const Main = () => {
  return <Channels />
}

export default Main
