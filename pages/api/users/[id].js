import dbConnect from '../../../lib/db'
import Mentors from '../../../models/Mentors.js'
import Users from '../../../models/userModel'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
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

    case 'PUT' /* Edit a model by its ID */:
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

    case 'DELETE' /* Delete a model by its ID */:
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
