import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '../layouts/Layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
