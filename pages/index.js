import Head from 'next/head'
import MentorCard from '../components/screen/MentorList/MentorCard'
import { useEffect, useState } from 'react'

export default function Home({ data }) {
  const mentorPerRow = 9

  const [next, setNext] = useState(mentorPerRow)

  const handleMoreMentors = () => {
    setNext(next + mentorPerRow)
  }

  // const handleDelete = async (e, id) => {
  //   e.preventDefault()
  //   const res = await fetch(`http://localhost:3000/api/users/${id}`, {
  //     method: 'DELETE',
  //   })
  //   const result = await res.json()
  // }

  return (
    <>
      <Head>
        <title>Timesharing</title>
        <meta name="description" content="Timesharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Main />
      <SearchSection data={data} /> */}
      <section className="py-14 bg-red-200">
        <div className="text-center lg:w-3/4 mx-auto">
          <h1 className="text-5xl font-semibold">Найди своего ментора</h1>
          <p className="lg:w-3/4 mx-auto">
            Timesharing — это открытое сообщество IT-наставников, готовых
            делиться знаниями и опытом.
            <br />
            <br />
            Правильный разговор прояснит ситуацию лучше, чем десять часов
            поисков в интернете. Поэтому мы помогаем тем, кому нужен совет,
            найти человека с экспертизой и обсудить свой вопрос один на один.
          </p>
          <div className="m-4">
            <a className="p-3 hover:p-4 hover:text-base hover:text-white transition-all bg-orange-600 text-white mt-6 rounded cursor-pointer">
              Найти ментора
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto mt-7 gap-7">
          {data ? (
            <div className="flex flex-wrap -mx-3">
              {data.slice(0, next).map((mentor, i) => (
                <MentorCard
                  key={i}
                  mentor={mentor}
                  // onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap -mx-3">
              <MentorCard mentor={data} />
            </div>
          )}
        </div>
        <div className="w-full text-center mb-4">
          <button
            href="#"
            onClick={handleMoreMentors}
            className="justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10"
          >
            Загрузить еще
          </button>
        </div>
      </section>
      <footer className="container"></footer>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`http://127.0.0.1:3000/api/users`)
  const { data } = await res.json()
  return { props: { data } }
}
