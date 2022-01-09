/**
 * @description 主页
 * */

import styles from '../styles/Home.module.scss';
import type {NextPage} from 'next';
import Layout from '../components/layout';
import Icon from '../components/icon';
import {useRouter} from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const addRecords = () => {
    router.push('/records');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.statistic}>
          <div className={styles.total}>
            <span>1月结余</span>
            <span>-123</span>
          </div>
          <div className={styles.consume}>
            <div className={styles.income}>
              <span>收入</span>
              <span>0</span>
            </div>
            <span>|</span>
            <div className={styles.expend}>
              <span>支出</span>
              <span>12</span>
            </div>
          </div>
        </div>


        <div className={styles.add} onClick={addRecords}>
          <Icon name="tianjia"/>
        </div>
      </div>
    </Layout>
  );
}

export default Home
