import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RecoilRoot } from 'recoil';
import apolloClient from '../lib/apollo';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <ThemeProvider attribute='class'>
          <NextNProgress />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
