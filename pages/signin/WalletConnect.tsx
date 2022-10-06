import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { useSession } from '@lib/hooks/useSession'
import Layout from '@lib/layouts'

export default function WalletConnect(): ReactElement {
  const { connect, connectors, isLoading, pendingConnector } = useConnect()

  return (
    <>
      {connectors.map(
        (connector) =>
          connector.ready && (
            <Button key={connector.id} fullWidth variant='contained' sx={{ mt: 1, mb: 1 }} onClick={() => connect({ connector })}>
              {connector.name} {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
            </Button>
          ),
      )}
    </>
  )
}
