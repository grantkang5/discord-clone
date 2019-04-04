import React, { useState, useCallback, useEffect } from 'react'
import style from './MyAccount.module.css'
import { useMe } from '../../../../../../services/auth.service'
import { Formik, FormikActions, FormikProps, withFormik } from 'formik'
import { colorHash } from '../../../../../../services/hash.service'
import FormInput from '../../../../../../components/FormInput'
import validationSchema from './validationSchema'
import Button from '../../../../../../components/Button'
import { useDropzone } from 'react-dropzone'
import { User, File } from '../../../../../../graphql/types'
import Avatar from '../../../../../../components/Avatar';

interface FormValues {
  username: string
  email: string
  currentPassword: string
  newPassword: string
  avatar: File | string
}

interface Props {
  closeEditing: Function
  me: User
}

const EditAccount = ({
  closeEditing,
  me,
  ...formikProps
}: Props & FormikProps<FormValues>) => {
  const [file, setFile] = useState([])
  const onDrop = useCallback(([file]) => {
    console.log(file)
    formikProps.setFieldValue('avatar', file)
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
    <React.Fragment>
      <div className={style.avatarContainer}>
        <div className={style.avatarWrapper}>
          <Avatar img={formikProps.values.avatar} />
        </div>
        <input {...getInputProps()} />
        <div className={style.changeAvatar} onClick={open}>
          Change
        </div>
      </div>

      <div className={style.accountInfoContainer}>
        <form onSubmit={formikProps.handleSubmit}>
          <div className="inputWrapper">
            <FormInput
              type="text"
              name="username"
              formikProps={formikProps}
              label="username"
              placeholder={me.name}
            />
          </div>

          <div className="inputWrapper">
            <FormInput
              type="text"
              name="email"
              formikProps={formikProps}
              label="email"
              placeholder={me.email}
            />
          </div>

          <div className="inputWrapper">
            <FormInput
              type="password"
              name="currentPassword"
              formikProps={formikProps}
              label="current password"
            />
          </div>

          {changingPassword ? (
            <div className="inputWrapper">
              <FormInput
                type="password"
                name="newPassword"
                formikProps={formikProps}
                label="new password"
              />

              <span
                className={style.cancelPassword}
                onClick={() => {
                  formikProps.setFieldValue('newPassword', '')
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
                onClick={() => closeEditing(false)}
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
  )
}

interface MyFormProps {
  closeEditing: Function
  me: User
}

export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ me }) => ({
    username: me.name,
    email: me.email,
    currentPassword: '',
    newPassword: '',
    avatar: me.avatar
  }),
  validationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(false)
  },
  displayName: 'EditAccount'
})(EditAccount)
