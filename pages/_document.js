import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import config from '../config';


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="/styles/resets.css"
                        rel="stylesheet"
                    />
                    <link
                        href="/styles/fonts.css"
                        rel="stylesheet"
                    />
                    <link
                        href="/styles/global.css"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: (App) => (props) =>
                sheet.collectStyles(<App {...props} />),
            })
    
          const initialProps = await Document.getInitialProps(ctx)
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            ),
          }
        } finally {
            sheet.seal()
        }
    }
}

export default MyDocument;