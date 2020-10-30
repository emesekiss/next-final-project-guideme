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
          <Link href="/">
            <a style={{ padding: 30 }}>HOME</a>
          </Link>
          <Link href="/guide">
            <a style={{ padding: 30 }}>GUIDE</a>
          </Link>
          <Link href="/register">
            <a style={{ padding: 30 }}>REGISTER</a>
          </Link>
          {/* <Link href="/login">
            <a style={{ padding: 30 }}>LOGIN</a>
          </Link> */}
          {!loggedInPassed ? null : props.loggedIn ? (
            <Link href="/logout">
              <a style={{ padding: '0 10px' }}>LOGOUT</a>
            </Link>
          ) : (
            <Link href="/login">
              <a style={{ padding: '0 10px' }}>LOGIN</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
