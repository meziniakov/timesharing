import dbConnect from '../../../lib/db'
import User from '../../../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

const generateAccessToken = (id, role) => {
  const payload = { id, role }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const validPassword = await bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Пароль не верный' })
    }
    const token = generateAccessToken(user._id, user.role)

    const cookies = new Cookies(req, res)

    cookies.set('access', token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, //30 min
    })

    return res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error._message })
  }
}

export default Login
