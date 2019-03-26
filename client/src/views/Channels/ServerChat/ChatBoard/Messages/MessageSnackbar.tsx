import React from 'react'
import classNames from 'classnames'
import Button from '../../../../../components/Button'
import style from './Messages.module.css'

const MessageSnackbar = ({ open, handleOpen, channel, messagesEnd }) => {
  const handleClose = (e) => {
    e.stopPropagation()
    handleOpen(false)
  }
  const jump = (e) => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
    handleClose(e)
  }

  const messageSnackBarStyle = classNames(style.messageSnackbar, {
    [style.show]: open
  })

  return (
    <div className={messageSnackBarStyle} onClick={jump}>
      <span className={style.jump}>Jump to present</span>
      <span className={style.undo} onClick={handleClose}>X</span>
    </div>
  )
}

export default MessageSnackbar
