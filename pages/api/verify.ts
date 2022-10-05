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
      const siweMessage = new SiweMessage(message)
      try {
        await siweMessage.validate(signature)

        await prisma.account.upsert({
          where: { ethAddr: siweMessage.address },
          update: { ethAddr: siweMessage.address, nance: siweMessage.nonce },
          create: { ethAddr: siweMessage.address, nance: siweMessage.nonce },
        })

        res.send(true)
      } catch (e) {
        console.log(e)
        res.send(false)
      }
      break
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
