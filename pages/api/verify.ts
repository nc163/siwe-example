import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce, SiweMessage } from 'siwe'
import {ironOptions} from "./ironOptions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("⭐️ <=| nonce.ts" + req.session.nonce)

  const { method } = req
  switch (method) {
    case 'POST':
      const { message, signature } = req.body;
      const siweMessage = new SiweMessage(message)
      try {
        await siweMessage.validate(signature);
        res.send(true);
      } catch {
        res.send(false);
      }
      break
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
