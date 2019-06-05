import React, { Component } from 'react';
import Form from './components/Form';
// import getTimezoneData from './utils/getTimezoneData';

// const Fragment = React.Fragment;
export default class App extends Component{

  componentDidMount() {
    // getTimezoneData();
  }
// .map(x => String.fromCharcode(x)
  sendMsg() {
    // const evtSource = new EventSource('http://localhost:3101');
    // evtSource.addEventListener('ping', function(e) {
    //   console.log('p ', e);
    // }, false);
    // evtSource.addEventListener('error', function(e) {
    //   console.log('err ', e);
    // });


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

  async postQuery(text) {
    await fetch('http://localhost:3101', {
      method: 'POST',
      body: text
    });
  }


  render() {
    return (
      <>
        <div className="intro">Hello World</div>
        <button type="button" onClick={this.sendMsg}>data</button>
        <Form postQuery={this.postQuery}/>
      </>
    );
  }
}
