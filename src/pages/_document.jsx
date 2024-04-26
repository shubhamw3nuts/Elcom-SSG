import { Html, Head, Main, NextScript } from 'next/document'
// import favicon from "@/asset/images/favicon.png";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
        {/* <link rel="shortcut icon" href={favicon} /> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" />
      </Head>
      <body>
        <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
