import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className=' bg-gray-100 pt-20'>
      <Head>
        <title>Prismagram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Home;
