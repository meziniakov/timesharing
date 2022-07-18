import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'
import User from '../../../models/User'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export default NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await User.findOne({
          email: credentials.email,
        })
        if (!user) {
          throw new Error('Пользователь с таким email не найден')
        }
        if (!user.password) {
          throw new Error('Пароль у данного пользователя не задан')
        }
        const checkPassword = await compare(credentials.password, user.password)
        if (!checkPassword) {
          throw new Error('Пароль не верный')
        }

        return { email: user.email }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  database: process.env.mongodburl,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === 'google') {
  //       return profile.email_verified && profile.email.endsWith('zifmezin.ru')
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
  // callbacks: {
  //   async jwt(token, user, account, profile, isNewUser) {
  //     if (user) {
  //       // User object only passed on initial JWT creation
  //       const administrators = ['z2941@ya.ru']
  //       token.isAdmin = administrators.includes(user?.email)
  //     }
  //     return token
  //   },
  // },
})
