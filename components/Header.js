import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <header>
      <div>
        <div>
          <h2>GuideMe</h2>
        </div>
        <div>
          <Link href="/guide">
            <a style={{ padding: 30 }}>GUIDE</a>
          </Link>
          <Link href="/urgent">
            <a style={{ padding: 30 }}>URGENT SUPPORT</a>
          </Link>
          {/* <Link href="/profile">
            <a style={{ padding: 30 }}>PROFILE</a>
          </Link>
          <Link href="/register">
            <a style={{ padding: 30 }}>REGISTER</a>
          </Link> */}

          {/* {!loggedInPassed ? null : props.loggedIn ? (
            <Link href="/profile">
              <a style={{ padding: '0 10px' }}>PROFILE</a>
            </Link>
          ) : (
            <Link href="/register">
              <a style={{ padding: '0 10px' }}>REGISTER</a>
            </Link>
          )}

          {!loggedInPassed ? null : props.loggedIn ? (
            <Link href="/logout">
              <a style={{ padding: '0 10px' }}>LOGOUT</a>
            </Link>
          ) : (
            <Link href="/login">
              <a style={{ padding: '0 10px' }}>LOGIN</a>
            </Link>
          )} */}

          {props.loggedIn ? (
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
        </div>
      </div>
    </header>
  );
}
