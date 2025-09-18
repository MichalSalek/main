import Head from 'next/head'
import {ReactElement} from 'react'


export const HeadMolecule = (): ReactElement => {
  return <Head>
    <title>app-FRAMEWORK</title>
    <meta name="description" content="description"/>
    <meta name="viewport"
          content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, target-densitydpi=device-dpi"/>

    <link rel="icon" href="/favicon.ico"/>
  </Head>
}
