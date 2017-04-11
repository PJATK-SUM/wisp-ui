// @flow
import { connect } from 'react-redux';
import Home from '../components/Home';
import { setPerson } from '../actions/home';

function mapStateToProps({ home: { person } }) {
  return { person };
}

function mapDispatchToProps(dispatch) {
  return {
    setPerson: (person) => dispatch(setPerson(person))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
