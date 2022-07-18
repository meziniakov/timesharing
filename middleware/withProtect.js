import jwt from 'jsonwebtoken'
import User from '../models/User'
import { promisify } from 'util'

const withProtect = (handler) => {
  return async (req, res) => {
    let token
    if (req.cookies && req.cookies.app_accessToken) {
      token = req.cookies.app_accessToken
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Пожалуйста, авторизуйтесь!' })
    }

    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

      const currentUser = await User.findById(decoded.id)
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exist.',
        })
      }
      req.user = currentUser
      return handler(req, res)
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: 'Пожалуйста, авторизуйтесь!!' })
    }
  }
}
export default withProtect
