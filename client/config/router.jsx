import React from 'react';
import { Route } from 'react-router-dom';
import TopicList from '../views/topicList';
import TopicDetail from '../views/topicDetail';


export default class Routes extends React.Component {
  render() {
    return (
      [
        <Route path="/detail">
          <TopicDetail />
        </Route>,
        <Route path="/" exact>
          <TopicList />
        </Route>,
      ]
    );
  }
}
