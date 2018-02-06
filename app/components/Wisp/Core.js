// @flow
import React, { Component, PropTypes } from 'react';
import * as PIXI from 'pixi.js';

import styles from './Core.css';
import blobImage from './images/blob.png';
import raysImage1 from './images/rays1.png';
import raysImage2 from './images/rays2.png';

const ROTATION_SLOW = 0.01;
const ROTATION_FAST = 0.03;

const GREEN_HIGH = 0.1;
const BLUE_HIGH = 0.2;

const SIZE_BIG = 200;
const SIZE_SMALL = 150;

const TRANSITION_FACTOR = 0.1;

export default class Core extends Component {
  static get propTypes() {
    return {
      curious: PropTypes.bool,
      identified: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
      curious: false,
      identified: false
    };
  }

  componentDidMount() {
    this.pixiApp = new PIXI.Application(SIZE_BIG, SIZE_BIG, { backgroundColor: 0x000000 });
    this.container.appendChild(this.pixiApp.view);

    this.currentSpeed = this.props.curious ? ROTATION_FAST : ROTATION_SLOW;
    this.targetSpeed = this.currentSpeed;

    this.currentGreen = this.props.curious ? GREEN_HIGH : 0;
    this.targetGreen = this.currentGreen;

    this.currentBlue = this.props.curious ? BLUE_HIGH : 0;
    this.targetBlue = this.currentBlue;

    this.currentSize = this.props.identified ? SIZE_BIG : SIZE_SMALL;
    this.targetSize = this.currentSize;

    const blob = PIXI.Sprite.fromImage(blobImage);
    const rays1 = PIXI.Sprite.fromImage(raysImage1);
    const rays2 = PIXI.Sprite.fromImage(raysImage2);
    const rays3 = PIXI.Sprite.fromImage(raysImage1);
    const curiosityFilter = new PIXI.filters.ColorMatrixFilter();
    const colorMatrix = curiosityFilter.matrix;

    [blob, rays1, rays2, rays3].forEach(sprite => {
      sprite.anchor.set(0.5);
      sprite.x = this.pixiApp.renderer.width / 2;
      sprite.y = this.pixiApp.renderer.height / 2;
      sprite.width = this.currentSize;
      sprite.height = this.currentSize;
      sprite.filters = [curiosityFilter];
      this.pixiApp.stage.addChild(sprite);
    });

    this.pixiApp.ticker.add((delta) => {
      const speedDelta = this.targetSpeed - this.currentSpeed;
      if (speedDelta !== 0) {
        this.currentSpeed += speedDelta * TRANSITION_FACTOR * delta;
      }

      const greenDelta = this.targetGreen - this.currentGreen;
      if (greenDelta !== 0) {
        this.currentGreen += greenDelta * TRANSITION_FACTOR * delta;
      }

      const blueDelta = this.targetBlue - this.currentBlue;
      if (blueDelta !== 0) {
        this.currentBlue += blueDelta * TRANSITION_FACTOR * delta;
      }

      const sizeDelta = this.targetSize - this.currentSize;
      if (sizeDelta !== 0) {
        this.currentSize += sizeDelta * TRANSITION_FACTOR * delta;
      }

      colorMatrix[8] = this.currentGreen;
      colorMatrix[10] = this.currentBlue;
      rays1.rotation += this.currentSpeed * 0.6 * delta;
      rays2.rotation += this.currentSpeed * -1.2 * delta;
      rays3.rotation += this.currentSpeed * 1.5 * delta;

      [blob, rays1, rays2, rays3].forEach(sprite => {
        sprite.width = this.currentSize;
        sprite.height = this.currentSize;
      })
    });
  }

  componentWillReceiveProps(newProps) {
    this.targetSpeed = newProps.curious ? ROTATION_FAST : ROTATION_SLOW;
    this.targetGreen = newProps.curious ? GREEN_HIGH : 0;
    this.targetBlue = newProps.curious ? BLUE_HIGH : 0;
    this.targetSize = newProps.identified ? SIZE_BIG : SIZE_SMALL;
  }

  componentWillUnmount() {
    this.pixiApp.destroy();
  }

  render() {
    return (
      <div
        className={styles.container}
        ref={(ref) => { this.container = ref; }}
      />
    );
  }
}
