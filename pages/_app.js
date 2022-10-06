import 'styles/globals.css'
import { WagmiConfig } from 'wagmi'
import { Session } from '@lib/Session'
import Layout from '@lib/layouts'
import { wagmiClient } from '@lib/wagmiClient'

function MyDApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Layout>
        <Session>
          <Component {...pageProps} />
        </Session>
      </Layout>
    </WagmiConfig>
  )
}

export default MyDApp
