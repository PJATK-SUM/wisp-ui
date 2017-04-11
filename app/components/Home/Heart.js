// @flow
import React, { Component } from 'react';
import styles from './Heart.css';

export default class Heart extends Component {
  render() {
    return (<div className={styles.container}>
      <div className={styles.heart} />
    </div>);
  }
}
