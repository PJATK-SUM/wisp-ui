// @flow
import React, { Component } from 'react';
import { Application, Graphics, filters } from 'pixi.js';

import styles from './Heart.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

export default class Heart extends Component {
  componentDidMount() {
    this.pixiApp = new Application(CANVAS_WIDTH, CANVAS_HEIGHT, { antialias: true });
    this.gfx = new Graphics();
    this.heart.appendChild(this.pixiApp.view);

    this.drawHeart();

    this.pixiApp.stage.addChild(this.gfx);
  }

  drawHeart() {
    this.gfx.lineStyle(1, 0xffffff, 0.7);

    for (let i = 0; i < 150; i += 1) {
      const x = (Math.random() * CANVAS_WIDTH) - (CANVAS_WIDTH / 2);
      const y = (Math.random() * CANVAS_WIDTH) - (CANVAS_WIDTH / 2);

      this.lineTo(x, y);
    }

    this.gfx.filters = [new filters.BlurFilter(4, 7, 15)];
  }

  lineTo(x, y) {
    const actualX = x + (CANVAS_WIDTH / 2);
    const actualY = y + (CANVAS_HEIGHT / 2);

    this.gfx.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.gfx.lineTo(actualX, actualY);
  }

  render() {
    return (<div className={styles.container}>
      <div ref={(ref) => { this.heart = ref; }} />
    </div>);
  }
}
