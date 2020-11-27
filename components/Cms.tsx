import * as React from 'react';
import { SWRConfig } from 'swr'


export default function CmsState ({children}) {
  return (
    <SWRConfig 
      value={{
       // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      {children}
    </SWRConfig>
  )
}

