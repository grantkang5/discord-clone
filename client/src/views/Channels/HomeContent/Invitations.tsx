import React, { useState } from 'react'
import style from './HomeContent.module.css'
import Arrow from '@material-ui/icons/ArrowForwardIos'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../../components/Button'
import { useMutation } from 'react-apollo-hooks'
import {
  ACCEPT_SERVER_INVITATION,
  DELETE_INVITATION
} from '../../../graphql/mutations'
import {
  GET_USER_SERVERS,
  GET_RECEIVED_INVITATIONS
} from '../../../graphql/queries'
import { useMe } from '../../../services/auth.service'
import SubHeader from '../../../components/SubHeader'

const Invitations = ({ invitations }) => {
  const me = useMe()
  const [open, handleDialog] = useState(false)
  const [invitationsListOpen, handleInvitationsList] = useState(true)
  const handleOpen = invitation => handleDialog(invitation)
  const handleClose = () => handleDialog(false)
  const acceptInvitation = useMutation(ACCEPT_SERVER_INVITATION)
  const deleteInvitation = useMutation(DELETE_INVITATION)
  const handleInvitation = invitation => {
    acceptInvitation({
      variables: { invitationId: invitation.id },
      refetchQueries: [
        {
          query: GET_USER_SERVERS,
          variables: { userId: me.id }
        },
        {
          query: GET_RECEIVED_INVITATIONS,
          variables: { userId: me.id }
        }
      ]
    }).then(() => handleClose())
  }
  const handleDeclineInvitation = invitation => {
    deleteInvitation({
      variables: { invitationId: invitation.id },
      refetchQueries: [
        { query: GET_RECEIVED_INVITATIONS, variables: { userId: me.id } }
      ]
    }).then(() => handleClose())
  }

  return (
    <React.Fragment>
      <SubHeader
        label={`Invitations (${invitations.length})`}
        open={invitationsListOpen}
        handleClick={() => handleInvitationsList(!invitationsListOpen)}
      >
        {invitations.map(invitation => {
          return (
            <div
              key={invitation.id}
              className={style.invitationItem}
              onClick={() => handleOpen(invitation)}
            >
              <div className={style.left}>
                <span className={style.name}>{invitation.sender.name} - </span>
                <span className={style.server}>{invitation.server.name}</span>
              </div>

              <Arrow className={style.arrow} />
            </div>
          )
        })}
      </SubHeader>

      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="invitation-dialog"
      >
        <div className="modal">
          <Button onClick={() => handleInvitation(open)}>Accept</Button>
          <span style={{ margin: '15px' }}>or</span>
          <Button
            onClick={() => handleDeclineInvitation(open)}
            style={{ backgroundColor: '#3ca374' }}
          >
            Decline
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  )
}

export default Invitations
