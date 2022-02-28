import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Instagra,</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="mt-4 rounded bg-blue-500 px-3 py-1 text-white"
      >
        Sign in
      </button>
    </div>
  )
}

export default Home
