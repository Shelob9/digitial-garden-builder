import React from 'react'
import App from 'next/app';
import { SSRProvider } from '@react-aria/ssr';
import { CookiesProvider } from 'react-cookie';
import GardenDefaultSeo from "../components/GardenDefaultSeo";
import { NotesProvider } from '../components/useNotes';

import "../styles/theme.css";
import "../styles/stacked-layout.css";
import "../styles/note-layout.css";
import "../styles/style.css";
import "../styles/buttons-fields.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    let { asPath } = this.props.router;
    let path = asPath.includes('?')
      ? this.props.router.asPath.substr(0, this.props.router.asPath.indexOf('?'))
      : asPath;
    //After login, do not use ssr provider
    if ('/login/after' === path) {
      return (
        <>
          <>
            <CookiesProvider>
              <NotesProvider>
                  <GardenDefaultSeo />
                  <Component {...pageProps} />
              </NotesProvider>
              </CookiesProvider>
          </>
        </>
      );
    }
    return (
      <>
        <SSRProvider>
          <CookiesProvider>
            <NotesProvider>
                <GardenDefaultSeo />
                <Component {...pageProps} />
            </NotesProvider>
            </CookiesProvider>
        </SSRProvider>
      </>
    );
  }
}

export default MyApp
