/**
 * @description 主页
 * */

import styles from '../styles/Home.module.scss';
import type {NextPage} from 'next';
import Layout from '../components/layout';
import Icon from '../components/icon';
import {useRouter} from 'next/router';
import React from 'react';
import axios from 'axios';


interface Tag {
  icon: string;
  name: string;
}

interface Record {
  id: number;
  amount: string;
  createdAt: string;
  tag: Tag;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [records, setRecords] = React.useState<Record[]>([]);
  const addRecords = () => {
    router.push('/records');
  };

  /**
   * 获取所有账单
   * */
  const getRecords = () => {
    axios.get('/api/v1/record').then(res => {
      setRecords(res.data);
    });
  };

  React.useEffect(() => {
    getRecords();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {/* 总的统计 */}
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

        {/* 账单 */}
        <div className={styles.records}>
          <header>
            <span>01月19日 今天</span>
            <span>支出99</span>
          </header>
          <div className={styles.details}>
            <div className={styles.iconBox}>
              <Icon name="eating"/>
            </div>
            <span className={styles.tagName}>餐饮日常</span>
            <span>-9</span>
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
