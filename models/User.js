import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email не может быть пустым'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: [true, 'Пароль не может быть пустым'],
    },
    image: {
      type: String,
      default: 'default-user.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'editor', 'admin', 'mentor'],
      default: 'mentor',
    },
    customerId: {
      type: String,
    },
    authLoginToken: {
      type: String,
      select: false,
    },
    authLoginExpires: {
      type: Date,
      select: false,
    },
    skills: {
      type: [],
    },
    aboutme: {
      type: [],
    },
    job: {
      type: [],
    },
    fake: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
      // select: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
