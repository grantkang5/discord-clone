import React, { useState, useCallback, useEffect } from 'react'
import style from './MyAccount.module.css'
import { useMe } from '../../../../../../services/auth.service'
import { FormikActions, FormikProps, withFormik } from 'formik'
import { colorHash } from '../../../../../../services/hash.service'
import FormInput from '../../../../../../components/FormInput'
import validationSchema from './validationSchema'
import Button from '../../../../../../components/Button'
import { useDropzone } from 'react-dropzone'
import { User, File } from '../../../../../../graphql/types'
import Avatar from '../../../../../../components/Avatar'

interface FormValues {
  name: string
  email: string
  currentPassword: string
  newPassword: string
  avatar: File | string
}

interface Props {
  closeEditing: Function
  submitEdit: Function
  me: User
}

const EditAccount = ({
  closeEditing,
  me,
  submitEdit,
  ...formikProps
}: Props & FormikProps<FormValues>) => {
  const [previewFiles, setPreviewFiles] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0]
    setPreviewFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
    formikProps.setFieldValue('avatar', uploadedFile)
  }, [])
  const [changingPassword, handleChangingPassword] = useState(false)
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  })

  useEffect(
    () => () => {
      // Clean up URL ObjectURL blobs
      previewFiles.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [previewFiles]
  )

  return (
    <React.Fragment>
      <div className={style.avatarContainer}>
        <div className={style.avatarWrapper}>
          <Avatar img={formikProps.values.avatar} preview={previewFiles[0]} />
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
              name="name"
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
  submitEdit: Function
  me: User
}

export default withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ me }) => ({
    name: me.name,
    email: me.email,
    currentPassword: '',
    newPassword: '',
    avatar: me.avatar
  }),
  validationSchema,
  handleSubmit: (
    { name, email, currentPassword, newPassword, avatar },
    { resetForm, setSubmitting, setFieldError, props }
  ) => {
    props
      .submitEdit({
        variables: {
          userId: props.me.id,
          name,
          email,
          currentPassword,
          newPassword,
          avatar
        }
      })
      .then(
        () => {
          const { me } = props
          setSubmitting(false)
          resetForm({
            name: me.name,
            email: me.email,
            currentPassword: '',
            newPassword: '',
            avatar: me.avatar
          })
        },
        ({ graphQLErrors }) => {
          setFieldError('currentPassword', graphQLErrors[0].message)
          setSubmitting(false)
        }
      )
  },
  displayName: 'EditAccount'
})(EditAccount)
