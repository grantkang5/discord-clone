import React from 'react'
import style from './Members.module.css'

const Members = ({ users }) => {
  return (
    <div className={style.membersWrap}>
      <div className={style.membersScrollWrapper}>
        <div className={style.membersScroller}>
          {
            users.map(user => {
              return (
                <div key={user.id}>
                  {user.name}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Members