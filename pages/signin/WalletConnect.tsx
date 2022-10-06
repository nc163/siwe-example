import Button from '@mui/material/Button'
import { ReactElement } from 'react'
import { useConnect } from 'wagmi'

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
