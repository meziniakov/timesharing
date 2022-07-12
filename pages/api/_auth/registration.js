import User from '../../../models/userModel'
import dbConnect from '../../../lib/db'
import bcrypt from 'bcrypt'

dbConnect()

const Registration = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Не указан email и/или пароль' })
    }

    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'User is existing' })
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await User.create({
      email: email,
      password: hashPassword,
      // role: 'admin',
    })
    await user.save({ validateBeforeSave: false })

    return res.status(200).json({ message: 'Пользователь зарегистрирован' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error._message })
  }
}
export default Registration
