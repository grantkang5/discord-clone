import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import style from './ServerContent.module.css'
import ChannelWrapper from '../../../components/ChannelWrapper'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_SERVER_CHANNELS } from '../../../graphql/queries'
import { Server } from '../../../graphql/types'
import { groupBy } from 'lodash'
import SubHeader from '../../../components/SubHeader'
import TextSMS from '@material-ui/icons/Textsms'
import SettingsIcon from '@material-ui/icons/Settings'
import VolumeUp from '@material-ui/icons/VolumeUp'
import history from '../../../config/history'
import { useChannelState } from '../../../services/ChannelsProvider'
import ChannelSubHeader from './ChannelSubHeader'
import { DELETE_CHANNEL, CHANGE_CHANNEL } from '../../../graphql/mutations'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'

interface Props {
  server: Server
}

const ServerChannels = ({ server }: Props) => {
  const { data } = useQuery(GET_SERVER_CHANNELS, {
    variables: { serverId: server.id },
    suspend: true
  })
  const deleteChannel = useMutation(DELETE_CHANNEL)
  const changeChannel = useMutation(CHANGE_CHANNEL)
  const { activeChannel, handleActiveChannel } = useChannelState()
  const [anchorEl, handleMenu] = useState(null)
  const [textChannelOpen, handleTextChannel] = useState(true)
  const [voiceChannelOpen, handleVoiceChannel] = useState(true)
  const channels = groupBy(data.getServerChannels, channels => channels.type)

  useEffect(() => {
    if (!activeChannel) {
      handleActiveChannel(channels.text[0])
    }
  }, [])

  return (
    <ChannelWrapper>
      <div className={style.channelContainer}>
        <ChannelSubHeader
          label="text channels"
          open={textChannelOpen}
          server={server}
          handleClick={() => handleTextChannel(!textChannelOpen)}
        >
          {channels.text.map(channel => {
            const settingsIconStyle = classNames(style.settingsIcon, {
              [style.show]: activeChannel && activeChannel.id === channel.id
            })

            return (
              <div
                key={channel.id}
                className={style.channel}
                onClick={() => handleActiveChannel(channel)}
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
                  <StyledMenuItem onClick={() => {
                    const newChannelName = prompt('New channel name: ')
                    changeChannel({
                      variables: { channelId: channel.id, name: newChannelName },
                      optimisticResponse: {
                        changeChannel: {
                          id: -1,
                          name: newChannelName,
                          type: "text",
                          __typename: "Channel"
                        }
                      }
                    })
                  }}>Change name</StyledMenuItem>
                  <StyledMenuItem
                    onClick={() => {
                      deleteChannel({ variables: { channelId: channel.id } })
                        .then(() => handleMenu(null))
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
              [style.show]: activeChannel && activeChannel.id === channel.id
            })

            return (
              <div key={channel.id} className={style.channel}>
                <VolumeUp className={style.channelIcon} />
                {channel.name}
                <SettingsIcon
                  className={settingsIconStyle}
                  onClick={() =>
                    deleteChannel({
                      variables: { channelId: channel.id }
                    })
                  }
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

export default ServerChannels
