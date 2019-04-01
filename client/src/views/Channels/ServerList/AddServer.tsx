import React, { useState } from 'react'
import style from './ServerList.module.css'
import Add from '@material-ui/icons/Add'
import { useMutation } from 'react-apollo-hooks'
import { CREATE_SERVER, JOIN_SERVER } from '../../../graphql/mutations'
import { useMe } from '../../../services/auth.service'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../../components/Button'
import { GET_USER_SERVERS, GET_RECEIVED_INVITATIONS } from '../../../graphql/queries'
import { hashids } from '../../../services/hash.service'

const AddServer = () => {
  const me = useMe()
  const [open, handleDialog] = useState(false)
  const handleOpen = () => handleDialog(true)
  const handleClose = () => handleDialog(false)
  const addServer = useMutation(CREATE_SERVER)
  const joinServer = useMutation(JOIN_SERVER)

  const handleAddServer = () => {
    const serverName = prompt('Server name: ')
    addServer({
      variables: { name: serverName, userId: me.id },
      refetchQueries: [
        { query: GET_USER_SERVERS, variables: { userId: me.id } }
      ],
      optimisticResponse: {
        createServer: {
          id: -1,
          name: serverName,
          host: {
            id: me.id,
            email: me.email,
            __typename: 'User'
          },
          __typename: 'Server'
        }
      }
    }).then(() => handleClose())
  }
  const handleJoinServer = () => {
    const serverIdEncoded = prompt('Server id: ')
    const serverId = hashids.decode(serverIdEncoded)[0]
    joinServer({
      variables: {
        userId: me.id,
        serverId
      },
      refetchQueries: [
        { query: GET_USER_SERVERS, variables: { userId: me.id } },
        { query: GET_RECEIVED_INVITATIONS, variables: { userId: me.id } }
      ]
    }).then(() => handleClose())
  }

  return (
    <React.Fragment>
      <div className={style.addServerWrapper} onClick={handleOpen}>
        <div className={style.addServerIcon}>
          <a className={style.addServerIconLink}>
            <Add className={style.addIcon} />
          </a>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-server-dialog"
      >
        <div className="modal">
          <Button onClick={handleAddServer}>Create a server</Button>
          <span style={{ margin: '15px' }}>or</span>
          <Button
            style={{ backgroundColor: '#3ca374' }}
            onClick={handleJoinServer}
          >
            Join a server
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  )
}

export default AddServer

// TODO - use repo: hashIds to create server hash ids to send to users
