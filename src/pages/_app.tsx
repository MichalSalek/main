import type {AppProps} from 'next/app'
import {MainComposition} from '../UI/compositions/Main.composition'
import '../UI/styles/styles.scss'


export default function App({
                              Component,
                              pageProps
                            }: AppProps) {
  return <MainComposition><Component {...pageProps} /></MainComposition>
}
