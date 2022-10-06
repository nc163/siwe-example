import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce, SiweMessage } from 'siwe'
import { ironOptions } from './ironOptions'
import prisma from '@lib/prisma'
import withSession from '@lib/session'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('⭐️ <=| nonce.ts' + req.session.nonce)

  const { method } = req
  switch (method) {
    case 'POST':
      const { message, signature } = req.body
      let sendValue = false
      try {
        /*  eip-4361 message
         *  https://eips.ethereum.org/EIPS/eip-4361
         *  {
         *    domain: 'localhost:3000',
         *    address: '0x0000000000000000000000000000000000000000',
         *    statement: 'Sign in with Ethereum to the app.',
         *    uri: 'http://localhost:3000',
         *    version: '1',
         *    nonce: 'XXXXXXXXXXXXXXXXX',
         *    issuedAt: '2000-01-01T00:00:00.000Z',
         *    expirationTime: undefined,
         *    notBefore: undefined,
         *    requestId: undefined,
         *    chainId: 1,
         *    resources: undefined
         *  }
         */
        const siweMessage = new SiweMessage(message)

        let fields = await siweMessage.validate(signature)
        if (fields.nonce !== req.session.nonce) return res.status(422).json({ message: 'Invalid nonce.' })

        let address = siweMessage.address

        // TODO: ENS-Name-Address to Wallet-Address
        // https://docs.ens.domains/dapp-developer-guide/working-with-ens

        const account = await prisma.account.upsert({
          where: { ethAddr: address },
          update: { ethAddr: address, nance: siweMessage.nonce },
          create: { ethAddr: address, nance: siweMessage.nonce },
        })

        sendValue = true
      } catch (e) {
        console.error(e)
      }
      res.send(sendValue)
      break
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
