import type {AppProps} from 'next/app'
import {MainComposition} from '../UI/compositions/Main.composition'
import '../UI/styles/styles.scss'


type PageProps = {
  title?: string
}

export type PagePropsWrapper = {
  pageProps: PageProps
}

export type StaticProps = Promise<{ props: PagePropsWrapper['pageProps'] }>

export default function App({
                              Component,
                              pageProps
                            }: AppProps<PageProps>) {
  return <MainComposition pageProps={pageProps}><Component {...pageProps} /></MainComposition>
}
