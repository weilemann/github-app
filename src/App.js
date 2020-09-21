import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import List from './pages/List';
import Repository from './pages/Repository';
import GlobalStyles from './styles/global';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={List} />
        <Route path='/repository/:repository+' component={Repository} />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
