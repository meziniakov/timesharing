import React from 'react'
import MentorCard from '../components/screen/MentorList/MentorCard'

const test = (data) => {
  return (
    <>
      <section className="py-14 bg-red-200" dataSection="hero">
        <div className="text-center py-14 lg:w-3/4 mx-auto">
          <h1 className="text-5xl font-semibold">Найди своего ментора</h1>
          <p className="lg:w-3/4 mx-auto">
            {' '}
            GetMentor — это открытое сообщество IT-наставников, готовых делиться
            знаниями и опытом.
            <br />
            <br />
            Правильный разговор прояснит ситуацию лучше, чем десять часов
            поисков в интернете. Поэтому мы помогаем тем, кому нужен совет,
            найти человека с экспертизой и обсудить свой вопрос один на один.
          </p>
          <a className="p-3 hover:p-4 hover:text-base hover:text-white transition-all bg-orange-600 text-white mt-6 rounded cursor-pointer">
            Найти ментора
          </a>
        </div>
      </section>
      <section>
        <div className="container mx-auto mt-7 gap-7">
          {console.log(data.data)}
          {data ? (
            <div className="flex flex-wrap -mx-3">
              {data.data.map((mentor, i) => (
                <MentorCard key={i} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap -mx-3">
              <MentorCard mentor={data} />
            </div>
          )}
        </div>
      </section>
      <footer className="container"></footer>
    </>
  )
}

export default test

export async function getServerSideProps(ctx) {
  const res = await fetch(`http://127.0.0.1:3000/api/users`)
  const { data } = await res.json()
  // console.log(data)
  return { props: { data } }
}
