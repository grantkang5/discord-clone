import React, { useState } from 'react'
import style from './HomeContent.module.css'
import Arrow from '@material-ui/icons/ArrowForwardIos'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../../../components/Button'
import { useMutation } from 'react-apollo-hooks'
import { ACCEPT_SERVER_INVITATION } from '../../../../graphql/mutations';

const Invitations = ({ invitations }) => {
  const [open, handleDialog] = useState(false)
  const handleOpen = () => handleDialog(true)
  const handleClose = () => handleDialog(false)
  const acceptInvitation = useMutation(ACCEPT_SERVER_INVITATION)

  return (
    <React.Fragment>
      <div className={style.subHeader}>Invitations ({invitations.length})</div>
      {invitations.map(invitation => {
        return (
          <div
            key={invitation.id}
            className={style.invitationItem}
            onClick={handleOpen}
          >
            <div className={style.left}>
              <span className={style.name}>{invitation.sender.name} - </span>
              <span className={style.server}>{invitation.server.name}</span>
            </div>

            <Arrow className={style.arrow} />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="invitation-dialog"
            >
              <div className="modal">
                <Button
                  onClick={() =>
                    acceptInvitation({
                      variables: { invitationId: invitation.id }
                    })
                  }
                >
                  Accept
                </Button>
                <span style={{ margin: '15px' }}>or</span>
                <Button style={{ backgroundColor: '#3ca374' }}>Decline</Button>
              </div>
            </Dialog>
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default Invitations
