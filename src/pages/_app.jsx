import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/dev.css';
import '@/styles/responsive.css';


import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import client from '@/apollo_client/client';
import { GET_THEME_SETTINGS } from '@/queries/graphql_queries';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import Layout from '@/component/Layout';
import Script from 'next/script';
import { useEffect } from 'react';

export default function App({ Component, pageProps,themeSettings }) {
  let headerClass = pageProps?.headerClass; // to use in header component
  if (!headerClass) {
    headerClass = '';
  }
  // let themeSettings = {};
  return (
    <ApolloProvider client={client}>
      <NextNProgress height={6} color='#005ABB' />
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        
        {/* can help prevent clickjacking attacks */}
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self';" />
        {/* can help prevent clickjacking attacks */}
      </Head>
      <div className="App">
        <TawkMessengerReact
          propertyId="5d4a6323e5ae967ef80ed272"
          widgetId="default" />
      </div>

      <Layout headerClass={headerClass} themeSettings={themeSettings}>
        <Script id="gtm" strategy="afterInteractive">
          {
            `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GTM_ID}');
            `
          }
        </Script>
          <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

App.getInitialProps = async () => {
  const { data: themeSettings, loading, networkStatus } = await client.query({
    query: GET_THEME_SETTINGS,
    // fetchPolicy: 'cache-first'
  });
  let theme = await themeSettings;
  return { themeSettings : theme }
}