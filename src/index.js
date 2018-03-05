import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/style.css';

import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

// render(<StorePicker />, document.getElementById('main'));

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

render(<Root />, document.getElementById('main'));
