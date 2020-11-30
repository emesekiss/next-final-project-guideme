/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { footerStyles } from '../styles/styles';

const iconStyles = css`
  align-self: flex-end;
  @media screen and (min-width: 600px) {
  }
  img {
    width: 30px;
    height: auto;
  }
`;
const navigationStyles = css`
  align-self: flex-end;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <div css={navigationStyles}>
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
          <img alt="linkedin logo" src="/linkedin.svg" />
        </a>
        <a href="https://github.com/emesekiss">
          <img alt="github logo" src="/github.svg" />
        </a>
        <a href="https://twitter.com/Emese76296705">
          <img alt="twitter logo" src="/twitter.svg" />
        </a>
      </div>
    </footer>
  );
}
