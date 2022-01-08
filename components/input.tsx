import styles from '../styles/components/input.module.scss';
import React from 'react';
import Icon from './icon';
import cs from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: string;
  error?: {
    status: boolean;
    message: string
  };
}

const Input: React.FC<InputProps> = (props) => {
  const {error, className, prefixIcon, ...rest} = props;
  return (
    <div className={styles.box}>
      <div className={cs(styles.container, className)}>
        {prefixIcon && <Icon name={prefixIcon} className={styles.icon}/>}
        <input {...rest}/>
      </div>
      <span className={styles.error}>{error?.status && error.message}</span>
    </div>
  );
};

export default Input;