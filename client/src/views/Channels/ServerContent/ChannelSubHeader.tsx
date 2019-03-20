import React, { useState } from 'react'
import style from './ServerContent.module.css'
import RightArrow from '@material-ui/icons/ArrowRight'
import classNames from 'classnames'
import { useChannelState } from '../../../services/ChannelsProvider'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { useMe } from '../../../services/requireAuth';
import { Server } from '../../../graphql/types';
import Dialog from '@material-ui/core/Dialog'
import CreateChannel from './CreateChannel'

interface Props {
  children: React.ReactNode | string
  open?: boolean
  handleClick: () => void
  label: string
  server: Server
}

const ChannelSubHeader = ({
  children,
  open,
  handleClick,
  label,
  server
}: Props) => {
  const { activeChannel } = useChannelState()
  const me = useMe()
  const [dialogOpen, handleDialog] = useState(false)
  const arrowClass = classNames(style.arrow, {
    [style.open]: open
  })

  const renderContent = () => {
    if (open) {
      return (
        <div className={style.content}>
          {React.Children.map(children, (child: any) => {
            if (activeChannel && child.key === activeChannel.id) {
              return React.cloneElement(child as React.ReactElement<any>, {
                style: {
                  background: 'rgba(185,187,190,.1)',
                  color: '#f6f6f7'
                }
              })
            }

            return child
          })}
        </div>
      )
    }

    if (!open && activeChannel) {
      return (
        <div className={style.content}>
          {React.Children.map(children, (child: any) => {
            if (child.key === activeChannel.id) {
              return React.cloneElement(child as React.ReactElement<any>, {
                style: {
                  background: 'rgba(185,187,190,.1)',
                  color: '#f6f6f7'
                }
              })
            }
            return null
          })}
        </div>
      )
    }

    return null
  }

  return (
    <React.Fragment>
      <div className={style.subHeader} onClick={handleClick}>
        {open === undefined ? null : <RightArrow className={arrowClass} />}
        {label}

        {server.host.id === me.id ? (
          <Tooltip title="Create channel" placement="top">
            <AddIcon
              className={style.addIcon}
              onClick={(e) => {
                e.stopPropagation()
                handleDialog(true)
              }}
            />
          </Tooltip>
        ) : null}
      </div>

      {renderContent()}
      <CreateChannel
        server={server}
        open={dialogOpen}
        handleDialog={handleDialog}
      />
    </React.Fragment>
  )
}

export default ChannelSubHeader
