import React from 'react';
import {Link} from 'react-router-dom'
import './App.scss';


const NavBar = () => (
    <div className="NavBar">
        <br/>
        <h1>World's Most Unnecessary Calculator App</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/whatisthis">What is this?</Link></li>
        </ul>
    </div>
);

export default NavBar;
