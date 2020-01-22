import React from 'react';
import axios from 'axios';

class TestApiView extends React.Component {
  getTopics = () => {
    axios.get('/api/topics').then((resp) => {
      console.log(resp);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: 'c52562d6-c160-46a1-8e5e-062967138c72',
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true').then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    return (
      <div>
        <button type="button" onClick={this.getTopics}>topics</button>
        <button type="button" onClick={this.login}>login</button>
        <button type="button" onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}

export default TestApiView;
