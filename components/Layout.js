import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ user, loggedIn, children }) {
  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>GuideMe</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header loggedIn={loggedIn} user={user} />

      <main style={{ padding: 30 }}>{children}</main>

      <Footer />
    </div>
  );
}
