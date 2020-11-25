/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Burger from './Burger';

const logoStyles = css`
  cursor: pointer;
  & > img {
    width: 25px;
    height: auto;
    @media screen and (min-width: 520px) {
      width: 35px;
    }
    @media screen and (min-width: 760px) {
      width: 50px;
    }
  }
`;

const headerStyles = css`
  color: white;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 2px 2px 14px rgba(0, 0, 0, 0.24);
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    margin: 10px;
    cursor: pointer;
  }

  & > div {
    flex-basis: 33.33%;
  }
`;

const activeNav = css`
  text-decoration: underline;
`;

export default function Header({
  user,
  isLoggedIn,
  isMenuOpen,
  onBurgerClick,
}) {
  const router = useRouter();
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/guide/1">
          <a css={router.pathname == '/guide/[id]' ? activeNav : ''}>GUIDE</a>
        </Link>
        <Link href="/urgent">
          <a css={router.pathname == '/urgent' ? activeNav : ''}>
            URGENT SUPPORT
          </a>
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/">
          <a css={logoStyles}>
            <img src="/logo.png" alt="logo" />
          </a>
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Burger isMenuOpen={isMenuOpen} toggleMenu={onBurgerClick} />
        {isLoggedIn && user && (
          <Link href="/profile">
            <img
              style={{
                height: '50px',
                transform: 'scaleX(-1)',
              }}
              src={`/avatars/${user?.avatar}.svg`}
            />
          </Link>
        )}
      </div>
    </header>
  );
}
