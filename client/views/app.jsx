
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';
import Routes from '../config/router';

// import AppState from '../store/appState';

// const store = new AppState();

// const App = () => (
//   <Provider store={store}>
//     <Router>
//       <div>This is app</div>
//       <Link to="/detail">
//         Detail
//       </Link>
//       <Link to="/">
//         Home
//       </Link>
//       <Link to="/testapi">
//         TestApi
//       </Link>
//       <Routes />
//     </Router>
//   </Provider>
// );

class App extends React.Component {
  componentDidMount() {
    // do something
    console.log('do something');
  }

  render() {
    return (
      [
        <div>This is app123</div>,
        <Routes />,
        <Link to="/testapi">
          testApi
        </Link>,
        <Link to="/">
          home
        </Link>,
        <Link to="/detail">
          detail
        </Link>,

      ]

    );
  }
}
export default hot(App);
