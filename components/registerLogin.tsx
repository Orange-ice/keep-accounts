import styles from '../styles/components/RegisterLogin.module.scss';
import Icon from '../components/icon';
import Input from '../components/input';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/router';

interface Props {
  type: 'login' | 'register';
  requestUrl: string;
}

const RegisterLogin: React.FC<Props> = (props) => {
  const {type, requestUrl} = props;
  const router = useRouter();
  const [formData, setFormData] = React.useState({username: '', password: ''});
  const [error, setError] = React.useState({
    username: {status: false, message: ''},
    password: {status: false, message: ''}
  });


  const tips = {
    login: {buttonText: '登录', tip: '没有账号？', go: '点击注册', target: '/register'},
    register: {buttonText: '注册', tip: '已有账号？', go: '点击登录', target: '/login'}
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'username' | 'password') => {
    setFormData({
      ...formData,
      [type]: e.target.value
    });
  };

  /**
   * @description 校验用户名密码的输入
   * @return flag true表示有err
   * */
  const validate = () => {
    if (formData.username.length < 2) {
      setError({...error, username: {status: true, message: '用户名长度最少为2'}});
      return true;
    }
    if (formData.password.length < 6) {
      setError({...error, password: {status: true, message: '密码长度最少为6'}});
      return true;
    }
  };

  const onSubmit = () => {
    const hasErr = validate();
    if (hasErr) return;
    axios.post(requestUrl, formData).then(() => {
      window.alert(type === 'register' ? '注册成功' : '登录成功');
      router.push(type === 'register' ? '/login' : '/');
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
            maxLength={8}
            error={error.username}
            value={formData.username}
            onChange={(e) => {onChange(e, 'username');}}/>
          <Input
            className={styles.input}
            placeholder="请输入密码"
            maxLength={16}
            prefixIcon="password"
            error={error.password}
            value={formData.password}
            type="password"
            onChange={(e) => {onChange(e, 'password');}}
          />
        </div>
      </main>
      <div className={styles.button}>
        <button onClick={onSubmit}>{tips[type].buttonText}</button>
      </div>
      <footer>
        <p className={styles.tip}>{tips[type].tip}<Link href={tips[type].target}><a>{tips[type].go}</a></Link></p>
      </footer>
    </div>
  );
};

export default RegisterLogin;