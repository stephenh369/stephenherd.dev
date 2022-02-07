import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Layout = ({children}) => {
  let Aos;

  useEffect(() => {
    const Aos = require("aos"); 
    Aos.init({ duration: 500})
  }, [])

  useEffect(() => { if (Aos) { Aos.refresh(); } });

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
      <Footer />
    </main>
    </>
  )
}

export default Layout;