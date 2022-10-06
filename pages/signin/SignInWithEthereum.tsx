import Button from '@mui/material/Button'
import { ReactElement, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useSession } from '@lib/Session'
import { useSiweVerify } from '@lib/hooks/useSiwe/frontend/useSiweVerify'

export default function SignInWithEthereum(): ReactElement {
  const { address } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { signInWithEthereum, siweState } = useSiweVerify()
  const { confirmation } = useSession()

  useEffect(() => {
    confirmation()
  }, [siweState])

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        sx={{ mt: 1, mb: 1 }}
        onClick={() => {
          signInWithEthereum({
            domain: window.location.host,
            address: address,
            uri: window.location.origin,
            chainId: activeChain?.id,
            resources: null,
          })
        }}
      >
        Sign in with Ethereum
      </Button>
    </>
  )
}
