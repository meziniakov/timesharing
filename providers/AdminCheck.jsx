import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AdminCheck({ children, data }) {
  const { data: session, status } = useSession({ required: true })
  const { replace } = useRouter()
  console.log(session?.user)
  // const isAdmin = session?.user?.roles === 'admin'

  console.log(data)
  const isAdmin = true

  if (isAdmin) {
    return children
  }

  if (status === 'loading') return null
  // if (!isAdmin) replace('/api/auth/signin')
}

export const getServerSideProps = async ({ req, res }) => {
  const data = req ? req.headers.cookie : document.cookie
  return { props: { data } }
}
