import dbConnect from '../../../lib/db'
import User from '../../../models/userModel'
import withProtect from '../../../middleware/withProtect'
import authMiddleware from '../../../middleware/authMiddleware'
import withRoles from '../../../middleware/withRoles'

const handler = async (req, res) => {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}).skip(41).limit(15)
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const users = await User.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
// export default authMiddleware(withRoles(handler, 'admin'))
export default handler
