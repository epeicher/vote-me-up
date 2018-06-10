import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import './index.css';
import configureStore from './redux/configureStore'
import {initStorage } from './redux/voteApp'

const store = configureStore()
initStorage(store.dispatch)

const theme = createMuiTheme();

const MainApp = () =>
(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
     </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<MainApp />, document.querySelector('#root'));
