import React from 'react';
import {Link} from 'react-router-dom'
import './App.scss';


const Navbar = props => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/test">Test</Link></li>
        <li>{props.test}</li>
    </ul>
);

export default Navbar;
