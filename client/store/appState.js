import { observable, action, autorun } from 'mobx';

class AppState {
  @observable count = 0;

  @observable name = 'joy';

  @action
  add() {
    this.count = this.count + 1;
  }
}

autorun(() => {
  console.log('autorun count=>');
});


export default AppState;
