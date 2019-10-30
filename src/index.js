import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.scss';
import TestPage from './TestPage';
import * as serviceWorker from './serviceWorker';
import Home from "./Home";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <div>
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/test" component={TestPage}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </div>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.register();
