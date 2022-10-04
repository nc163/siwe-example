import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { ConnectArgs } from '@wagmi/core'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { useSiweFrontend } from '@lib/hooks/useSiwe/useSiweFrontend'

const theme = createTheme()

export default function SignIn() {
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { chain: activeChain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { signInWithEthereum, siweState } = useSiweFrontend()

  useEffect(() => {
    if (!siweState.signin) return
  }, [siweState])

  const connnectWallet = (connector: Partial<ConnectArgs> | undefined) => {
    connect(connector)
  }
  const siwe = () => {
    if (!address || !activeChain?.id) return

    signInWithEthereum({
      domain: window.location.host,
      address: address,
      uri: window.location.origin,
      chainId: activeChain?.id,
    })
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in with Ethereum
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* connected */}
            {/* {isConnected && state && state.address (
                "KOKOKOKO"
            )} */}
            {isConnected && (
              <>
                <Button fullWidth variant='contained' sx={{ mt: 1, mb: 1 }} onClick={siwe}>
                  Sign
                </Button>
                <Button fullWidth variant='contained' sx={{ mt: 1, mb: 1 }} onClick={disconnect}>
                  disconnect
                </Button>
              </>
            )}
            {/* unconnected */}
            {!isConnected &&
              connectors.map(
                (connector) =>
                  connector.ready && (
                    <Button
                      key={connector.id}
                      fullWidth
                      variant='contained'
                      sx={{ mt: 1, mb: 1 }}
                      onClick={() => connnectWallet({ connector })}
                    >
                      {connector.name}{' '}
                      {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                    </Button>
                  ),
              )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
