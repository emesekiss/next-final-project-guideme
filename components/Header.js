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
    :hover {
      transform: translateY(-1px);
      transition: 0.3;
    }
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
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 2px 2px 14px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  @media screen and (min-width: 750px) {
    font-size: 14px;
    padding: 10px;
  }
  a {
    cursor: pointer;
  }

  & > div {
    flex-basis: 33.33%;
  }
`;

const activeNav = css`
  text-decoration: underline;
`;

const headerWrapper = css`
  display: flex;
  a {
    margin: 5px;
    @media screen and (min-width: 750px) {
      margin: 10px;
    }
  }
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
      <div css={headerWrapper}>
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
              alt="choosen avatar picture"
              style={{
                height: '50px',
                transform: 'scaleX(-1)',
                cursor: 'pointer',
              }}
              src={`/avatars/${user?.avatar}.svg`}
            />
          </Link>
        )}
      </div>
    </header>
  );
}
