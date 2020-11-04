import Link from 'next/link';
import Head from 'next/head';

export default function Footer() {
  return (
    <div>
      <footer>
        <h5>Footer here</h5>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href="/">
          <a style={{ padding: 30 }}>HOME</a>
        </Link>
        <div>
          <Link href="/about">
            <a style={{ padding: 30 }}>ABOUT US</a>
          </Link>
        </div>
        <div>
          <Link href="/contact">
            <a style={{ padding: 30 }}>CONTACT</a>
          </Link>
        </div>
      </footer>
    </div>
  );
}
