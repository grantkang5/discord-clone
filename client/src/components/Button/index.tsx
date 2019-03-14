import React from 'react'
import classNames from 'classnames'

import style from './Button.module.css'

const Button = ({
  children,
  ...buttonProps
}) => {
  const buttonStyle = classNames(style.button, {
    [style.full]: buttonProps.fullwidth,
    [style.small]: buttonProps.small,
    [style.inverted]: buttonProps.inverted
  })

  // TODO - Add loading render and prop
  return (
    <button className={buttonStyle} {...buttonProps}>
      {children}
    </button>
  )
}

export default Button
