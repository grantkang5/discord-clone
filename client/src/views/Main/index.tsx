import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainProvider from '../../services/MainProvider';
import Channels from '../Channels'
import { Loading } from '../../components/Loaders';

const Main = () => {
  return (
    <MainProvider>
      <Channels />
    </MainProvider>
  )
}

export default Main
