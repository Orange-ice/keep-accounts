import Script from 'next/script';
import styles from '../styles/components/icon.module.scss';
import React from 'react';
import cs from 'classnames';

type IconProps = {
  name: string
} & React.SVGAttributes<SVGElement>


const Icon: React.FC<IconProps> = (props) => {
  const {name, className, children, ...rest} = props;
  const classnames = cs(styles.icon, className);
  return (
    <>
      <Script src="//at.alicdn.com/t/font_2565081_alre73xthn6.js"/>
      <svg className={classnames} {...rest}>
        <use xlinkHref={`#icon-${name}`}/>
      </svg>
    </>
  );
};

export default Icon;