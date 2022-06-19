import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return profile.email_verified && profile.email.endsWith('z2941@ya.ru')
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
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
