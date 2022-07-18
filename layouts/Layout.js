import Nav from '../components/Header/Nav'

export default function Layout(props) {
  return (
    <>
      <Nav />
      {props.children}
      {/* <main className={styles.main}>{props.children}</main> */}
      <footer className="text-center p-5">2022</footer>
    </>
  )
}
