import mongoose from 'mongoose'

const mentiSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  interest: String,
})

module.exports = mongoose.models.Menti || mongoose.model('Menti', mentiSchema)
