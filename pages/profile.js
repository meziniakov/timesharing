import { useSession, signIn, signOut } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <div>
        Protected page <br /> Привет, {session.user?.name} {session.user?.email}
      </div>
    )
  } else {
    return <div>Unprotected page {session}</div>
  }
}
