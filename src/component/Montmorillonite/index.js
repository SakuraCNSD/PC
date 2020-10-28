import React from 'react';
import styles from './index.less';
export default function index(props) {
  function handleClick() {
    props.changeShow && props.changeShow({ type: 'cancel' });
  }
  if (props.isFirst && props.isShow) {
    window.scrollTo(0, 0);
  }
  return (
    <div
      className={styles.container}
      style={{
        display: props.isShow ? 'block' : 'none',
      }}
    >
      <div className={styles.content}>
        {props.data}
        <div
          className={styles.btn}
          onClick={handleClick}
          style={{
            top: props.cancelTop + 'px',
          }}
        ></div>
      </div>
    </div>
  );
}
