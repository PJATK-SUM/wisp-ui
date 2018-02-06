import React, { PureComponent } from 'react';

import images from './images';

import styles from './Loading.css';

export default class Loading extends PureComponent {
  render() {
    const imageNumber = Math.round(Math.random() * (images.length - 1));
    return (
      <div className={styles.container}>
        <img src={images[imageNumber]} alt="Kot" />
        <h1>Kotting your schedule...</h1>
      </div>
    );
  }
}
