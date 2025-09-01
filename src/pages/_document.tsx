import {Metadata} from 'next';
import {Head, Html, Main, NextScript} from 'next/document'


export const metadata: Metadata = {
  title: "PWA NextJS",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs"],
  authors: [
    {
      name: "asd",
      url: "https://adres.pl/",
    },
  ],
  icons: [],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>)
}
