import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import User from '../models/User'

const Profile = ({ user }) => {
  const { data: session } = useSession()
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)

  if (session) {
    const handleSubmit = async (e) => {
      e.preventDefault()
      const url = `${process.env.URL_API}/users/${user._id}`
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname }),
      })
      const result = await res.json()
      console.log(result)
    }
    return (
      <>
        <Head>
          <title>Профиль</title>
          <meta name="description" content="Профиль" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="justify-center col-span-6 sm:col-span-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => handleSubmit(e)} action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="first-name"
                        onChange={(e) =>
                          e.target.value && setFirstname(e.target.value)
                        }
                        placeholder={user?.firstname}
                        defaultValue={user?.firstname ? user.firstname : ''}
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Фамилия
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder={user?.lastname}
                        id="last-name"
                        onChange={(e) =>
                          e.target.value && setLastname(e.target.value)
                        }
                        defaultValue={user?.lastname ? user.lastname : ''}
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        placeholder={user?.email}
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        О себе
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          defaultValue={user?.aboutme}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Опишите о себе
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Фото
                      </label>
                      <div className="mt-1 flex items-center">
                        {session ? (
                          <Image
                            className="h-8 w-8 rounded-full"
                            width={30}
                            height={30}
                            src={`${
                              session?.user?.image
                                ? 'https://lh3.googleusercontent.com/a/AATXAJzRvdVbRsp3OBNnfiddnLMzdkm2AZV4kioFA4aY=s96-c'
                                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            }`}
                            alt=""
                          />
                        ) : (
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        )}
                        <button
                          type="button"
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Страна
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Россия</option>
                        <option>Армения</option>
                        <option>Казахстан</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </>
    )
  }
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (session) {
    const email = session.user?.email
    const res = await User.findOne({ email })
    // const res = await fetch(
    //   `http://127.0.0.1:3000/api/users/62cb33ef1a65074097c3ff74`
    // )
    // const result = await res.json()
    // const user = result.data
    const user = JSON.parse(JSON.stringify(res))
    return {
      props: { user },
    }
  } else {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
}

Profile.auth = true
export default Profile
