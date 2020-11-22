import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';

type Props = { loggedIn: boolean; user: User };

export default function Urgent({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Urgent Support</title>
        </Head>
        <h2>List of urgent support</h2>

        <h3>Emergency Hotline Numbers (available 24 hours a day)</h3>
        <p>
          Women's emergency helpline: 01 717 19
          <a href="tel:0171719">CLICK TO CALL</a>
        </p>

        <a href="tel:+436605081028">CLICK TO CALL emi</a>
        <p>
          Psychiatric counselling in emergencies: 01 313 30
          <a href="tel:0131330">CLICK TO CALL</a>
        </p>

        <p>
          Corona helpline: Available from 8am to 8pm: 01 4000 53000
          <a href="tel:01400053000">CLICK TO CALL</a>
        </p>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  return { props: { loggedIn, user } };
}
