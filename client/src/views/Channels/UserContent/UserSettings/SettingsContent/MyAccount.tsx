import React from 'react'
import style from './SettingsContent.module.css'
import Button from '../../../../../components/Button'
import { useMe } from '../../../../../services/requireAuth';
import { useMutation } from 'react-apollo-hooks';
import { CURRENT_USER } from '../../../../../graphql/queries';
import { EDIT_NAME } from '../../../../../graphql/mutations';

const MyAccount = () => {
  const me = useMe()
  const editName = useMutation(EDIT_NAME)
  const handleClick = () => {
    const newName = prompt('New name: ')
    editName({
      variables: { userId: me.id, name: newName },
      refetchQueries: [{ query: CURRENT_USER }],
      optimisticResponse: {
        editName: {
          id: -1,
          name: newName,
          __typename: "User"
        }
      }
    })
  }

  return (
    <div className={style.accountWrapper}>
      <h4 className={style.accountHeader}>My Account</h4>

      <div className={style.accountContainer}>
        <div className={style.row}>
          <div>
            <div className={style.label}>username</div>
            <div className={style.value}>{me.name}</div>
          </div>

          <Button onClick={() => handleClick()}>Edit</Button>
        </div>

        <div className={style.row}>
          <div>
            <div className={style.label}>email</div>
            <div className={style.value}>{me.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
