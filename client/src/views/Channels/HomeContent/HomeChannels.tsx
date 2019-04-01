import React from 'react'
import style from './HomeContent.module.css'
import { useQuery } from 'react-apollo-hooks'
import { GET_RECEIVED_INVITATIONS } from '../../../graphql/queries'
import { useMe } from '../../../services/auth.service'
import ChannelWrapper from '../../../components/ChannelWrapper'
import Invitations from './Invitations'

const HomeChannels = () => {
  const me = useMe()
  const { data } = useQuery(GET_RECEIVED_INVITATIONS, {
    variables: { userId: me.id },
    suspend: true
  })
  const invitations = data.getReceivedInvitations

  return (
    <ChannelWrapper>
      <div className={style.homeNavigation}>
        <Invitations invitations={invitations} />
      </div>
    </ChannelWrapper>
  )
}

export default HomeChannels
