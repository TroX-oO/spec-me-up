import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import moment from 'moment';
import 'moment/locale/fr.js';
import './index.css';
import 'typeface-roboto';
import App from './App';

moment.locale('fr');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
