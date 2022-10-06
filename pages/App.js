import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useSession } from '@lib/Session'

const theme = createTheme()

export default function App() {
  const { disconnect } = useSession()
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            ようこそ
          </Typography>
          <Button fullWidth variant='contained' sx={{ mt: 1, mb: 1 }} onClick={() => disconnect()}>
            ログアウト
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
