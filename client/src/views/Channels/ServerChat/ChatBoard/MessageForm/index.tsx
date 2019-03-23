import React from 'react'
import { Formik, FormikActions, FormikProps } from 'formik'
import style from './MessageForm.module.css'
import { useChannelState } from '../../../../../services/ChannelsProvider';
import AddCircle from '@material-ui/icons/AddCircle'
import { useMutation } from 'react-apollo-hooks';
import { POST_MESSAGE } from '../../../../../graphql/mutations';
import validationSchema from './validationSchema';
import { useMe } from '../../../../../services/requireAuth';
import moment from 'moment'

interface FormValues {
  message: string
}

const MessageForm = () => {
  const me = useMe()
  const { activeChannel } = useChannelState()
  const postMessage = useMutation(POST_MESSAGE)

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={({ message }, { setSubmitting, setFieldError }) => {
        postMessage({
          variables: {
            channelId: activeChannel.id,
            message
          },
          optimisticResponse: {
            postMessage: {
              channel: {
                id: activeChannel.id,
                name: activeChannel.name,
                __typename: "Channel"
              },
              createdAt: moment().toISOString(),
              id: -1,
              message,
              sender: {
                id: me.id,
                name: me.name,
                __typename: "User"
              },
              __typename: "Message"
            }
          }
        }).then(() => {
          setSubmitting(false)
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
                      <AddCircle className={style.addCircle} />
                    </button>

                    <div className={style.attachButtonDivider} />
                  </div>

                  <input
                    id='message'
                    name='message'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={style.messageWrapper}
                    value={props.values.message}
                    autoComplete="off"
                    placeholder={`Message #${activeChannel.name}`}
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
