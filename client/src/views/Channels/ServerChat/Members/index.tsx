import React from 'react'
import style from './Members.module.css'
import { ONLINE_USERS } from '../../../../graphql/queries'
import { useQuery } from 'react-apollo-hooks'
import { differenceBy } from 'lodash'

const Members = ({ server }) => {
  const { data } = useQuery(ONLINE_USERS, {
    variables: { serverId: server.id },
    suspend: true
  })
  const offlineUsers = differenceBy(server.users, data.onlineUsers, 'id')

  return (
    <div className={style.membersWrap}>
      <div className={style.membersScrollWrapper}>
        <div className={style.membersScroller}>
          <React.Fragment>
            <div className={style.membersGroup}>
              Online - {data.onlineUsers.length}
            </div>
            {data.onlineUsers.map(user => {
              return (
                <div key={user.id} className={style.member}>
                  <div className={style.memberContent}>{user.name}</div>
                </div>
              )
            })}
          </React.Fragment>
          <React.Fragment>
            <div className={style.membersGroup}>
              Offline - {offlineUsers.length}
            </div>
            {offlineUsers.map(user => {
              return (
                <div key={user.id} className={[style.member, style.offline].join(' ')}>
                  <div className={style.memberContent}>
                    {user.name}
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        </div>
      </div>
    </div>
  )
}

export default Members
