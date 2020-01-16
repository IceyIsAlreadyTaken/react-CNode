import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class TopicList extends React.Component {
  add = () => {
    const { store } = this.props;
    store.add();
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        this is topic List ,counts is
        {store.count}
        <div onClick={this.add}>add count</div>
      </div>
    );
  }
}
export default TopicList;
