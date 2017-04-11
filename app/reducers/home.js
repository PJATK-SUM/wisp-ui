// @flow
import { SET_PERSON } from '../actions/home';

export default function setPerson(state: Object = { person: null }, action: Object) {
  switch (action.type) {
    case SET_PERSON:
      return { ...state, person: action.person };
    default:
      return state;
  }
}
