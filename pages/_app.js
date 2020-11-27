import React from 'react'
import App from 'next/app'
import {SSRProvider} from '@react-aria/ssr';
import "../styles/theme.css";
import "../styles/stacked-layout.css";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
          <SSRProvider>
            <Component {...pageProps} />
          </SSRProvider>
      </>
    );
  }
}

export default MyApp
