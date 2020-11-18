import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>GuideMe</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header loggedIn={props.loggedIn} />

      <main style={{ padding: 30 }}>{props.children}</main>

      <Footer />
    </div>
  );
}
