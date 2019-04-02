import React, { useState, useEffect, useContext } from 'react'
import {
  Link,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router-dom'
import classNames from 'classnames'
import pathToRegexp from 'path-to-regexp'
import style from './ServerContent.module.css'
import ChannelWrapper from '../../../components/ChannelWrapper'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { GET_CHANNEL } from '../../../graphql/queries'
import { Server } from '../../../graphql/types'
import { groupBy } from 'lodash'
import SubHeader from '../../../components/SubHeader'
import TextSMS from '@material-ui/icons/Textsms'
import SettingsIcon from '@material-ui/icons/Settings'
import VolumeUp from '@material-ui/icons/VolumeUp'
import history from '../../../config/history'
import ChannelSubHeader from './ChannelSubHeader'
import { DELETE_CHANNEL, CHANGE_CHANNEL } from '../../../graphql/mutations'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import { getPaths } from '../../../services/hash.service'

type Params = {
  channelId: string
  serverId: string
}

type Props = RouteComponentProps<Params> & {
  server: Server
}

const ServerChannels = ({ server, location }: Props) => {
  const client = useApolloClient()
  const { channelPath } = getPaths(location)
  const { data } = useQuery(GET_CHANNEL, {
    variables: { channelId: channelPath },
    suspend: true
  })
  const deleteChannel = useMutation(DELETE_CHANNEL)
  const changeChannel = useMutation(CHANGE_CHANNEL)
  const [anchorEl, handleMenu] = useState(null)
  const [textChannelOpen, handleTextChannel] = useState(true)
  const [voiceChannelOpen, handleVoiceChannel] = useState(true)
  const channels = groupBy(server.channels, channels => channels.type)

  return (
    <ChannelWrapper>
      <div className={style.channelContainer}>
        <ChannelSubHeader
          label="text channels"
          open={textChannelOpen}
          server={server}
          channel={data.channel}
          handleClick={() => handleTextChannel(!textChannelOpen)}
        >
          {channels.text.map(channel => {
            const settingsIconStyle = classNames(style.settingsIcon, {
              [style.show]: data.channel.id === channel.id
            })

            return (
              <div
                key={channel.id}
                className={style.channel}
                onMouseOver={() => {
                  client.query({
                    query: GET_CHANNEL,
                    variables: { channelId: channel.id }
                  })
                }}
                onClick={() => {
                  history.push(`/channels/${server.id}/${channel.id}`)
                }}
              >
                <TextSMS className={style.channelIcon} />
                {channel.name}
                <SettingsIcon
                  className={settingsIconStyle}
                  aria-haspopup="true"
                  aria-owns={anchorEl ? `channel${channel.id}` : undefined}
                  onClick={e => {
                    e.stopPropagation()
                    handleMenu(e.currentTarget)
                  }}
                />

                <StyledPopover
                  id={`channel${channel.id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleMenu(null)}
                >
                  <StyledMenuItem
                    onClick={() => {
                      const newChannelName = prompt('New channel name: ')
                      changeChannel({
                        variables: {
                          channelId: channel.id,
                          name: newChannelName
                        },
                        optimisticResponse: {
                          changeChannel: {
                            id: -1,
                            name: newChannelName,
                            type: 'text',
                            __typename: 'Channel'
                          }
                        }
                      }).then(() => handleMenu(null))
                    }}
                  >
                    Change name
                  </StyledMenuItem>
                  <StyledMenuItem
                    onClick={() => {
                      handleMenu(null)
                      deleteChannel({ variables: { channelId: channel.id } })
                    }}
                  >
                    Delete channel
                  </StyledMenuItem>
                </StyledPopover>
              </div>
            )
          })}
        </ChannelSubHeader>
      </div>

      <div className={style.channelContainer}>
        <SubHeader
          label="voice channels"
          open={voiceChannelOpen}
          handleClick={() => handleVoiceChannel(!voiceChannelOpen)}
        >
          {channels.voice.map(channel => {
            const settingsIconStyle = classNames(style.settingsIcon, {
              [style.show]: data.channel && data.channel.id === channel.id
            })

            return (
              <div key={channel.id} className={style.channel}>
                <VolumeUp className={style.channelIcon} />
                {channel.name}
                <SettingsIcon
                  className={settingsIconStyle}
                />
              </div>
            )
          })}
        </SubHeader>
      </div>
    </ChannelWrapper>
  )
}

const StyledPopover = withStyles({
  paper: {
    backgroundColor: '#282b30',
    width: 150,
    marginTop: 4,
    zIndex: 4
  }
})(Popover)

const StyledMenuItem = withStyles({
  root: {
    color: '#FFF',
    fontSize: '0.8rem',
    zIndex: 4
  }
})(MenuItem)

export default withRouter(ServerChannels)
