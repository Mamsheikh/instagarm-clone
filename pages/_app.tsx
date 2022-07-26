import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout';
import apolloClient from '../lib/apollo';
import { Toaster } from 'react-hot-toast';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <ThemeProvider enableSystem={true} attribute='class'>
          {/* <Layout> */}
          <Component {...pageProps} />
          <Toaster />
          {/* </Layout> */}
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
