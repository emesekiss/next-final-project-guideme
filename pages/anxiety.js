import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';

export default function Anxiety({ loggedIn }) {
  return (
    <div>
      <Layout loggedIn={loggedIn}>
        <Head>
          <title>anxiety</title>
        </Head>
        <h2>Info about the team</h2>
        <h5>Good mental health for all </h5>
        <p></p>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
