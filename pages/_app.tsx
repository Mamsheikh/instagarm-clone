import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout';
import apolloClient from '../lib/apollo';
import { Toaster } from 'react-hot-toast';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/LoadingScreen';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <ThemeProvider enableSystem={true} attribute='class'>
          {pageLoading ? <LoadingScreen /> : <Component {...pageProps} />}
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
