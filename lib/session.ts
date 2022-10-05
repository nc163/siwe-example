import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session }
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production',
    },
  })

export default withSession
