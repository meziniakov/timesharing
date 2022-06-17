import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import * as faces from 'facesjs'
import Script from 'next/script'
import { useEffect } from 'react'
import Nav from '../../components/Header/Nav'
import MentorCard from '../../components/screen/MentorList/MentorCard'

export default function MentorPage({ data }) {
  // const { data, error } = useSWR(
  //   getUrl(params, query),
  //   fetcher
  //   // , {initialData: events}
  // )

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>
  // if (data.status == 'error')
  //   return (
  //     <>
  //       <div>{data.message}</div>
  //     </>
  //   )
  // useEffect(() => {
  //   const face1 = faces.generate(null, { race: 'white', fatness: 7 })
  //   const face2 = faces.generate(null, { race: 'white', fatness: 7 })
  //   faces.display('my-div-id', face1, { race: 'black' })
  //   faces.display('my-div-id2', face2, { race: 'black' })
  // }, [])
  // console.log(mentor)
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.name} | Time Sharing</title>
        <meta
          name="description"
          content={`${data.name} наставник в Time Sharing`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={styles.main}>
        <MentorCard mentor={data} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          2022
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { _id } = ctx.params
  const res = await fetch(`http://127.0.0.1:3000/api/mentor/${_id}`)
  const { data } = await res.json()
  return { props: { data } }
}
