import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import ServerList from './ServerList'
import style from './Channels.module.css'
import { GET_USER_SERVERS } from '../../graphql/queries'
import { useMe } from '../../services/auth.service'
import { useQuery } from 'react-apollo-hooks'
import pathToRegexp from 'path-to-regexp'
import UserContent from './UserContent'
import { Loading } from '../../components/Loaders'
import ServerChat from './ServerChat'

const ServerContent = lazy(() => import('./ServerContent'))
const HomeContent = lazy(() => import('./HomeContent'))

const Channels = ({ location }) => {
  const me = useMe()
  const { data } = useQuery(GET_USER_SERVERS, {
    variables: { userId: me.id },
    suspend: true
  })
  const re = pathToRegexp('/channels/:serverId/:channelId?')
  const path = re.exec(location.pathname)

  return (
    <main className={style.mainApp}>
      <ServerList serverId={path ? path[1] : null} servers={data.userServers} />

      <div className={style.contentBox}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/channels/@me" component={HomeContent} />
            <Route path="/channels/:serverId" component={ServerContent} />
            <Redirect to="/channels/@me" />
          </Switch>
        </Suspense>
      </div>
    </main>
  )
}

export default withRouter(Channels)
