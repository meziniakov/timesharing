import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false)
    }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true)
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true)
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}

const Nav = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true)

  const { data: session } = useSession()
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [burgerMenuActive, setBurgerMenuActive] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              ref={ref}
              type="button"
              onClick={() => setIsComponentVisible(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Открыть меню</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                width={30}
                height={30}
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Главная
                </a>
                <Link href={'/'}>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Менторы
                  </a>
                </Link>
                <Link href={'/about'}>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    О проекте
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  ref={ref}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user"
                  name="user"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setIsComponentVisible(true)}
                  // onClick={select}
                >
                  <span className="sr-only">Open user menu</span>
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
                </button>
              </div>

              <div
                className={`${
                  isComponentVisible ? '' : 'hidden'
                } origin-top-right absolute right-0 mt-2 w-48 z-10 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="1"
              >
                {session ? (
                  <>
                    <Link href={'/profile'}>
                      <a className="block px-4 py-2 text-sm text-gray-700">
                        Профиль
                      </a>
                    </Link>
                    <Link href={'/mentor/add'}>
                      <a className="block px-4 py-2 text-sm text-gray-700">
                        Стать ментором
                      </a>
                    </Link>
                    <Link href={''}>
                      <button
                        onClick={() => signOut()}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Выйти
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={'/auth/signin'}>
                      <button className="block px-4 py-2 text-sm text-gray-700">
                        Войти
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isComponentVisible ? '' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href={'/'}>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md block text-base font-medium">
              Главная
            </a>
          </Link>
          <Link href={'/'}>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md block text-base font-medium">
              Менторы
            </a>
          </Link>
          <Link href={'/about'}>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md block text-base font-medium">
              О проекте
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
