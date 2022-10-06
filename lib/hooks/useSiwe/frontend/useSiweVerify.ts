import { useEffect, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useSignMessage, useAccount } from 'wagmi'

export interface UseSiweFrontendProps {
  domain: string
  address: string
  uri: string
  chainId: number
  resources?: string[]
}

export interface SiweState {
  signin: boolean
  loading: boolean
  nonce?: string
  address?: string
}

export function useSiweVerify() {
  const { isConnected } = useAccount()

  const { signMessageAsync } = useSignMessage()
  const [siweState, setState] = useState<SiweState>({
    signin: false,
    loading: false,
    nonce: undefined,
  })

  const createSiweMessage = async (params: UseSiweFrontendProps) => {
    const res = await fetch(`/api/nonce`)
    const message = new SiweMessage({
      domain: params.domain,
      address: params.address,
      statement: 'Sign in with Ethereum to the app.',
      uri: params.uri,
      version: '1',
      chainId: params.chainId,
      nonce: await res.text(),
    })

    return message.prepareMessage()
  }

  const fetchNonce = async () => {
    if (!isConnected) return

    try {
      const nonceRes = await fetch('/api/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, signin: false, error: error as Error }))
    }
  }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    if (!isConnected) return

    fetchNonce()
  }, [isConnected])

  const signInWithEthereum = async (params: UseSiweFrontendProps) => {
    if (!isConnected) return

    try {
      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = await createSiweMessage(params)

      const signature = await signMessageAsync({ message: message })

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false, signin: true, address: params.address }))
    } catch (error) {
      setState((x) => ({ ...x, signin: false, loading: false, nonce: undefined, error }))
      fetchNonce()
    }
  }

  return { signInWithEthereum, siweState }
}
