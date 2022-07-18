import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

export default function MentorEditPage({ data }) {
  return (
    <>
      <Head>
        <title>
          {data.firstname} {data.lastname} | Time Sharing
        </title>
        <meta
          name="description"
          content={`${data.firstname} ${data.lastname} наставник в Time Sharing`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mt-7 grid lg:grid-cols-3 gap-7">
        <div className="grid h-max grid-cols-1 rounded-xl border p-7">
          <div className="h-max relative text-center">
            <span className="absolute hover:cursor-pointer right-0 top-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </span>
            <div className="relative w-max mx-auto">
              <Image
                height={160}
                width={160}
                alt="Богдан Типлицкий"
                className="rounded-full object-cover"
                src={'/img/getmentor/' + data.image || '/vercel.svg'}
              />
            </div>
            <h3 className="text-center text-lg font-bold">
              <input
                type="text"
                name="firstname"
                id="first-name"
                // onChange={(e) =>
                //   e.target.value && setFirstname(e.target.value)
                // }
                placeholder={data?.firstname}
                defaultValue={data?.firstname ? data.firstname : ''}
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastname"
                // onChange={(e) =>
                //   e.target.value && setFirstname(e.target.value)
                // }
                placeholder={data?.lastname}
                defaultValue={data?.lastname ? data.lastname : ''}
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </h3>
            <p className="text-base font-light text-center text mb-0">
              {data.job}
            </p>
            <p className="inline-flex text-xs justify-center w-full text-neutral-400">
              <svg
                viewBox="0 0 12 16"
                fill="none"
                className="mr-2 h-4 w-4 text-neutral-400"
              >
                <path
                  d="M11.5 6c0 4.5-5.5 9.5-5.5 9.5S.5 10.5.5 6a5.5 5.5 0 1111 0v0z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              Россия, Пермь (+05:00 UTC)
            </p>
          </div>
          {/* <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
          </div> */}
          <div className="h-max">
            <div className="rounded-md shadow">
              <a
                href="#"
                onClick={(e) => handleSendMessage(e)}
                className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10"
              >
                Написать
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 gap-7">
          <div className="col-span-2 rounded-xl p-7 border ">
            <h3 className="text-xl font-bold">О себе</h3>
            <textarea
              name="about"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={data?.aboutme}
            />
            <h3 className="text-xl font-bold">Компетенции</h3>
            {data.skills.map((el) => (
              <button
                key={el}
                className="rounded-[4px] h-[32px] m-1 bg-gray-200 hover:bg-gray-300 text-sm py-2 px-2"
              >
                {el}
              </button>
            ))}
          </div>
          <div className="h-max col-span-2 rounded-xl p-7 border">
            <h3 className="text-xl font-bold">С чем помогу</h3>
            <textarea
              name="pomogu"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              // defaultValue={data?.pomogu}
            />
          </div>
          <div className="h-max col-span-2 rounded-xl p-7 border">
            <h3 className="text-xl font-bold">Опыт (резюме, портфолио)</h3>
            <textarea
              name="rezume"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              // defaultValue={data?.pomogu}
            />
          </div>
          <div className="h-max col-span-2 rounded-xl p-7 border">
            <h3 className="text-xl font-bold">Места работы</h3>
            <textarea
              name="rabota"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              // defaultValue={data?.pomogu}
            />
          </div>
          <div className="h-max col-span-2 rounded-xl p-7 border">
            <h3 className="text-xl font-bold">Отзывы</h3>
            <p className="text-center">Нет отзывов</p>
          </div>
          <div className="h-max col-span-2 rounded-xl p-7 border">
            <h3 className="text-xl font-bold">Рейтинг</h3>
            <p className="text-center">Нет рейтинга</p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (session) {
    const { _id } = ctx.params
    const res = await fetch(`http://127.0.0.1:3000/api/users/${_id}`)
    const { data } = await res.json()
    return { props: { data: JSON.parse(JSON.stringify(data)) } }
  } else {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
}
