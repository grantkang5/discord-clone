import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import { REMOVE_USER_FROM_SERVER } from '../../../../graphql/mutations'
import { useMe } from '../../../../services/auth.service'
import { useMutation } from 'react-apollo-hooks'
import { GET_USER_SERVERS } from '../../../../graphql/queries'

const MemberOption = ({ server, user, handleMenu, anchorEl }) => {
  const me = useMe()
  const kickUser = useMutation(REMOVE_USER_FROM_SERVER)
  return (
    <StyledPopover
      id={`member${user.id}`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => handleMenu(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right'
      }}
    >
      {server.host.id === me.id ? (
        <StyledMenuItem
          onClick={() => {
            kickUser({
              variables: { serverId: server.id, userId: user.id },
              refetchQueries: [
                {
                  query: GET_USER_SERVERS,
                  variables: { userId: me.id }
                }
              ]
            }).then(() => {
              handleMenu(null)
            })
          }}
        >
          Kick from server
        </StyledMenuItem>
      ) : null}
    </StyledPopover>
  )
}

const StyledPopover = withStyles({
  paper: {
    backgroundColor: '#282b30',
    width: 150,
    marginTop: 4,
    zIndex: 4
  }
})(Popover)

const StyledMenuItem = withStyles({
  root: {
    color: '#FFF',
    fontSize: '0.8rem',
    zIndex: 4
  }
})(MenuItem)

export default MemberOption
