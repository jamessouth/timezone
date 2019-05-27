import React, { Component } from 'react';
// import getTimezoneData from './utils/getTimezoneData';

const Fragment = React.Fragment;
export default class App extends Component{




  componentDidMount() {
    // getTimezoneData();
  }
// .map(x => String.fromCharcode(x)
  sendMsg() {
    fetch('http://localhost:3101')
    // .then(x => x.json())
    .then(async res => {
      let ooo = res.body.getReader();
      let ttt = await ooo.read();
      async function uuu({done, value}) {
        if (done) return;
        console.log(new TextDecoder('utf-8').decode(value));

        return ooo.read().then(uuu);
      }
      return await uuu(ttt);
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
