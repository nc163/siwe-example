import { useEffect, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useSignMessage, useAccount } from 'wagmi'

export interface SiweState {
  signin: boolean
  loading: boolean
  nonce?: string
  address?: string
}

export function useSiweSession() {
  const { isConnected } = useAccount()

  const [siweState, setState] = useState<SiweState>({
    signin: false,
    loading: false,
    nonce: undefined,
  })

  useEffect(() => {
    if (!isConnected) return

    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {
        setState((x) => ({ ...x, signin: false }))
      }
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [isConnected])

  return { siweState }
}
