import React, { useState } from 'react'
import style from './Members.module.css'
import { ONLINE_USERS } from '../../../../graphql/queries'
import { useQuery } from 'react-apollo-hooks'
import { differenceBy } from 'lodash'
import { ReactComponent as Crown } from '../../../../assets/crown.svg'
import MemberOption from './MemberOption'
import { useMe } from '../../../../services/auth.service'
import Avatar from '../../../../components/Avatar'

const Members = ({ server }) => {
  const me = useMe()
  const { data } = useQuery(ONLINE_USERS, {
    variables: { serverId: server.id },
    suspend: true
  })
  const [anchorEl, handleMenu] = useState(null)
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
                  <div
                    className={style.memberContent}
                    aria-haspopup="true"
                    aria-owns={anchorEl ? `member${user.id}` : undefined}
                    onClick={e => {
                      if (user.id !== me.id) {
                        e.stopPropagation()
                        handleMenu(e.currentTarget)
                      }
                    }}
                  >
                    <div className={style.avatarWrapper}>
                      <Avatar img={user.avatar} preview={undefined} />
                    </div>
                    {user.name}
                    {user.id === server.host.id && (
                      <Crown className={style.crown} />
                    )}
                  </div>
                  <MemberOption
                    user={user}
                    server={server}
                    handleMenu={handleMenu}
                    anchorEl={anchorEl}
                  />
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
                <div
                  key={user.id}
                  className={[style.member, style.offline].join(' ')}
                >
                  <div
                    className={style.memberContent}
                    aria-haspopup="true"
                    aria-owns={anchorEl ? `member${user.id}` : undefined}
                    onClick={e => {
                      if (user.id !== me.id) {
                        e.stopPropagation()
                        handleMenu(e.currentTarget)
                      }
                    }}
                  >
                    <div className={style.avatarWrapper}>
                      <Avatar img={user.avatar} preview={undefined} />
                    </div>
                    {user.name}
                    {user.id === server.host.id && (
                      <Crown className={style.crown} />
                    )}
                  </div>
                  <MemberOption
                    user={user}
                    server={server}
                    handleMenu={handleMenu}
                    anchorEl={anchorEl}
                  />
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
