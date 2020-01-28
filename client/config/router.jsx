import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import TopicList from '../views/topicList';
import TopicDetail from '../views/topicDetail';
import TestApiView from '../views/testApi';


export default class Routes extends React.Component {
  render() {
    return (
      [
        <Route path="/detail">
          <TopicDetail />
        </Route>,
        <Route path="/" exact>

          <Redirect to="/detail" />
        </Route>,
        <Route path="/testapi">
          <TestApiView />
        </Route>,

      ]
    );
  }
}
