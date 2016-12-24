import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.css';
import {initStorage} from './api'
import configureStore from './redux/configureStore'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

initStorage()
const store = configureStore()

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
