import styles from '../styles/components/input.module.scss';
import React from 'react';
import Icon from './icon';
import cs from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const {className, prefixIcon, ...rest} = props;
  return (
    <div className={cs(styles.container, className)}>
      {prefixIcon && <Icon name={prefixIcon} className={styles.icon}/>}
      <input {...rest}/>
    </div>
  );
};

export default Input;