import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout';
import apolloClient from '../lib/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <ThemeProvider enableSystem={true} attribute='class'>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
