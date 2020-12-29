import React from 'react'
import App from 'next/app';
import { SSRProvider } from '@react-aria/ssr';
import { CookiesProvider } from 'react-cookie';
import GardenDefaultSeo from "../components/GardenDefaultSeo";
import { NotesProvider } from '../components/useNotes';
import { ClippingsProvider } from '../components/useClippings';

import "../styles/theme.css";
import "../styles/stacked-layout.css";
import "../styles/note-layout.css";
import "../styles/style.css";
import "../styles/buttons-fields.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <SSRProvider>
          <CookiesProvider>
            <NotesProvider>
              <ClippingsProvider>
                <GardenDefaultSeo />
                <Component {...pageProps} />
              </ClippingsProvider>
                
            </NotesProvider>
            </CookiesProvider>
        </SSRProvider>
      </>
    );
  }
}

export default MyApp
