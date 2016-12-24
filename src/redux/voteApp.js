import * as api from '../api'
import _ from 'lodash'

const VOTING_UP = 'VOTING_UP'
const VOTED = 'VOTED'
const VOTING_DOWN = 'VOTING_DOWN'
const INITIAL_LOAD = 'INITIAL_LOAD'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case INITIAL_LOAD:
      return {items:_.orderBy(action.items,'votes','desc')};
    case VOTING_UP:
    case VOTING_DOWN:
      return {...state,voting : true}
    case VOTED:
      return {...state, voting : false}
    default: return state;
  }
}

function voteUpApi(id) {
  return api.voteUp(id);
}

function voteUpAction(id) {
  return {
    type: VOTING_UP,
    id
  }
}

function votedAction() {
  return {
    type: VOTED
  }
}

export function voteUp(id) {
  return (dispatch) => {
    dispatch(voteUpAction(id))
    voteUpApi(id).then(() => dispatch(votedAction()))
  }
}

function loadedAction(items) {
  return {
    type: INITIAL_LOAD,
    items
  }
}

export function getData() {
  return dispatch => api.getInitialData().then(data => dispatch(loadedAction(data)))
}