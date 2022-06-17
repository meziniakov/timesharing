import dbConnect from '../../../lib/db'
import Mentors from '../../../models/Mentors'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const mentors = await Mentors.find({}).limit(5)
        res.status(200).json({ success: true, data: mentors })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const mentors = await Mentors.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: mentors })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
