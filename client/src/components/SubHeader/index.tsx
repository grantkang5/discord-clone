import React from 'react'
import style from './SubHeader.module.css'
import RightArrow from '@material-ui/icons/ArrowRight'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode | string
  open?: boolean
  handleClick: () => void
  label: string
}

const SubHeader = ({ children, open, handleClick, label }: Props) => {
  const arrowClass = classNames(style.arrow, {
    [style.open]: open
  })

  return (
    <React.Fragment>
      <div className={style.subHeader} onClick={handleClick}>
        {open === undefined ? null : <RightArrow className={arrowClass} />}
        {label}
      </div>

      {open && <div className={style.content}>{children}</div>}
    </React.Fragment>
  )
}

export default SubHeader
