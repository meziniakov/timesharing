import Cookies from 'cookies'

import dbConnect from '../../../lib/db'
import withProtect from '../../../middleware/withProtect'
import withRoles from '../../../middleware/withRoles'

dbConnect()

const handler = async (req, res) => {
  const { method } = req
  if (method !== 'POST') {
    res
      .status(401)
      .json({ success: false, message: 'Только POST запросы допустимы' })
  }
  req.user.refreshTokens = []

  const cookies = new Cookies(req, res)

  cookies.set('st_accessToken', '', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false,
  })

  await req.user.save()

  return res.status(200).json({ success: true, data: {} })
}

export default withProtect(withRoles(handler))
