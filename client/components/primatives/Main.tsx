import * as React from 'react';

const Main = ({ children }) => {
  return (
    <main className="container mx-auto flex-auto relative border-t border-gray-200 dark:border-gray-800">
      { children }
    </main>
  )
}

export default Main;
