import React from 'react';
import ReactDOM from "react-dom";

import {Calculator} from "./Calculator";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Calculator/>, div);
});

it('adds numbers correctly', () => {
    const component = new Calculator();
    expect(component.tryEnumerate('2 + 6')).toBe('8');
});
