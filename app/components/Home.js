// @flow
import React, { Component, PropTypes } from 'react';
import styles from './Home.css';

import Heart from './Heart';

export default class Home extends Component {
  static propTypes = {
    greeting: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.greeter}>
          <Heart />
          {this.props.greeting && <h2>{this.props.greeting}</h2>}
        </div>
      </div>
    );
  }
}
