import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {initStorage} from './api'
import configureStore from './redux/configureStore'

initStorage()
const store = configureStore()

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>)

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
