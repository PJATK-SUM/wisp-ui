import React, { PureComponent } from 'react';
import moment from 'moment';
import log from 'electron-log';
import classNames from 'classnames';

import styles from './WeatherClock.css';
import icons from './weather-icons.css';

const OWAPI_KEY = '1dcbb1b5d6ab88237d84042d31b18863';
const OWAPI_URL = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=Warsaw,pl&APPID=${OWAPI_KEY}`;
const ICON_MAPPING = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-sunny-overcast',
  '03d': 'wi-day-cloudy',
  '04d': 'wi-cloudy',
  '09d': 'wi-day-showers',
  '10d': 'wi-day-rain',
  '11d': 'wi-day-thunderstorm',
  '13d': 'wi-day-snow',
  '50d': 'wi-day-fog',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-partly-cloudy',
  '03n': 'wi-night-cloudy',
  '04n': 'wi-cloudy',
  '09n': 'wi-night-showers',
  '10n': 'wi-night-rain',
  '11n': 'wi-night-thunderstorm',
  '13n': 'wi-night-snow',
  '50n': 'wi-night-fog'
};
const DESCRIPTION_MAPPING = {
  'clear sky': 'bezchmurnie',
  'few clouds': 'mało chmur',
  'scattered clouds': 'małe zachmurzenie',
  'broken clouds': 'pochmurnie',
  'shower rain': 'przelotne deszcze',
  'rain': 'deszcz',
  'thunderstorm': 'burza',
  'snow': 'śnieg',
  'mist': 'mgła'
};

export default class WeatherClock extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      time: moment()
    };

    this.refreshTime = this.refreshTime.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(this.refreshTime, 1000 * 5);
    this.weatherInterval = setInterval(this.fetchWeather, 1000 * 60 * 30);

    this.fetchWeather();
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    clearInterval(this.weatherInterval);
  }

  fetchWeather() {
    fetch(OWAPI_URL)
      .then(weatherResponse => weatherResponse.json())
      .then(response => {
        const readings = response.weather;
        const main = response.main;

        if (readings.length > 0) {
          const reading = readings[0];
          const icon = reading.icon;
          const description = reading.description;

          this.setState({
            weather: {
              icon: ICON_MAPPING[icon],
              temperature: Math.round(main.temp),
              pressure: main.pressure,
              humidity: main.humidity,
              description: DESCRIPTION_MAPPING[description]
            }
          });
        }

        return response;
      })
      .catch(error => log.error(error));
  }

  refreshTime() {
    this.setState({
      time: moment()
    });
  }

  render() {
    const { time, weather } = this.state;

    return (
      <div className={styles.self}>
        {weather &&
          <div className={styles.weather}>
            <i className={classNames(styles.icon, icons.wi, icons[weather.icon])} />
            <div className={styles.text}>
              <span>{time.format('LLLL')}</span>
              <span className={styles.description}>
                {weather.description ? `${weather.description}, ${weather.temperature}°C` : `${weather.temperature}°C`}
              </span>
            </div>
          </div>
        }
      </div>
    );
  }
}
