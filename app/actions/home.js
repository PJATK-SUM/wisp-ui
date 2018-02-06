// @flow
export const SET_IDENTIFYING = 'SET_IDENTIFYING';

export function setIdentifying(identifying) {
  return {
    type: SET_IDENTIFYING,
    identifying
  };
}

export const SET_PERSON = 'SET_PERSON';

export function setPerson(person) {
  return {
    type: SET_PERSON,
    person
  };
}

export const SET_SCHEDULE = 'SET_SCHEDULE';

export function setSchedule(schedule) {
  return {
    type: SET_SCHEDULE,
    schedule
  };
}
