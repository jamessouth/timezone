import React, { Component } from 'react';
import getTimezoneData from './utils/getTimezoneData';

export default class App extends Component{


  componentDidMount() {
    getTimezoneData();
  }




  render() {
    return (
      <div className="intro">Hello World</div>
    );
  }
}
