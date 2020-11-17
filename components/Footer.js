import Link from 'next/link';
import Head from 'next/head';

export default function Footer() {
  return (
    <div>
      <footer>
        <h5>Footer here</h5>
        <Link href="/">
          <a>HOME</a>
        </Link>
        <div>
          <Link href="/about">
            <a>ABOUT US</a>
          </Link>
        </div>
        <div>
          <Link href="/contact">
            <a>CONTACT</a>
          </Link>
        </div>
      </footer>
    </div>
  );
}
