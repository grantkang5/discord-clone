import React, { useState } from 'react'
import style from './MyAccount.module.css'
import Button from '../../../../../../components/Button'
import { useMe } from '../../../../../../services/auth.service'
import { useMutation } from 'react-apollo-hooks'
import { CURRENT_USER } from '../../../../../../graphql/queries'
import { EDIT_NAME, EDIT_USER } from '../../../../../../graphql/mutations'
import { colorHash } from '../../../../../../services/hash.service'
import EditAccount from './EditAccount'
import Avatar from '../../../../../../components/Avatar';

const MyAccount = () => {
  const me = useMe()
  const [editing, handleEditing] = useState(false)
  const closeEditing = () => handleEditing(false)
  const editName = useMutation(EDIT_NAME)
  const submitEdit = useMutation(EDIT_USER)

  return (
    <div className={style.accountWrapper}>
      <h4 className={style.accountHeader}>My Account</h4>

      <div className={style.accountContainer}>
        {editing ? (
          <EditAccount
            closeEditing={closeEditing}
            me={me}
            submitEdit={submitEdit}
          />
        ) : (
          <React.Fragment>
            <div className={style.avatarContainer}>
              <div className={style.avatarWrapper}>
                <Avatar img={me.avatar} preview={undefined} />
              </div>
            </div>

            <div className={style.accountInfoContainer}>
              <div className={style.row}>
                <div>
                  <div className={style.label}>username</div>
                  <div className={style.value}>{me.name}</div>
                </div>

                <Button onClick={() => handleEditing(true)} small="true">
                  Edit
                </Button>
              </div>

              <div className={style.row}>
                <div>
                  <div className={style.label}>email</div>
                  <div className={style.value}>{me.email}</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default MyAccount
