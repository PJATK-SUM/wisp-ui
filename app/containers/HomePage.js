// @flow
import { connect } from 'react-redux';
import Home from '../components/Home';

function mapStateToProps(store) {
  return {
    greeting: store.greeting || 'Hello, anyone there?'
  };
}

export default connect(mapStateToProps)(Home);
