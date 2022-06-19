import Head from 'next/head'
import Nav from '../components/Header/Nav'
import styles from '../styles/Home.module.css'

export default function Layout(props) {
  console.log(props)
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>2022</footer>
    </div>
  )
}