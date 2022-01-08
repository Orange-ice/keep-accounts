import styles from '../styles/Register.module.scss';
import {NextPage} from 'next';
import Icon from '../components/icon';
import Input from '../components/input';
import React from 'react';
import Link from 'next/link';

const Register: NextPage = () => {
  const [registerData, setRegisterData] = React.useState({username: '', password: ''});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'username' | 'password') => {
    setRegisterData({
      ...registerData,
      [type]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <Icon name="laohu" className={styles.logo}/>
        <span>T I G E R</span>
      </header>
      <main>
        <div>
          <Input
            className={styles.input}
            placeholder="请输入用户名"
            prefixIcon="user"
            value={registerData.username}
            onChange={(e) => {onChange(e, 'username');}}/>
          <Input
            className={styles.input}
            placeholder="请输入密码"
            prefixIcon="password"
            value={registerData.password}
            type="password"
            onChange={(e) => {onChange(e, 'password');}}
          />
        </div>
      </main>
      <div className={styles.button}>
        <button>注册</button>
      </div>
      <footer>
        <p className={styles.tip}>没有账号？<Link href="/login"><a>点击注册</a></Link></p>
      </footer>
    </div>
  );
};

export default Register;