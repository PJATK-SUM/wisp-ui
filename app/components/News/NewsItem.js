import React, { PropTypes } from 'react';
import moment from 'moment';
import truncate from 'truncate';

import styles from './NewsItem.css';

export default function NewsItem(props) {
  const { item } = props;

  return (
    <div>
      <h3 className={styles.title}>{item.title}</h3>
      <small>{item.publishedAt.format('LL')}</small>
      <p className={styles.content}>{truncate(item.content, 600)}</p>
    </div>
  );
}

NewsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.instanceOf(moment).isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};
