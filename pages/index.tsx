/**
 * @description 记账页
 * */

import styles from '../styles/Home.module.scss';
import type {NextPage} from 'next';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        记账页
      </div>
    </Layout>
  );
}

export default Home
