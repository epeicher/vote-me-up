import * as api from '../api'
import _ from 'lodash'

const VOTING_UP = 'VOTING_UP'
const VOTES_UPDATED = 'VOTES_UPDATED'
const ITEM_ADDED = 'ITEM_ADDED'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case VOTES_UPDATED:
      if(!action.items) return state;
      return {items:action.items};
    case VOTING_UP:
      return {...state,voting : true}
    case ITEM_ADDED:
      return {...state, currentItemValue:''}
    default: return state;
  }
}

function voteUpAction(id) {
  return {
    type: VOTING_UP,
    id
  }
}

export function voteUp(id) {
  return (dispatch) => {
    dispatch(voteUpAction(id))
    api.voteUp(id).then(() => dispatch(votedAction()))
  }
}

function votedAction(items) {
  return {
    type: VOTES_UPDATED,
    items
  }
}

export function getVotes() {
  return dispatch => 
    api.getListOfItems(items => dispatch(votedAction(items)))
}

function addItemObject(item) {
  return {
    name: item,
    votes: 0
  }
}

export function addItem(name) {
  return dispatch =>
    api.addItem(addItemObject(name))
      .then(dispatch({type:ITEM_ADDED}))
}