import Head from 'next/head'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="web development" />
      <meta name="description" content="Web Development by Stephen Herd" />
      <meta charSet="utf-8" />
      <title>sh.dev</title>
    </Head>
    <main className="h-screen px-20">
      <Header />
      {children}
    </main>
    </>
  )
}

export default Layout;