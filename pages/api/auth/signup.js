import User from '../../../models/User'
import { hash } from 'bcrypt'
import dbConnect from '../../../lib/db'

async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    const { email, password } = req.body

    if (!email || !email.includes('@') || !password) {
      res.status(422).json({ message: 'Некореектные данные' })
      return
    }

    const candidate = await User.findOne({ email })

    if (candidate) {
      res
        .status(422)
        .json({ message: 'Пользователь с таким email уже существует' })
      return
    }

    const user = await User.create({ email, password: await hash(password, 7) })
    res.status(200).json({ message: 'Пользователь создан', ...user })
  } else {
    res.status(500).json({ message: 'Route not valid' })
  }
}

export default handler
