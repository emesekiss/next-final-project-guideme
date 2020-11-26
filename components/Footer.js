/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  display: flex;
  justify-content: space-between;
  color: #3c3c3c;
  a {
    padding: 10px;
  }
`;

const iconStyles = css`
  img {
    width: 30px;
    height: auto;
  }
`;

export default function Footer() {
  return (
    <div>
      <footer css={footerStyles}>
        <div>
          <Link href="/">
            <a>HOME</a>
          </Link>
          <Link href="/about">
            <a>ABOUT US</a>
          </Link>
          <Link href="/contact">
            <a>CONTACT</a>
          </Link>
        </div>
        <div css={iconStyles}>
          <a href="https://www.linkedin.com/in/emese-kiss-13849090/">
            <img src="/linkedin.svg" />
          </a>
          <a href="https://github.com/emesekiss">
            <img src="/github.svg" />
          </a>
          <a href="https://twitter.com/Emese76296705">
            <img src="/twitter.svg" />
          </a>
        </div>
      </footer>
    </div>
  );
}
