import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0C7FFF' },
    secondary: { main: '#FFE979' }
  },
  typography: {
    useNextVariants: true,
  },
})

export default theme