import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import Layout from '../layouts/Layout'
import AdminCheck from '../providers/AdminCheck'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <AdminCheck>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AdminCheck>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  )
}

export default MyApp
