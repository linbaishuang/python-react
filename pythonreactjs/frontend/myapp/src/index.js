import {Router, Route } from 'react-router-dom'
import Addnewuser from "./js/Addnewuser"
import Forgetpassword from "./js/Forgetpassword"
import history from './js/history'
import Fream from './js/fream'
import React from 'react' 
import ReactDOM from 'react-dom'
import Login from './js/Login' 
require('./css/index.css');


ReactDOM.render((
        <Router history={history} >
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="login" component={Login} />
                <Route exact path="/addnewuser" component={Addnewuser} />
                <Route exact path="/forget" component={Forgetpassword} />
                <Route path="/fream" component={Fream}/>
            </div>
        </Router>
    ),document.getElementById("root")
)