import React, { useState, useEffect, Suspense } from 'react'
import Dialog from '@material-ui/core/Dialog'
import style from './ServerContent.module.css'
import SearchBar from '../../../components/SearchBar'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_USERS_BY_NAME } from '../../../graphql/queries'
import Button from '../../../components/Button'
import { SEND_INVITATION } from '../../../graphql/mutations'
import { useMe } from '../../../services/auth.service'
import UserContent from '../UserContent'
import { differenceBy } from 'lodash'
import { hashids } from '../../../services/hash.service'

const ServerInvite = ({ open, handleClose, server }) => {
  const me = useMe()
  const [search, handleSearch] = useState('')
  const { data, loading } = useQuery(GET_USERS_BY_NAME, {
    variables: { name: search }
  })
  const sendInvitation = useMutation(SEND_INVITATION)
  const handleInvitation = ({ senderId, receiverId }) => {
    sendInvitation({
      variables: {
        senderId,
        receiverId,
        serverId: server.id
      }
    })
  }
  // FIXME  - meh..
  const filteredUsers =
    data && !loading ? differenceBy(data.usersByName, server.users, 'id') : []

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={style.inviteDialog}>
        <div className={style.filterContainer}>
          <div className={style.headerContainer}>
            <h4>Invite users to {server.name}</h4>
            <div style={{ marginTop: '20px' }}>
              <SearchBar
                placeholder="Search for users"
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={style.inviteScrollWrapper}>
          <div className={style.inviteScroller}>
            {filteredUsers.map(user => (
              <div className={style.inviteRow} key={user.id}>
                <div className={style.names}>
                  <span className={style.name}>{user.name}</span>
                  <span className={style.email}>{user.email}</span>
                </div>

                <Button
                  small="true"
                  inverted="true"
                  onClick={() =>
                    handleInvitation({
                      senderId: me.id,
                      receiverId: user.id
                    })
                  }
                >
                  Invite
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.bottomWrapper}>
          <div className={style.bottomContainer}>
            <h5>or send user invite code...</h5>
            <input
              value={hashids.encode(server.id)}
              className="input"
              readOnly
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ServerInvite
