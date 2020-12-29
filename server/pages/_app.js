import React from 'react'
import App from 'next/app';

import "../styles/index.css";
import Layout from "../components/Layout";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default MyApp
