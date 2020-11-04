import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedIn={props.loggedIn} />

      <main style={{ padding: 30 }}>{props.children}</main>

      <Footer />
    </>
  );
}
