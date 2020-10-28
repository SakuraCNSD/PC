import React from 'react';
import Top from '@/component/Top';
import styles from './index.less';
import left from '@/assets/Image/left.png';
import explain from '@/assets/Image/explain.png';
import right from '@/assets/Image/right.png';
import arrow from '@/assets/Icon/arrowTop.png';
import RandomBlockList from '@/component/randomBlockList';
export default props => {
  function Jump() {
    props.history.push('/detail');
  }
  return (
    <div className={styles.container}>
      <Top />
      <div className={styles.content}>
        <img src={left} alt="leftImg" className={styles.leftImg} />
        <div className={styles.explainContainer}>
          <img src={explain} alt="explainImg" className={styles.explainImg} />
          <div className={styles.btn} onClick={Jump}>
            <i className={styles.mask} />
            <span className={styles.title}>案例展示</span>
          </div>
        </div>
        <img src={right} alt="rightImg" className={styles.rightImg} />
      </div>
      <footer className={styles.footer}>
        <img src={arrow} alt="arrowTop" className={styles.arrowTop} />
      </footer>
      <RandomBlockList />
    </div>
  );
};
