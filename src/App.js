import React, { Component } from 'react';
// import getTimezoneData from './utils/getTimezoneData';

const Fragment = React.Fragment;
export default class App extends Component{




  componentDidMount() {
    // getTimezoneData();
  }
// .map(x => String.fromCharcode(x)
  sendMsg() {
    console.log(new Date());
    fetch('http://localhost:3101')
    // .then(x => x.json())
    .then(async res => {
      const readr = res.body.getReader();
      const data = await readr.read();
      async function processData({done, value}) {
        if (done) return;
        console.log(new TextDecoder('utf-8').decode(value));

        return readr.read().then(processData);
      }
      return await processData(data);
    });

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
