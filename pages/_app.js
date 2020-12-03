import React from 'react'
import App, { Container } from 'next/app';
import {SSRProvider} from '@react-aria/ssr';
import "../styles/theme.css";
import "../styles/stacked-layout.css";
import "../styles/note-layout.css";
import { DefaultSeo } from 'next-seo';
let site_name = 'Digital Garden Site'

let openGraph = {
  url: '',
  locale: 'en_US',
  site_name
}
let authorTwitter = '@josh412';
let siteTwitter = '@joshbot10'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        
        <SSRProvider>
          <DefaultSeo
            titleTemplate={ `%s | ${site_name}`}
            openGraph={{
              type: 'website',
              ...openGraph
            }}
            twitter={{
              handle: authorTwitter,
              site: siteTwitter,
              cardType: 'summary_large_image',
            }}
          />
            <Component {...pageProps} />
          </SSRProvider>
      </Container>
    );
  }
}

export default MyApp
