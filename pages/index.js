import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useEffect, useState } from 'react'

export default function Home({ allPostsData }) {

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch("https://randomfox.ca/floof/").then((response) => response.json().then((data) => setImageUrl(data.image)))
  }, [])
  return (
    <Layout home>
      <Head>
        <title>Mir's Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, i'm Mir. I'm a software engineer and I'm passionate about technology, education, and ecology</p>
        <p>
          Here's a link to my github - <a href="https://github.com/mir-codetiger" target="_blank">@mir-codetiger</a>
        </p>
      </section>

      <p>also, here's a cute image of a fox:</p>
      <img src={imageUrl} />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
