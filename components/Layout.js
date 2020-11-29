import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { useState } from 'react';

export default function Layout({ user, loggedIn, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>GuideMe</title>
        <link rel="icon" href="/loogo.png" />
      </Head>
      <Menu isMenuOpen={isMenuOpen} isLoggedIn={loggedIn} user={user} />

      <Header
        isLoggedIn={loggedIn}
        user={user}
        isMenuOpen={isMenuOpen}
        onBurgerClick={setIsMenuOpen}
      />
      <main style={{ padding: 30 }}>{children}</main>

      <Footer />
    </div>
  );
}
