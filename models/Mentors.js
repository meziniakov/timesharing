import mongoose from 'mongoose'

const mentorsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  job: String,
})

module.exports =
  mongoose.models.Mentors || mongoose.model('Mentors', mentorsSchema)
