import React, { PureComponent } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';

import { scheduleShape } from '../../utils/propTypes';

import styles from './Schedule.css';

const startHour = 8;
const endHour = 20;
const scheduleRowHeight = 50;
const backgroundRowStyle = {
  height: scheduleRowHeight
};

function scheduleItemStyle(scheduleItem) {
  const startMinutes = (scheduleItem.start.h * 60) + scheduleItem.start.m;
  const endMinutes = (scheduleItem.end.h * 60) + scheduleItem.end.m;
  const height = ((endMinutes - startMinutes) / 60) * scheduleRowHeight;
  const top = ((startMinutes - (startHour * 60)) / 60) * scheduleRowHeight;
  return {
    height,
    top
  };
}

function timeToMoment(dateString, timeObject) {
  return moment(dateString)
    .add(timeObject.h, 'hours')
    .add(timeObject.m, 'minutes');
}

export default class Schedule extends PureComponent {
  static get propTypes() {
    return {
      schedule: scheduleShape
    };
  }

  static get defaultProps() {
    return {
      schedule: []
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      currentTime: moment()
    };

    this.updateCurrentTime = this.updateCurrentTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateCurrentTime, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateCurrentTime() {
    this.setState({
      currentTime: moment()
    });
  }

  render() {
    const { schedule } = this.props;
    const midnight = this.state.currentTime.clone().startOf('day');
    const minutesFromMidnight = this.state.currentTime.diff(midnight, 'minutes');
    const nowLineOffset = ((minutesFromMidnight - (startHour * 60)) / 60) * scheduleRowHeight;
    const displayNowLine = nowLineOffset > 0 && nowLineOffset < (endHour - startHour) * 60;

    return (
      <div className={styles.self}>
        <h2 className={styles.title}>Plan zajęć <small>{moment().format('LL')}</small></h2>
        <div className={styles.scheduleTable}>
          <div className={styles.scheduleBackground}>
            {_.range(startHour, endHour + 1).map(hour => (
              <div key={hour} style={backgroundRowStyle}>{hour}:00</div>
            ))}
          </div>
          <ul className={styles.schedule}>
            {schedule.map((scheduleItem, index) => {
              const itemStartTime = timeToMoment(scheduleItem.date, scheduleItem.start);
              const itemEndTime = timeToMoment(scheduleItem.date, scheduleItem.end);
              return (
                <li
                  style={scheduleItemStyle(scheduleItem)}
                  className={classNames({ [styles.pastItem]: itemEndTime.isBefore(moment()) })}
                  key={index}
                >
                  <h4 className={styles.scheduleTitle}>
                    <small>{itemStartTime.format('LT')}</small>
                    {scheduleItem.title}
                  </h4>
                  <small>Sala {scheduleItem.room}</small>
                </li>
              );
            })}
          </ul>
          {displayNowLine && <hr style={{ top: nowLineOffset }} className={styles.nowLine} />}
        </div>
      </div>
    );
  }
}
