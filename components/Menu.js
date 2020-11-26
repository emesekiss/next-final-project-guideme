/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const MenuStyled = (props) => (
  <nav
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: white;
      height: 100vh;
      text-align: left;
      padding: 2rem;
      position: absolute;
      top: 0;
      right: 0;
      transition: transform 0.3s ease-in-out;
      transform: translateX(100%);
      transform: ${props.isMenuOpen ? 'translateX(0)' : 'translateX(100%)'};

      a {
        font-size: 1.5rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: normal;
        letter-spacing: 0.5rem;
        text-decoration: none;
        transition: color 0.3s linear;
        border-bottom: 3px solid #f5f1ed;
        color: #252525;
      }
    `}
  >
    {props.children}
  </nav>
);

export default function Menu({ isMenuOpen, isLoggedIn }) {
  return (
    <MenuStyled isMenuOpen={isMenuOpen}>
      {isLoggedIn ? (
        <>
          <Link href="/profile">
            <a>PROFILE</a>
          </Link>
          <Link href="/logout">
            <a>LOGOUT</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/register">
            <a>REGISTER</a>
          </Link>
          <Link href="/login">
            <a>LOGIN</a>
          </Link>
        </>
      )}
      <Link href="/search">
        <a>SEARCH</a>
      </Link>
    </MenuStyled>
  );
}
