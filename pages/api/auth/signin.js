import User from '../../../models/User'
import { compare, hash } from 'bcrypt'
import dbConnect from '../../../lib/db'

async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { email, password } = req.body

      if (!email || !email.includes('@') || !password) {
        res.status(422).json({ message: 'Некореектные данные' })
        return
      }

      const candidate = await User.findOne({ email })

      if (!candidate) {
        res
          .status(422)
          .json({ message: 'Пользователя с таким email не существует' })
        return
      }

      if (!candidate.password) {
        res.status(422).json({ message: 'У пользователя не задан пароль' })
        return
      }

      const checkPassword = await compare(password, candidate.password)
      //Incorrect password - send response
      if (!checkPassword) {
        res.status(422).json({ message: 'Пароль не верный' })
        return
      }

      res.status(200)
    } else {
      res.status(500).json({ message: 'Route not valid' })
    }
  } catch (error) {
    console.log(error)
  }
}

export default handler
