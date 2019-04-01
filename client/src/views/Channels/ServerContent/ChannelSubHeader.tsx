import React, { useState } from 'react'
import style from './ServerContent.module.css'
import RightArrow from '@material-ui/icons/ArrowRight'
import classNames from 'classnames'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { useMe } from '../../../services/auth.service'
import { Server, Channel } from '../../../graphql/types'
import Dialog from '@material-ui/core/Dialog'
import CreateChannel from './CreateChannel'

interface Props {
  children: React.ReactNode | string
  open?: boolean
  handleClick: () => void
  label: string
  server: Server
  channel: Channel
}

const ChannelSubHeader = ({
  children,
  open,
  handleClick,
  label,
  server,
  channel
}: Props) => {
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
            if (channel && child.key === channel.id) {
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

    if (!open && channel) {
      return (
        <div className={style.content}>
          {React.Children.map(children, (child: any) => {
            if (child.key === channel.id) {
              return React.cloneElement(child as React.ReactElement<any>, {
                style: {
                  background: 'rgba(185,187,190,.1)',
                  color: '#f6f6f7'
                }
              })
            }
            return <div hidden />
          })}
        </div>
      )
    }

    return null
  }

  return (
    <React.Fragment>
      <div className={style.subHeader} onClick={handleClick}>
        <RightArrow className={arrowClass} />
        {label}

        {server.host.id === me.id ? (
          <AddIcon
            className={style.addIcon}
            onClick={e => {
              e.stopPropagation()
              handleDialog(true)
            }}
          />
        ) : null}
      </div>

      <CreateChannel
        server={server}
        open={dialogOpen}
        handleDialog={handleDialog}
      />
      {renderContent()}
    </React.Fragment>
  )
}

export default ChannelSubHeader
