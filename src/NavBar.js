import React from 'react';
import {Link} from 'react-router-dom'
import './App.scss';


const NavBar = () => (
    <div>
        <h1>World's Most Useless Calculator App</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/test">Test</Link></li>
        </ul>
    </div>
);

export default NavBar;
