import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { ironOptions } from './ironOptions'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('⭐️ <=| me.ts ' + req.session.siwe?.address)

  const { method } = req
  switch (method) {
    case 'GET':
      res.send({ address: req.session.siwe?.address })
      console.log('⭐️ =>| me.ts ' + req.session.siwe?.address)

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
