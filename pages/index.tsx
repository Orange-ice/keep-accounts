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
import {colors, weeksMap} from '../lib/custom.config';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);


interface Tag {
  icon: string;
  name: string;
  type: 1 | 0;
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

  const formatDate = (date: string) => {
    let week = weeksMap[dayjs(date).day()];
    if (dayjs(date).isToday()) week = '今天';
    if (dayjs(date).isYesterday()) week = '昨天';

    let formattedDate = '';
    if (dayjs().isSame(date, 'year')) {
      formattedDate = `${dayjs(date).format('MM月DD日')} ${week}`;
    } else {
      formattedDate = `${dayjs(date).format('YYYY/MM/DD')} ${week}`;
    }
    return formattedDate;
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
        {records.map((item, index) => <div key={item.id} className={styles.records}>
          <header>
            <span>{formatDate(item.createdAt)}</span>
            {/*<span>{item.tag.type ? '收入' : '支出'}{item.amount}</span>*/}
          </header>
          <div className={styles.details}>
            <div className={styles.iconBox} style={{backgroundColor: colors[item.tag.icon]}}>
              <Icon name={item.tag.icon}/>
            </div>
            <span className={styles.tagName}>{item.tag.name}</span>
            <span>{item.tag.type ? '+' : '-'}{item.amount}</span>
          </div>
        </div>)}

        <div className={styles.add} onClick={addRecords}>
          <Icon name="tianjia"/>
        </div>
      </div>
    </Layout>
  );
}

export default Home
