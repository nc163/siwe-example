import { useEffect, useState } from 'react'

import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'

export function useSIWE() {
  const { isConnected, address } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const [state, setState] = useState<{
    loading?: boolean
    nonce?: string
    address?: string
  }>({ loading: false, nonce: undefined })

  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {
        console.log('me error')
      }
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  const createSiweMessage = async (address, statement) => {
    const res = await fetch(`/api/nonce`)
    const chainId = activeChain?.id
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId,
      nonce: await res.text(),
    })
    return message.prepareMessage()
  }

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    fetchNonce()
  }, [])

  const signInWithEthereum = async (
    onSuccess: (args: { address: string }) => void,
    onError: (args: { error: Error }) => void,
  ) => {
    try {
      const chainId = activeChain?.id
      if (!address || !chainId) return

      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      setState((x) => ({ ...x, address }))
      onSuccess({ address })
      console.log('ok')
    } catch (error) {
      console.log('error')
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      setState((x) => ({ ...x, error }))
      fetchNonce()
    }
  }

  return { signInWithEthereum, state }
}
