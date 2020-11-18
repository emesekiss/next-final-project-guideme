import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { GetServerSidePropsContext } from 'next';

type Props = { loggedIn: boolean };

export default function Home(props: Props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>GuideMe</title>
      </Head>
      <h1>Welcome to the homepage</h1>
      <img style={{ height: '250px' }} src="/guide1.svg" />
      <p>
        GuideMe asks you simple questions and based on your selected answers
        will show resources to support you.{' '}
      </p>
      <div>
        <a href="/guide">Take me to the guide</a>
      </div>
      <a href="/about">Read more about us</a>
      <img style={{ height: '250px' }} src="/guide2.svg" />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
