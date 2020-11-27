import React from 'react'
import App from 'next/app'
import {SSRProvider} from '@react-aria/ssr';
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
