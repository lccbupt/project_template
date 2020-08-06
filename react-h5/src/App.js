import React , { Component } from 'react';
import ReactDom from 'react-dom';
import IndexPage from './components/CouponList/index';

class App extends Component {
  render() {
    return (
      <div>
        <p>hello world!</p>
        <IndexPage />
      </div>
    )
  }
}
 export default App;