import * as React from 'react'
import Head from 'next/head'

import Blob from '../components/Blob'


function Page() {
  return (
    <main style={ pageStyle }>
      <Head>
        <title>Sound Blob</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Head>
      <Blob />
    </main>
  )
}

export default Page


const pageStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
