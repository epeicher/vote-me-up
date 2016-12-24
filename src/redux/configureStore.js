import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import voteApp from './voteApp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
  return createStore(voteApp, initialState, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore;