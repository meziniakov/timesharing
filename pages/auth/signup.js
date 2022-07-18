import { getProviders, getCsrfToken, signIn, getSession } from 'next-auth/react'
import { LockClosedIcon, FingerPrintIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp({ session }) {
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    if (!email || !email.includes('@') || !password) {
      alert('Не верно заполнены поля')
      return
    }

    const JSONData = JSON.stringify({ email, password })

    const url = `${process.env.URL_API}/auth/signup`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData,
    })

    const result = await res.json()
    result?.message && setError(result?.message)
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Регистрация
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            или{' '}
            <Link href="/auth/signin">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                войдите
              </a>
            </Link>
          </p>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                name="password"
                type="password"
                minLength={5}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Пароль"
              />
              <label htmlFor="tryPassword" className="sr-only">
                Повторите пароль
              </label>
              <input
                name="tryPassword"
                type="password"
                minLength={5}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Повторите пароль"
              />
            </div>

            <div className=" text-red-700">{error ? <>{error}</> : null}</div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Запомнить меня
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Регистрация
              </button>
            </div>
          </form>

          {/* {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FingerPrintIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Войти с помощью {provider.name}
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders(context)
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const csrfToken = await getCsrfToken(context)
  return {
    props: { providers, session },
  }
}
