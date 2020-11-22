import Link from 'next/link';

export default function Header({ user, loggedIn }) {
  // console.log(user);
  return (
    <header>
      <div>
        <div>
          <img style={{ height: 90 }} src="/logo.png" alt="logo" />
          <h2>GuideMe</h2>
        </div>
        <div>
          <Link href="/guide">
            <a style={{ padding: 30 }}>GUIDE</a>
          </Link>
          <Link href="/urgent">
            <a style={{ padding: 30 }}>URGENT SUPPORT</a>
          </Link>

          {loggedIn ? (
            <>
              <Link href="/profile">
                <a style={{ padding: '0 10px' }}>PROFILE</a>
              </Link>
              <Link href="/logout">
                <a style={{ padding: '0 10px' }}>LOGOUT</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <a style={{ padding: '0 10px' }}>REGISTER</a>
              </Link>
              <Link href="/login">
                <a style={{ padding: '0 10px' }}>LOGIN</a>
              </Link>
            </>
          )}
          <Link href="/search">
            <a style={{ padding: 30 }}>SEARCH</a>
          </Link>
          {loggedIn && user && (
            <Link href="/profile">
              <img
                style={{ height: '100px', transform: 'scaleX(-1)' }}
                src={`/avatars/${user?.avatar}.svg`}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
