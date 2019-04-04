import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import style from './Button.module.css'

const Button = ({ children, ...buttonProps }) => {
  const buttonStyle = classNames(style.button, {
    [style.full]: buttonProps.fullwidth,
    [style.small]: buttonProps.small,
    [style.inverted]: buttonProps.inverted,
    [style.secondary]: buttonProps.secondary && !buttonProps.inverted,
    [style.loading]: buttonProps.loading
  })

  return (
    <button className={buttonStyle} {...buttonProps}>
      {buttonProps.loading ? <StyledSpinner /> : children}
    </button>
  )
}

const StyledSpinner = withStyles({
  circle: {
    color: "#FFF",
  },
  root: {
    width: '28px !important',
    height: '28px !important'
  }
})(CircularProgress)

export default Button
