import React, { useState, useCallback } from 'react'
import style from './MyAccount.module.css'
import { useMe } from '../../../../../../services/auth.service'
import { Formik, FormikActions, FormikProps } from 'formik'
import { colorHash } from '../../../../../../services/hash.service'
import FormInput from '../../../../../../components/FormInput'
import validationSchema from './validationSchema'
import Button from '../../../../../../components/Button'
import { useDropzone } from 'react-dropzone'

interface FormValues {
  username: string
  email: string
  currentPassword: string
  newPassword: string,
  avatar: string
}

interface Props {
  handleEditing: Function
}

const EditAccount = ({ handleEditing }: Props) => {
  const me = useMe()
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])
  const [changingPassword, handleChangingPassword] = useState(false)
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  })

  return (
    <Formik
      initialValues={{
        username: me.name,
        email: me.email,
        currentPassword: '',
        newPassword: '',
        avatar: me.avatar
      }}
      onSubmit={(
        { username, email, currentPassword, newPassword, avatar }: FormValues,
        { setSubmitting }: FormikActions<FormValues>
      ) => {
        setSubmitting(false)
      }}
      validationSchema={validationSchema}
      render={(props: FormikProps<FormValues>) => (
        <React.Fragment>
          <div className={style.avatarContainer}>
            <div className={style.avatarWrapper}>
              {me.avatar ? (
                <div className={style.avatar} />
              ) : (
                <div
                  className="defaultAvatar"
                  style={{ backgroundColor: colorHash.hex(`${me.id}`) }}
                />
              )}
            </div>
            <input {...getInputProps()} />
            <div className={style.changeAvatar} onClick={open}>
              Change
            </div>
          </div>

          <div className={style.accountInfoContainer}>
            <form onSubmit={props.handleSubmit}>
              <div className="inputWrapper">
                <FormInput
                  type="text"
                  name="username"
                  formikProps={props}
                  label="username"
                  placeholder={me.name}
                />
              </div>

              <div className="inputWrapper">
                <FormInput
                  type="text"
                  name="email"
                  formikProps={props}
                  label="email"
                  placeholder={me.email}
                />
              </div>

              <div className="inputWrapper">
                <FormInput
                  type="password"
                  name="currentPassword"
                  formikProps={props}
                  label="current password"
                />
              </div>

              {changingPassword ? (
                <div className="inputWrapper">
                  <FormInput
                    type="password"
                    name="newPassword"
                    formikProps={props}
                    label="new password"
                  />

                  <span
                    className={style.cancelPassword}
                    onClick={() => {
                      props.setFieldValue('newPassword', '')
                      handleChangingPassword(false)
                    }}
                  >
                    NVM. Keep current password
                  </span>
                </div>
              ) : (
                <span
                  className={style.changePassword}
                  onClick={() => handleChangingPassword(true)}
                >
                  Change Password?
                </span>
              )}

              <div className="divider" />

              <div className={style.buttonsContainer}>
                <div className={style.cancelButton}>
                  <Button
                    type="button"
                    small="true"
                    inverted="true"
                    onClick={() => handleEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className={style.saveButton}>
                  <Button type="submit" small="true">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      )}
    />
  )
}

export default EditAccount
