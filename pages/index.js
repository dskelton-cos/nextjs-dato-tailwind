import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { getPageAndMorePages } from '../lib/dato'

import ListPages from '../components/ListPages-with-image';
import Hero from '../components/Hero';


export default function Index({ preview, morePages, page }) {

  return (
    <>

      <Head>
        <title>Create Next App</title>Will
        <meta name="description" content="Generated by create next app..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero
        title={page.title}
        intro={page.strapLine}
        coverImage={page.backgroundImage.responsiveImage}
        slug={page.permalink}
      />

      <ListPages pages={morePages} />

    </>

  )
}

// This function gets called at build time
export async function getStaticProps({ preview = false }) {

  const data = await getPageAndMorePages('index', preview) || []

  return {
    props: {
      preview,
      morePages: data?.morePages ?? [],
      page: {
        ...data?.page
        },
    },
  };
}
