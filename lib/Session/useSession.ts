import { useContext, createContext } from 'react'
import { SessionContext } from './Session'

export const useSession = () => {
  const { dispatch } = useContext(SessionContext)

  const confirmation = async () => {
    try {
      const res = await fetch('/api/me')
      const json = await res.json()
      dispatch({ type: 'connect', update: { address: json.address, loading: false, signin: Boolean(json.address) } })
    } catch (_error) {
      console.log(_error)
      dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
    }
  }

  const disconnect = async () => {
    await fetch('/api/logout')
    dispatch({ type: 'disconnect', update: { address: null, loading: false, signin: false } })
  }

  return { confirmation, disconnect }
}
