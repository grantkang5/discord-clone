import React, { useState } from 'react'
import style from './CreateChannel.module.css'
import { Formik, FormikProps } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../../../components/Button'
import validationSchema from './validationSchema'
import FormInput from '../../../../components/FormInput'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { Server } from '../../../../graphql/types'
import { useMutation } from 'react-apollo-hooks';
import { CREATE_CHANNEL } from '../../../../graphql/mutations';

interface FormValues {
  channel: string
  channelType: 'text' | 'voice'
}

interface Props {
  open: boolean
  handleDialog: Function
  server: Server
}

const StyledFormControlLabel = withStyles({
  label: {
    color: '#FFF',
    fontSize: '1.05rem;'
  }
})(FormControlLabel)

const CreateChannel = ({ open, handleDialog, server }: Props) => {
  const createChannel = useMutation(CREATE_CHANNEL)
  return (
    <Dialog
      open={open}
      onClose={() => handleDialog(false)}
      aria-labelledby="create-channel-dialog"
    >
      <div className="modal dark">
        <Formik
          initialValues={{
            channel: '',
            channelType: 'text'
          }}
          onSubmit={({ channel, channelType }, { setSubmitting }) => {
            createChannel({
              variables: {
                name: channel,
                type: channelType,
                serverId: server.id
              }
            }).then(() => {
              setSubmitting(false)
              handleDialog(false)
            })
          }}
          validationSchema={validationSchema}
          render={(props: FormikProps<FormValues>) => {
            return (
              <form onSubmit={props.handleSubmit} className={style.channelForm}>
                <header className={style.header}>
                  <h4>Create {props.values.channelType} Channel</h4>
                  <p>in {server.name}</p>
                </header>

                <div className={style.channelType}>
                  <p>Channel Type</p>
                  <RadioGroup
                    aria-label="channel-type"
                    name="channelType"
                    value={props.values.channelType}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      props.setFieldValue('channelType', e.target.value)
                    }
                  >
                    <StyledFormControlLabel
                      value="text"
                      control={<Radio color="primary" />}
                      label="Text Channel"
                    />
                    <StyledFormControlLabel
                      value="voice"
                      control={<Radio color="primary" />}
                      label="Voice Channel"
                    />
                  </RadioGroup>
                </div>
                <div className={style.inputWrapper}>
                  <FormInput
                    autoComplete="off"
                    formikProps={props}
                    label="channel name"
                    type="text"
                    name="channel"
                  />
                </div>

                <div className={style.bottom}>
                  <Button
                    type="submit"
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                    small
                  >
                    Create Channel
                  </Button>

                  <button onClick={() => handleDialog(false)} className={style.button}>
                    Cancel
                  </button>
                </div>
              </form>
            )
          }}
        />
      </div>
    </Dialog>
  )
}

export default CreateChannel
