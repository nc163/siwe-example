import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useAccount, useDisconnect } from 'wagmi'
import SignInWithEthereum from './SignInWithEthereum'
import WalletConnect from './WalletConnect'

export default function SignIn() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        {isConnected ? <SignInWithEthereum /> : <WalletConnect />}
        {isConnected && (
          <Button fullWidth variant='contained' sx={{ mt: 1, mb: 1 }} onClick={() => disconnect()}>
            Wallet Disconnect
          </Button>
        )}
      </Box>
    </>
  )
}
