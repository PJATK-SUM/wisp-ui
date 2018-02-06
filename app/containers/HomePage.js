// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import log from 'electron-log';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { setIdentifying, setPerson, setSchedule } from '../actions/home';
import { personShape, scheduleShape } from '../utils/propTypes';
import { firebaseDb, findPersonById } from '../persistence';

import News from '../components/News';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import WeatherClock from '../components/WeatherClock';
import Wisp from '../components/Wisp';

import styles from './HomePage.css';
import logo from './images/logo.png';

class Home extends Component {
  static propTypes = {
    identifying: PropTypes.bool.isRequired,
    person: personShape,
    schedule: scheduleShape,
    setIdentifying: PropTypes.func.isRequired,
    setPerson: PropTypes.func.isRequired,
    setSchedule: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    firebaseDb.ref('screens/proto/identification').on('value', this.identificationChanged.bind(this));
    firebaseDb.ref('screens/proto/identifying').on('value', this.identifyingChanged.bind(this));

    this.mifareService = new WebSocket('ws://localhost:8765/mifare');
    this.studentService = new WebSocket('ws://localhost:8765/student');

    this.mifareService.onmessage = this.scheduleReceived.bind(this);
    this.studentService.onmessage = this.scheduleReceived.bind(this);
  }

  componentWillUnmount() {
    firebaseDb.ref('screens/proto/identification').off('value', this.identificationChanged.bind(this));
    firebaseDb.ref('screens/proto/identifying').off('value', this.identifyingChanged.bind(this));

    this.mifareService.close();
    this.studentService.close();
  }

  setLoading(value) {
    this.setState({ loading: value });

    if (value) {
      this.fetchTimeout = setTimeout(() => {
        this.setState({ loading: false });
      }, 10000);
    } else if (this.fetchTimeout) {
      clearInterval(this.fetchTimeout);
      this.fetchTimeout = null;
    }
  }

  identificationChanged(snapshot) {
    const identification = snapshot.val();

    if (identification === 'mifare') {
      this.fetchByMifare();
      this.props.setPerson(null);
      this.setLoading(true);
    } else if (identification === 'personId') {
      this.fetchByPersonId();
      this.setLoading(true);
    } else {
      this.resetIdentification();
    }
  }

  fetchByMifare() {
    firebaseDb.ref('screens/proto/mifare').once('value', (snapshot) => {
      const mifare = snapshot.val();
      this.mifareService.send(mifare);
    });
  }

  fetchByPersonId() {
    firebaseDb.ref('screens/proto/personId').once('value', (snapshot) => {
      const personId = snapshot.val();

      findPersonById(personId).then(person => {
        if (person.studentId) {
          this.studentService.send(person.studentId);
        }

        return this.props.setPerson(person);
      }).catch(error => {
        log.error(error);
      });
    });
  }

  resetIdentification() {
    this.props.setPerson(null);
    this.props.setSchedule(null);
  }

  identifyingChanged(snapshot) {
    const identifying = snapshot.val();
    this.props.setIdentifying(identifying);
  }

  scheduleReceived(scheduleMessage) {
    const schedule = JSON.parse(scheduleMessage.data);
    this.props.setSchedule(schedule);
    this.setLoading(false);
  }

  render() {
    const { identifying, person, schedule } = this.props;
    const { loading } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} alt="PJATK" width="350" height="108" />
          <WeatherClock />
        </div>
        <Wisp identifying={identifying} person={person} />
        <CSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
            appear: styles.appear,
            appearActive: styles.appearActive
          }}
          transitionAppear
          transitionEnter
          transitionLeave
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          className={styles.transitionContainer}
        >
          {loading && !schedule && <Loading />}
          {schedule && <Schedule schedule={schedule} />}
          {!schedule && !loading && <News />}
        </CSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps({ home: { identifying, person, schedule } }) {
  return { identifying, person, schedule };
}

function mapDispatchToProps(dispatch) {
  return {
    setIdentifying: (identifying) => dispatch(setIdentifying(identifying)),
    setPerson: (person) => dispatch(setPerson(person)),
    setSchedule: (schedule) => dispatch(setSchedule(schedule))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
