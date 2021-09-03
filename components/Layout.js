import Head from 'next/head'
import Header from './Header'
import Aos from 'Aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Layout = ({children}) => {

  useEffect(() => {
    Aos.init({ duration: 500})
  }, [])

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="web development" />
      <meta name="description" content="Web Development by Stephen Herd" />
      <meta charSet="utf-8" />
      <title>sh.dev</title>
    </Head>
    <main id="main" className="h-screen text-white">
      <Header />
      {children}
    </main>
    </>
  )
}

export default Layout;