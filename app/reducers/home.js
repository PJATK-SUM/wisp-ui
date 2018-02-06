// @flow
import { SET_IDENTIFYING, SET_PERSON, SET_SCHEDULE } from '../actions/home';

export default function homeReducer(
  state: Object = { identifying: false, person: null, schedule: null },
  action: Object
) {
  switch (action.type) {
    case SET_IDENTIFYING:
      return { ...state, identifying: action.identifying };
    case SET_PERSON:
      return { ...state, person: action.person };
    case SET_SCHEDULE:
      return { ...state, schedule: action.schedule };
    default:
      return state;
  }
}
