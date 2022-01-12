/**
 * 记账页
 * */

import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Icon from '../components/icon';
import styles from '../styles/Records.module.scss';
import React from 'react';
import axios from 'axios';
import cs from 'classnames';
import {alert} from '../components/message';

interface Tag {
  id: number;
  name: string;
  icon: string;
  type: 1 | 0;
}

const keyboard = ['7', '8', '9', 'delete', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '再记', '完成'];
const colors: { [K: string]: string } = {
  'eating': '#ffa62a',
  'living': '#67c9d2',
  'shopping': '#ff9390',
  'snacks': '#fcc92d',
  'traffic': '#373e50',
  'medical': '#fda2b4',
  'education': '#719c66',
  'amusement': '#7051ed',
  'house': '#767ffe',
  'gift': '#faab73',
  'salary': '#716857',
  'bonus': '#ff754a',
};

const Records: NextPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = React.useState<1 | 0>(0);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectTag, setSelectTag] = React.useState<Tag | null>(null);
  const [amount, setAmount] = React.useState('0');

  React.useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios.get('/api/v1/tag/all').then(res => {
      const resource: Tag[] = res.data;
      setTags(resource);
      setSelectTag(resource.filter(item => item.type === 0)[0]);
    });
  };

  const goBack = () => {
    router.back();
  };

  const toggleType = (type: 1 | 0) => {
    if (type === selectedType) return;
    setSelectedType(type);
    setSelectTag(tags.filter(item => item.type === type)[0]);

  };

  const onTagClick = (tag: Tag) => {
    if (tag.id === selectTag?.id) return;
    setSelectTag(tag);
  };

  const onKeyboardClick = (item: string) => {
    /**
     * @description 加减操作
     * @param type 加/减
     * @param source 源数据
     * @return result 更新后的源数据
     * */
    function modified(type: '+' | '-', source: string) {
      let result = '';
      if (source.indexOf('+') === -1 && source.indexOf('-') === -1) {
        result = source + type;
      } else {
        const exist = source.indexOf('+') === -1 ? '-' : '+';
        // [8+8] amount已包含加号，先求当前的和再加上+
        result = source.split(exist).reduce((previousValue, currentValue) => {
          return parseFloat(previousValue) + parseFloat(`${exist}${currentValue}`) + type;
        });
      }
      return result;
    }

    let newAmount = '';
    switch (item) {
      case 'delete':
        newAmount = amount.length === 1 ? '0' : amount.slice(0, -1);
        break;
      case '+':
        newAmount = modified('+', amount);
        break;
      case '-':
        newAmount = modified('-', amount);
        break;
      case '完成':
        submit();
        newAmount = '0';
        break;
      default:
        newAmount = amount === '0' ? item : amount + item;
    }
    if (newAmount.length === 10) return;
    setAmount(newAmount);
  };

  const submit = () => {
    if (!selectTag) return;
    const postData = {
      tagId: selectTag.id,
      amount,
      content: '---'
    };
    axios.post('/api/v1/record', postData).then(() => {
      alert('账单已添加');
      router.push('/');
    });
  };

  return (
    <div className={styles.container}>
      {/* tab */}
      <header>
        <Icon name="fenxiang" className={styles.back} onClick={goBack}/>
        <div className={styles.type}>
          <span className={selectedType === 0 ? styles.select : undefined} onClick={() => {toggleType(0);}}>支出</span>
          <span className={selectedType === 1 ? styles.select : undefined} onClick={() => {toggleType(1);}}>收入</span>
        </div>
        <div/>
      </header>

      {/* 金额 */}
      <div className={styles.amount} style={{backgroundColor: colors[selectTag?.icon || '']}}>
        <Icon name={selectTag?.icon || 'laohu'} className={styles.icon}/>
        <span>{selectTag?.name}</span>
        <span className={styles.number}>{amount}</span>
      </div>

      {/* 标签 */}
      <div className={styles.list}>
        {tags.filter(item => item.type === selectedType).map(item => <div key={item.id} className={styles.wrapper}
                                                                          onClick={() => {onTagClick(item);}}>
          <div className={styles.iconBox}
               style={selectTag?.id === item.id ? {backgroundColor: colors[item.icon]} : undefined}>
            <Icon name={item.icon}
                  className={cs(styles.icon, selectTag?.id === item.id ? styles.selected : undefined)}/>
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
                                     style={{backgroundColor: item === '完成' ? '#ffd551' : '#fff'}}
                                     onClick={() => {onKeyboardClick(item);}}
          >
            {item === 'delete' ? <Icon key="delete" name="delete"/> : item}
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Records;