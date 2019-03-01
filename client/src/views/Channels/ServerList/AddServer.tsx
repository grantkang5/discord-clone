import React, { useState } from 'react'
import style from './ServerList.module.css'
import Add from '@material-ui/icons/Add'
import { useMutation } from 'react-apollo-hooks'
import { CREATE_SERVER } from '../../../graphql/mutations'
import { useMe } from '../../../services/requireAuth'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../../components/Button'
import { GET_USER_SERVERS } from '../../../graphql/queries'

const AddServer = () => {
  const me = useMe()
  const [open, handleDialog] = useState(false)
  const handleOpen = () => handleDialog(true)
  const handleClose = () => handleDialog(false)
  const addServer = useMutation(CREATE_SERVER)

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
          <Button
            onClick={() => {
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
                      __typename: "User"
                    },
                    __typename: "Server"
                  }
                }
              }).then(() => handleClose())
            }}
          >
            Create a server
          </Button>
          <span style={{ margin: '15px' }}>or</span>
          <Button style={{ backgroundColor: '#3ca374' }}>Join a server</Button>
        </div>
      </Dialog>
    </React.Fragment>
  )
}

export default AddServer
