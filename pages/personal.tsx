/**
 * @description 个人信息页面
 * */

import {NextPage} from 'next';
import Layout from '../components/layout';
import axios from 'axios';
import React from 'react';
import Icon from '../components/icon';
import styles from '../styles/Personal.module.scss';
import dayjs from 'dayjs';
import {alert} from '../components/message';
import {useRouter} from 'next/router';

interface User {
  avatar: null | string,
  id: number,
  username: string,
  createdAt: string
}

const Personal: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  const getUser = () => {
    axios.get('/api/v1/user').then(res => {
      setUser(res.data);
    });
  };

  const logout = () => {
    axios.get('/api/v1/user/logout').then(() => {
      alert('退出登录成功');
      router.push('/login');
    });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <div>
        <header className={styles.header}>
          <Icon name="laohu" className={styles.icon}/>
          <div className={styles.info}>
            <span className={styles.username}>{user?.username}</span>
            <span className={styles.saying}>积少成多，坚持记账的的第<strong>{dayjs().diff(user?.createdAt, 'day')}</strong>天</span>
          </div>
        </header>

        <div className={styles.footer}>
          <button className={styles.logout} onClick={logout}>退出登录</button>
        </div>
      </div>
    </Layout>
  );
};

export default Personal;
