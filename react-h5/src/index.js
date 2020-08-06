import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';
import Rem from './utils/Rem';
import './index.less';

let rem = new Rem({
  designWidth: 750
})

rem.ready(function () {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})