import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Signup } from './page';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/login" exact component={Login} /> */}
      <Route path="/signup" exact component={Signup} />
    </Switch>
  </Router>
);
export default App;
