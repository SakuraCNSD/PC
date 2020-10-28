import React from 'react';
import Top from '@/component/Top';
import Montmorillonite from '@/component/Montmorillonite';
import styles from './index.less';
import advantage from '@/assets/Image/advantage.png';
import cooperation from '@/assets/Image/cooperation.png';
import test from '@/assets/Image/test.jpg';
export default class index extends React.PureComponent {
  state = {
    isShow: false,
    MontmorilloniteData: null,
    cancelTop: 0,
    initTop: 0,
    isFirst: true,
  };
  refArr = [];
  changeShow = ({ type, payload }) => {
    switch (type) {
      case 'cancel':
        window.scrollTo(0, this.state.initTop);
        this.setState({
          isFirst: true,
          cancelTop: 0,
        });
        break;
      case 'show':
        this.setState({
          MontmorilloniteData: payload,
        });
        break;
    }
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  isOpen = () => {
    if (this.refArr.length <= 0) return;
    const rest = this.refArr.filter(item => {
      const dom = item.current;
      if (!dom) return;
      if (
        dom.className.indexOf('bigWidth') < 0 ||
        dom.className.indexOf('smallWidth') < 0
      )
        return item;
    });
    if (rest.length > 0) {
      this.plate = rest.map(item => {
        const dom = item.current;
        if (
          dom.offsetTop + 278 <
          window.scrollY + document.documentElement.clientHeight
        ) {
          if (dom.clientWidth > 500) {
            dom.classList.add(styles.bigWidth);
          } else {
            dom.classList.add(styles.smallWidth);
          }
        }
      });
    }
  };
  componentDidMount() {
    this.isOpen();
    window.addEventListener('scroll', () => {
      this.isOpen();
      if (this.state.isShow) {
        if (this.state.isFirst) this.setState({ isFirst: false });
        this.setState({
          cancelTop: window.scrollY,
        });
      } else {
        this.setState({
          initTop: window.scrollY,
        });
      }
    });
  }
  componentWillUnmount() {
    window.addEventListener('scroll', null);
  }
  render() {
    const className = this.state.isShow ? styles.banScrollCss : styles.wrapper;
    this.plate = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'ninth',
    ].map((item, index) => {
      this.refArr[index] = React.createRef();
      return (
        <div
          className={styles[item]}
          onClick={this.changeShow.bind(this, { type: 'show', payload: item })}
          ref={this.refArr[index]}
          key={index}
        >
          <img src={test} />
        </div>
      );
    });
    return (
      <>
        <div
          className={className}
          style={{
            top: -this.state.initTop + 'px',
          }}
        >
          <Top className="fixedTop" />
          <div className={styles.container}>
            <div className={styles.content}>{this.plate}</div>
            <div className={styles.advantage}>
              <img src={advantage} alt="advantage" />
            </div>
            <div className={styles.strength}>
              <span className={styles.msg}>客户的支持让我们不断向前</span>
            </div>
            <div className={styles.cooperation}>
              <img src={cooperation} alt="cooperation" />
            </div>
          </div>
          <footer className={styles.footer}>
            <div className={styles.left}>
              <span>一千零一科技 丨 广州 · 深圳</span>
            </div>
            <div className={styles.right}>
              <span className={styles.Ecopyright}>
                Copyright © 2016 - 2020 O1001. All Rights Reserved.
              </span>
              <span className={styles.copyright}>内容粤ICP备19109919号</span>
            </div>
          </footer>
        </div>
        <Montmorillonite
          changeShow={this.changeShow}
          isShow={this.state.isShow}
          data={this.state.MontmorilloniteData}
          cancelTop={this.state.cancelTop}
          isFirst={this.state.isFirst}
        />
      </>
    );
  }
}
