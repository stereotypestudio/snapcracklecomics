import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ComicComponent from './Comics/ComicComponent';
import CreateUserComponent from './Users/CreateUserComponent';
import UploadComicComponent from './Comics/UploadComicComponent';
import Dashboard from './Dashboard/Dashboard';
import Welcome from './Users/Welcome';

ReactDOM.render(

<BrowserRouter>
<div>
<Switch>
          <Route exact path='/register' component = {CreateUserComponent} />
          <Route exact path='/dashboard' component = {Dashboard} />
          <Route exact path='/welcome' component = {Welcome} />
</Switch>
<App />
</div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
