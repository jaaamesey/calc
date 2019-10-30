import React from 'react';
import 'mathjs';
import './App.scss';
import {Button, ButtonGroup, Dropdown, FormControl} from "react-bootstrap"


export class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {expression: ''};
        this.textInput = React.createRef();
    }

    renderCalculatorButtons = () =>
        (
            <div>
                <FormControl ref={this.textInput} value={this.state.expression} onChange={this.onExpressionChanged}
                             placeholder="" aria-label="Expression"/>
                <ButtonGroup aria-label="Calculator buttons">
                    <Button onClick={this.append.bind(this, '+')} variant="secondary">
                        +
                    </Button>
                    <Button onClick={this.append.bind(this, '-')} variant="secondary">
                        -
                    </Button>
                    <Button onClick={this.append.bind(this, '*')} variant="secondary">
                        x
                    </Button>
                    <Button onClick={this.append.bind(this, '/')} variant="secondary">
                        ÷
                    </Button>
                </ButtonGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="test">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );

    render = () => {
        return this.renderCalculatorButtons();
    };

    append = (str) => {
        const expression = this.state.expression;
        const selectionStart = this.textInput.current.selectionStart;
        const selectionEnd = this.textInput.current.selectionEnd;

        this.setState({
            expression: (expression.slice(0, selectionStart) + str + expression.slice(selectionEnd, expression.length)).trim()
        }, () => {
            this.textInput.current.focus();
            this.textInput.current.selectionStart = selectionStart + 1;
            this.textInput.current.selectionEnd = this.textInput.current.selectionStart;
        });
    };

    onExpressionChanged = (event) => {
        this.setState({
            expression: (event.target.value)
        });
    };

}
