import React, { useState } from 'react'
import style from './ServerContent.module.css'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { Server } from '../../../../graphql/types'
import { useMe } from '../../../../services/requireAuth'
import { DELETE_SERVER } from '../../../../graphql/mutations'
import { GET_USER_SERVERS } from '../../../../graphql/queries'
import { useMutation } from 'react-apollo-hooks'
import history from '../../../../config/history'
import ServerInvite from './ServerInvite'

interface Props {
  server: Server
}

const ServerHeader = ({ server }: Props) => {
  console.log('[ServerHeader]: ', server)
  const me = useMe()
  const [anchorEl, handleMenu] = useState(null)
  const [inviteDialog, handleInviteDialog] = useState(false)
  const handleClose = () => handleMenu(null)
  const closeInviteDialog = () => handleInviteDialog(false)

  const deleteServer = useMutation(DELETE_SERVER, {
    variables: { serverId: server.id }
  })

  return (
    <div className={style.headerWrapper}>
      <header
        className={style.header}
        onClick={e => handleMenu(e.currentTarget)}
        aria-haspopup="true"
        aria-owns={anchorEl ? 'server-menu' : undefined}
      >
        <span>{server.name}</span>
        <ExpandMore className={style.expandMore} />
      </header>

      <StyledPopover
        id="server-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className={style.popover}
      >
        <StyledMenuItem onClick={() => handleInviteDialog(true)}>
          <span style={{ color: '#7289DA' }}>Invite People</span>
        </StyledMenuItem>
        <ServerInvite
          open={inviteDialog}
          handleClose={closeInviteDialog}
          server={server}
        />

        {me.id === server.host.id ? (
          <StyledMenuItem
            onClick={() =>
              deleteServer().then(() => history.push('/channels/@me'))
            }
          >
            <span className={style.delete}>Delete Server</span>
          </StyledMenuItem>
        ) : (
          <StyledMenuItem>
            <span className={style.delete}>Leave Server</span>
          </StyledMenuItem>
        )}
      </StyledPopover>
    </div>
  )
}

const StyledPopover = withStyles({
  paper: {
    backgroundColor: '#282b30',
    width: 280,
    marginTop: 4,
    zIndex: 4
  }
})(Popover)

const StyledMenuItem = withStyles({
  root: {
    color: '#FFF',
    fontSize: '0.9rem',
    zIndex: 4
  }
})(MenuItem)

export default ServerHeader
