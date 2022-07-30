import type { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import Layout from '../components/Layout';

const Home: NextPage = (props) => {
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
