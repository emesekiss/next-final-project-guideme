/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';

type Props = { loggedIn: boolean; user: User };

const urgentSupportStyles = css`
  margin-left: 20px;
  margin-right: 20px;
  h4 {
    font-size: 1.5rem;
    font-style: italic;
  }
  a {
    border: 1px solid #80376b;
    color: #80376b;
    font-size: 0.875rem;
    padding: 5px 10px;

    border-radius: 4px;
    background-color: #fcf8f2;
  }
  a:hover {
    background-color: #80376b;
    color: white;
    cursor: pointer;
  }
  h3 {
    margin-top: 50px;
  }
`;

export default function Urgent({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Urgent Support</title>
        </Head>
        <div css={urgentSupportStyles}>
          <h1>Urgent Support</h1>

          <h4>What to do when you need urgent support</h4>
          <p>
            If you're concerned about your mental health, your GP is always a
            good place to start. If you feel very distressed and can’t wait, or
            feel unable to keep yourself safe, choose one of the options below:
          </p>
          <h3>Urgent Mental Health Helpline - 0131330</h3>
          <p>
            Psychiatric counselling helpline is for people of all ages. You can
            call for 24-hour advice and support. You may need urgent help for
            many reasons. The important thing to know is you will not be wasting
            anyone's time.
          </p>
          <a href="tel:0131330">CALL</a>
          <h3>Women's Emergency Helpline - 0171719</h3>
          <p>
            The Women's Emergency Helpline is available 24 hours a day and
            serves as a contact point for women and girls aged 14 and older who
            have become victims of sexual, physical or mental violence.
          </p>
          <a href="tel:0171719">CALL</a>

          <h3>Corona Helpline - 01400053000</h3>
          <p>
            The corona helpline is available from 8am to 8pm. If you need
            support or advice or if you have any worries about coronavirus.
          </p>
          <a href="tel:01400053000">CALL</a>
        </div>
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
