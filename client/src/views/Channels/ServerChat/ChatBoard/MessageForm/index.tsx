import React, { useCallback } from 'react'
import { Formik, FormikActions, FormikProps } from 'formik'
import style from './MessageForm.module.css'
import AddCircle from '@material-ui/icons/AddCircle'
import { useMutation } from 'react-apollo-hooks'
import { POST_MESSAGE } from '../../../../../graphql/mutations'
import validationSchema from './validationSchema'
import { useMe } from '../../../../../services/auth.service'
import moment from 'moment'
import { GET_MESSAGES } from '../../../../../graphql/queries'
import { useDropzone } from 'react-dropzone'

interface FormValues {
  message: string
}

const MessageForm = ({ channel }) => {
  const me = useMe()
  const postMessage = useMutation(POST_MESSAGE)
  const onDrop = useCallback(acceptedFiles => {}, [])
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true
  })

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={({ message }, { setSubmitting, setFieldValue }) => {
        postMessage({
          variables: {
            channelId: channel.id,
            message
          },
          optimisticResponse: {
            postMessage: {
              channel: {
                id: channel.id,
                name: channel.name,
                __typename: 'Channel'
              },
              createdAt: moment().toISOString(),
              id: -1,
              message,
              sender: {
                id: me.id,
                name: me.name,
                __typename: 'User'
              },
              __typename: 'Message'
            }
          }
        }).then(() => {
          setSubmitting(false)
          setFieldValue('message', '')
        })
      }}
      validationSchema={validationSchema}
      render={(props: FormikProps<FormValues>) => {
        return (
          <form className={style.messageForm} onSubmit={props.handleSubmit}>
            <div className="flexContainer">
              <div className={style.formWrapper}>
                <div className={style.formContainer}>
                  <div className={style.attachButtonWrapper}>
                    <button className={style.attachButton} type="button">
                      <AddCircle className={style.addCircle} onClick={open} />
                    </button>

                    <div className={style.attachButtonDivider} />
                  </div>

                  <input
                    id="message"
                    name="message"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={style.messageWrapper}
                    value={props.values.message}
                    autoComplete="off"
                    placeholder={`Message #${channel.name}`}
                  />
                </div>
              </div>
            </div>
          </form>
        )
      }}
    />
  )
}

export default MessageForm
