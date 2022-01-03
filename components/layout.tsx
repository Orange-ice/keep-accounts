import React from 'react';
import styles from '../styles/components/layout.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Icon from './icon';
import cs from 'classnames';

interface LayoutProps {}

const Layout: React.FC = (props) => {
  const {children} = props;
  const router = useRouter();

  const navConfig = [
    {label: '记账', url: '/', icon: 'zhangdan'},
    {label: '统计', url: '/statistics', icon: 'statistics'},
    {label: '我的', url: '/personal', icon: 'personal'}
  ];

  return (
    <div className={styles.container}>
      <main>
        {children}
      </main>

      <footer>
        <nav>
          {navConfig.map(item => (
            <div key={item.url} className={cs(styles.item, {[styles.active]: router.pathname === item.url})}>
              <Icon name={item.icon} className={styles.icon}/>
              <Link href={item.url}><a>{item.label}</a></Link>
            </div>
          ))}
        </nav>
      </footer>
    </div>
  );
};


export default Layout;