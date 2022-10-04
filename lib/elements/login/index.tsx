import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState, useEffect } from 'react'
// import styles from '../styles/Home.module.css'
// import { SignInButton } from './SignMessage'

export default function Login(params) {
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  const [state, setState] = useState()

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {}
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  if (isConnected) {
    return (
      <div>
        {/* Account content goes here */}

        {state && state.address ? (
          <div>
            <div>Signed in as {state.address}</div>
            <button
              onClick={async () => {
                await fetch('/api/logout')
                setState({})
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <SignInButton
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
            onError={({ error }) => setState((x) => ({ ...x, error }))}
          />
        )}
      </div>
    )
  }

  return (
    <main className={styles.main}>
      {connectors.map((connector) => (
        <button
          suppressHydrationWarning={true}
          // disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </main>
  )
}
