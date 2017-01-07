import * as api from '../api'
import findIndex from 'lodash/findIndex'

const VOTING_UP = 'VOTING_UP'
const VOTES_UPDATED = 'VOTES_UPDATED'
const ITEM_ADDED = 'ITEM_ADDED'
const ITEM_DELETED = 'ITEM_DELETED'
const ITEM_EDITING = 'ITEM_EDITING'
const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case VOTES_UPDATED:
      if(!action.items) return state;
      return {...state,items:action.items};
    case VOTING_UP:
      return {...state,voting : true}
    case ITEM_ADDED:
      return {...state, currentItemValue:''}
    case ITEM_EDITING:
      let itemIndex = findIndex(state.items, i => i.id === action.id)
      if(itemIndex === -1) return state;
      let item = state.items[itemIndex];
      item.editedValue = action.itemValue || item.name;
      item.isEditing = action.itemValue || action.isEditing;
      const newItems = [...state.items.slice(0,itemIndex),
          item,
          ...state.items.slice(itemIndex+1)];
      return {...state, items: newItems }
    case USER_LOGGED_IN:
    case USER_LOGGED_OUT:
      return {...state, user: action.user}
    default: return state;
  }
}

function voteUpAction(id) {
  return {
    type: VOTING_UP,
    id
  }
}


function votedAction(items) {
  return {
    type: VOTES_UPDATED,
    items
  }
}

function addItemObject(item) {
  return {
    name: item,
    votes: 0
  }
}

export function getVotes() {
  return dispatch => 
    api.getListOfItems(items => dispatch(votedAction(items)))
}

export function voteUp(id) {
  return (dispatch) => {
    dispatch(voteUpAction(id))
    api.voteUp(id).then(() => dispatch(votedAction()))
  }
}

export function addItem(name) {
  return dispatch =>
    api.addItem(addItemObject(name))
      .then(dispatch({type:ITEM_ADDED}))
}

export function editItem(id) {
  return {type:ITEM_EDITING,id,isEditing:true}
}

export function itemEdited(id,value) {
  return dispatch => {
    dispatch({type:ITEM_EDITING, id, isEditing: false});
    api.updateItem(id,value);
  }
}

export function cancelEditing(id) {
  return {type:ITEM_EDITING, id, isEditing:false}
}

export function changingItem(id,itemValue) {
  return {type: ITEM_EDITING, id, itemValue }
}

export function deleteItem(id) {
    return dispatch =>
    api.deleteItem(id)
      .then(() => dispatch({type:ITEM_DELETED})) 
}

export function initStorage(d) {
  api.initStorage()
  registerUserListener(d)
}

function registerUserListener(dispatch) {
  dispatch(d => {
    api.registerUserListener(user => {
      if (!user) { d({ type: USER_LOGGED_OUT }) }
      else {
        d({ type: USER_LOGGED_IN, user })
      }
    });
  });
}