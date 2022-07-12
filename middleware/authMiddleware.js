import jwt from 'jsonwebtoken'

const authMiddleware = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedToken
      return handler(req, res)
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
  }
}
export default authMiddleware
