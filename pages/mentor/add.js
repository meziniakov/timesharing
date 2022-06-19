import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../../components/Header/Nav'

export default function AddMentor() {
  const { push } = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      job: e.target.job.value,
      status: 'На рассмотрении',
      userRole: 'admin',
    }
    const dataJson = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
    }

    const response = await fetch('/api/mentor', options)
    const result = await response.json()
    if (result.success) {
      return push(`/mentor/${result.data._id}`)
    }
  }

  return (
    <>
      <Head>
        <title>Стать ментором</title>
        <meta name="description" content="Профиль" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Укажите свои данные
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Работа
                </label>
                <textarea
                  name="job"
                  required
                  rows={5}
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
