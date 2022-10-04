import 'styles/globals.css'
import { WagmiConfig } from 'wagmi'
import { wagmiClient } from '@lib/wagmiClient'

function MyDApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyDApp
