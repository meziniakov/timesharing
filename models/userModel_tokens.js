import crypto from 'crypto'
import mongoose from 'mongoose'
import validator from 'validator'

const refreshToken = new mongoose.Schema({
  token: {
    type: String,
    trim: true,
  },
  expiration: {
    type: Date,
  },
  issued: {
    type: Date,
    default: Date.now(),
  },
  select: false,
})

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
      // unique: true,
      // required: [true, 'Email cannot be empty'],
      trim: true,
      lowercase: true,
      // validate: [validator.isEmail],
    },
    password: {
      type: String,
      // required: [true, 'Password cannot be empty'],
    },
    image: {
      type: String,
      default: 'default-user.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'editor', 'admin', 'mentor', 'pro'],
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
    refreshTokens: [refreshToken],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

userSchema.methods.createAuthToken = function () {
  const authToken = crypto.randomBytes(3).toString('hex')

  this.authLoginToken = crypto
    .createHash('sha256')
    .update(authToken)
    .digest('hex')

  this.authLoginExpires = Date.now() + 10 * 60 * 1000

  return authToken
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
