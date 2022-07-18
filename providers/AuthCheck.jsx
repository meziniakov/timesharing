import * as cookie from 'cookies'
import Router from 'next/router'
import { useEffect } from 'react'

export default function AuthCheck({ children, token }) {
  console.log(token)
  return children
}

export const getServerSideProps = async (ctx) => {
  let token

  let cookies = cookie.parse(ctx.req.headers.cookie)
  token = cookies.access

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  return { props: { token } }
}
