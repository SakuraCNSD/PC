import React from 'react';
import styles from './index.less';
import logo from '@/assets/Image/logo.png';
export default function index(props) {
  return (
    <header className={props.className ? styles[props.className] : styles.top}>
      <img className={styles.logo} src={logo} alt="logo" />
    </header>
  );
}
