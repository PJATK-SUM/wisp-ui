// @flow
import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.greeter}>
          <h2>Good morning</h2>
        </div>
      </div>
    );
  }
}
