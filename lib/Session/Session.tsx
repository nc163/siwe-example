import { useRouter } from 'next/router'
import { createContext, useEffect, ReactElement, useReducer } from 'react'
import { useAccount } from 'wagmi'

export const SessionContext = createContext<SessionState>({
  state: {
    signin: false,
    loading: true,
    address: null,
  },
  dispatch: (SessionAction) => {},
})

const sessionReducer = (state: SessionStateType, action: SessionAction): SessionStateType => {
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

  useEffect(() => {
    if (!isConnected) return

    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        dispatch({ type: 'connect', update: { address: json.address, loading: false, signin: Boolean(json.address) } })
      } catch (e) {
        console.error(e)
        dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
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
