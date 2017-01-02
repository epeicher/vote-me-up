import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.css';
import configureStore from './redux/configureStore'
import {initStorage } from './redux/voteApp'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore()
initStorage(store.dispatch)

const MainApp = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>)

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
