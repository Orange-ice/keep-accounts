/**
 * 记账页
 * */

import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Icon from '../components/icon';
import styles from '../styles/Records.module.scss';
import React from 'react';
import axios from 'axios';

interface Tag {
  id: number;
  name: string;
  icon: string;
  type: 1 | 0;
}

const keyboard = [7, 8, 9, 'delete', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0, '再记', '完成'];

const Records: NextPage = () => {
  const router = useRouter();
  const [selected, setSelected] = React.useState<1 | 0>(0);
  const [tags, setTags] = React.useState<Tag[]>([]);

  React.useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios.get('/api/v1/tag/all').then(res => {
      setTags(res.data);
    });
  };

  const goBack = () => {
    router.back();
  };
  const toggle = (type: 1 | 0) => {
    if (type === selected) return;
    setSelected(type);
  };

  return (
    <div className={styles.container}>
      {/* tab */}
      <header>
        <Icon name="fenxiang" className={styles.back} onClick={goBack}/>
        <div className={styles.type}>
          <span className={selected === 0 ? styles.select : undefined} onClick={() => {toggle(0);}}>支出</span>
          <span className={selected === 1 ? styles.select : undefined} onClick={() => {toggle(1);}}>收入</span>
        </div>
        <div/>
      </header>

      {/* 金额 */}
      <div className={styles.amount}>
        <Icon name="laohu" className={styles.icon}/>
        <span>餐饮日常</span>
        <span className={styles.number}>256</span>
      </div>

      {/* 标签 */}
      <div className={styles.list}>
        {tags.filter(item => item.type === selected).map(item => <div key={item.id} className={styles.wrapper}>
          <div className={styles.iconBox}>
            <Icon name={item.icon} className={styles.icon}/>
          </div>
          <span>{item.name}</span>
        </div>)}
      </div>

      <div className={styles.keyboard}>
        <div>
          {/*  日期选择  图文备注 */}
        </div>
        {/* 键盘 */}
        <div className={styles.keyboardWrapper}>
          {keyboard.map(item => <div key={item} className={styles.keyboardItem}
                                     style={{backgroundColor: item === '完成' ? '#ffd551' : '#fff'}}>
            {item === 'delete' ? <Icon key="delete" name="delete"/> : item}
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Records;