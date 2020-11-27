import React from 'react'
import App from 'next/app'
import '../css/tailwind.css'
import {SSRProvider} from '@react-aria/ssr';
import {ThemeProvider} from '../ThemeProvider'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <ThemeProvider>
          <SSRProvider>
            <Component {...pageProps} />
          </SSRProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp
