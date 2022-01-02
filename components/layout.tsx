/**
 * @description 布局组件
 * */

import styles from '../styles/components/Layout.module.scss';
import {NextComponentType} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';

interface LayoutProps {}

const Layout: NextComponentType = (props) => {
  const {children} = props;
  const router = useRouter();

  const navConfig = [
    {label: '记账', url: '/', icon: '/layout/money.png'},
    {label: '统计', url: '/statistics', icon: '/layout/statistics.png'},
    {label: '我的', url: '/personal', icon: '/layout/personal.png'}
  ];

  return (
    <div className={styles.container}>
      <main>
        {children}
      </main>

      <footer>
        <nav>
          {navConfig.map(item => (
            <div key={item.url} className={styles.item}>
              <Image src={item.icon} width={24} height={24}/>
              <Link href={item.url}>
                <a className={router.pathname === item.url ? styles.active : undefined}>{item.label}</a>
              </Link>
            </div>
          ))}
        </nav>
      </footer>
    </div>
  );
};


export default Layout;