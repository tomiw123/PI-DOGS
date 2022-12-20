import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // hay que envolver todo el index (<React.StrictMode> y todo lo de adentro) en un componente Provider para que ande redux.
import { store } from '../src/store/index.js';

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode >
      <App />
    </React.StrictMode>
  </Provider>,//envolvemos si o si aca para que redux este conectado
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
