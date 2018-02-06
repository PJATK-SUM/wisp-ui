import React, { PureComponent } from 'react';
import log from 'electron-log';
import moment from 'moment';

import NewsItem from './NewsItem';

import styles from './News.css';

export default class News extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      news: []
    };

    this.fetchNews = this.fetchNews.bind(this);
  }

  componentWillMount() {
    this.fetchNews();
    this.interval = setInterval(this.fetchNews, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchNews() {
    fetch('https://pja-rss.herokuapp.com/?format=json')
      .then(this.processNews.bind(this))
      .catch((error) => log.error(error));
  }

  processNews(newsResponse) {
    newsResponse.json().then(rawNews => {
      const news = rawNews
        .map(item => {
          const parsedPublishedAt = moment(item.published_at);

          return {
            id: item.id,
            title: item.title,
            publishedAt: parsedPublishedAt.isValid() && parsedPublishedAt,
            content: item.content
          };
        })
        .filter(item => item.id && item.title && item.publishedAt && item.content)
        .slice(0, 3);

      return this.setState({ news });
    }).catch(error => log.error(error));
  }

  render() {
    const { news } = this.state;
    return (
      <div className={styles.self}>
        <h2>Aktualności</h2>
        {news &&
          <div>
            {news.map(item => <NewsItem key={item.id} item={item} />)}
          </div>
        }
      </div>
    );
  }
}
