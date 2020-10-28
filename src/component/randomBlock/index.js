import React from 'react';
import { getRandom } from '@/utils';
const maxHeight = document.documentElement.clientHeight;
const maxWidth = document.documentElement.clientWidth;
export default class index extends React.PureComponent {
  state = {
    width: this.props.width,
    height: this.props.height,
    left: getRandom.default(maxWidth, 0),
    bottom: -this.props.height,
    speed: this.props.speed,
  };
  move = () => {
    const duration = getRandom.default(30, 20);
    this.timer = setInterval(() => {
      let yDis = (this.state.speed * duration) / 1000;
      let newBottom = this.state.bottom + yDis;
      if (newBottom > maxHeight + this.props.height) {
        clearInterval(this.timer);
        this.setState({
          bottom: -this.props.height,
          left: getRandom.default(maxWidth, 0),
        });
        this.move();
        return;
      }
      this.setState({
        bottom: newBottom,
      });
    }, duration);
  };
  componentDidMount() {
    this.move();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div
        style={{
          width: this.state.width + 'px',
          height: this.state.height + 'px',
          position: 'absolute',
          left: this.state.left + 'px',
          bottom: this.state.bottom + 'px',
          background: '#fbfbfb',
        }}
      ></div>
    );
  }
}
