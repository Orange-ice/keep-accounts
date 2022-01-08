import styles from '../styles/Register.module.scss';
import {NextPage} from 'next';
import Icon from '../components/icon';
import Input from '../components/input';
import React from 'react';
import Link from 'next/link';

const Register: NextPage = () => {
  const [registerData, setRegisterData] = React.useState({username: '', password: ''});
  const [error, setError] = React.useState({
    username: {status: false, message: ''},
    password: {status: false, message: ''}
  });


  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'username' | 'password') => {
    setRegisterData({
      ...registerData,
      [type]: e.target.value
    });
  };

  /**
   * @description 校验用户名密码的输入
   * @return flag true表示有err
   * */
  const validate = () => {
    if (registerData.username.length < 2) {
      setError({...error, username: {status: true, message: '用户名长度最少为2'}});
      return true;
    }
    if (registerData.password.length < 6) {
      setError({...error, password: {status: true, message: '密码长度最少为6'}});
      return true;
    }
  };

  const onSubmit = () => {
    const hasErr = validate();
    if (hasErr) return;
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
            maxLength={8}
            error={error.username}
            value={registerData.username}
            onChange={(e) => {onChange(e, 'username');}}/>
          <Input
            className={styles.input}
            placeholder="请输入密码"
            maxLength={16}
            prefixIcon="password"
            error={error.password}
            value={registerData.password}
            type="password"
            onChange={(e) => {onChange(e, 'password');}}
          />
        </div>
      </main>
      <div className={styles.button}>
        <button onClick={onSubmit}>注册</button>
      </div>
      <footer>
        <p className={styles.tip}>没有账号？<Link href="/login"><a>点击注册</a></Link></p>
      </footer>
    </div>
  );
};

export default Register;