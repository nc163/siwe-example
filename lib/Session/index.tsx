import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState, ReactElement, useReducer } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'

export interface TSessionState {
  signin: boolean
  loading: boolean
  address?: string
}

const SessionContext = createContext({
  state: {
    signin: false,
    loading: true,
    address: null,
  },
  dispatch: (TAction) => {},
})

type TAction = { type: 'connect'; update: TSessionState } | { type: 'disconnect'; update: TSessionState }

const sessionReducer = (state: TSessionState, action: TAction): TSessionState => {
  switch (action.type) {
    case 'connect': {
      return { ...state, ...action.update }
    }
    case 'disconnect': {
      return { ...state, ...action.update }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

export const Session = ({ children }: { children: ReactElement }): ReactElement => {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [state, dispatch] = useReducer(sessionReducer, {
    signin: false,
    loading: true,
  })

  //   const [state, setState] = useState<TSessionState>({
  //     signin: false,
  //     loading: true,
  //   })

  useEffect(() => {
    if (!isConnected) return

    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        dispatch({ type: 'connect', update: { address: json.address, loading: false, signin: Boolean(json.address) } })
        // setState((x) => ({ ...x, address: json.address, signin: Boolean(json.address) }))
      } catch (_error) {
        console.log(_error)
        dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
        // setState((x) => ({ ...x, signin: false }))
      }
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [isConnected])

  useEffect(() => {
    if (!isConnected || !state.signin) {
      if (router.asPath != '/signin') {
        let done = '' //router.asPath
        router.push(`/signin?done=${done}`)
      }
      return
    }

    router.push(`/`)
  }, [isConnected, state])

  return <SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  const { dispatch } = useContext(SessionContext)

  const confirmation = async () => {
    try {
      const res = await fetch('/api/me')
      const json = await res.json()
      dispatch({ type: 'connect', update: { address: json.address, loading: false, signin: Boolean(json.address) } })
      // setState((x) => ({ ...x, address: json.address, signin: Boolean(json.address) }))
    } catch (_error) {
      console.log(_error)
      dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
      // setState((x) => ({ ...x, signin: false }))
    }
  }

  const disconnect = async () => {
    await fetch('/api/logout')
    dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
  }

  return { confirmation, disconnect }
}
