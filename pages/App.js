import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState, useEffect } from 'react'
import { SignInButton } from './SignMessage'
import styles from 'styles/Home.module.css'

export default function App() {
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

  console.log(isConne)

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
      {pendingConnector.name}
      {isConnected}
      {connectors.map((connector) => (
        <button
          suppressHydrationWarning={true}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </main>
  )
}
