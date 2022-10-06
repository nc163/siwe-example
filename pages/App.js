import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSession } from '@lib/Session'

export default function App() {
  const { disconnect } = useSession()

  return (
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
  )
}
