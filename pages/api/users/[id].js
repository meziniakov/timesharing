import dbConnect from '../../../lib/db'
import Users from '../../../models/User'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const mentor = await Users.findById(id)
        if (!mentor) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: mentor })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const mentor = await Users.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!mentor) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: mentor })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deletedMentor = await Users.deleteOne({ _id: id })
        if (!deletedMentor) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
