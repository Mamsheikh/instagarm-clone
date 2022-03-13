import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import prisma from '../lib/prisma';
import Feed from '../components/Feed';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className=' bg-gray-100 pt-20'>
      <Head>
        <title>Prismagram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Feed />
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const data = await prisma.post.findMany({
//     where: {}
//   })
//   const user = JSON.parse(JSON.stringify(data));
//   return {
//     props: {
//       user,
//     },
//   };
// };
