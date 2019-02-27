import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import ServerList from './ServerList'
import ServerContent from './ServerContent'
import style from './Main.module.css'

const Main = () => {
  return (
    <main className={style.mainApp}>
      <ServerList />

      <div className={style.contentBox}>
        <ServerContent />
      </div>
    </main>
  )
}

export default Main
