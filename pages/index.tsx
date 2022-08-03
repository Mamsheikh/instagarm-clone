import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Feed from '../components/Feed';
import Layout from '../components/Layout';
import { useMeQuery } from '../generated/graphql';

const Home: NextPage = (props) => {
  const router = useRouter();
  const { data } = useMeQuery();
  useEffect(() => {
    if (!data?.me) {
      router.push('/login');
    }
  }, [data?.me]);
  return (
    <Layout>
      <div className=' bg-gray-100 pt-20 dark:bg-black'>
        <Head>
          <title>Prismagram</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Feed />
      </div>
    </Layout>
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
