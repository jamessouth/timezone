import React, { Component } from 'react';
import getTimezoneData from './utils/getTimezoneData';

const Fragment = React.Fragment;
export default class App extends Component{


  componentDidMount() {
    // getTimezoneData();
  }

  sendMsg = e => {
    fetch('http://localhost:3101').then(x => x.json()).then(y => console.log(y));
  }


  render() {
    return (
      <Fragment>
        <div className="intro">Hello World</div>
        <button onClick={this.sendMsg}>eee</button>
      </Fragment>
    );
  }
}
