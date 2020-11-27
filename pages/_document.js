import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="fixed overflow-hidden h-full">
        <Head />
        <body className="fixed overflow-hidden w-full min-h-full flex text-gray-900 dark:text-white bg-white dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}