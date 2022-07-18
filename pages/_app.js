import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import Layout from '../layouts/Layout'
import AuthCheck from '../providers/AuthCheck'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        {Component.auth ? (
          // <AuthCheck>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          // </AuthCheck>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  )
}

export default MyApp
