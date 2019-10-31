import React from 'react';
import 'mathjs';
import './App.scss';
import "./Calculator.scss";
import {Button, ButtonGroup, Dropdown, FormControl} from "react-bootstrap"
import {all, create} from "mathjs";
import insertText from 'insert-text-textarea';

export class Calculator extends React.Component {
    constructor() {
        super();
        this.mathJsConfig = {
            epsilon: 1e-12,
            matrix: 'Matrix',
            number: 'BigNumber',
            precision: 128,
            predictable: false,
            randomSeed: null
        };
        this.math = create(all, this.mathJsConfig);

        this.state = {
            expression: ' ',
            result: ''
        };
        this.textInput = React.createRef();
    }

    renderCalculatorButtons = () =>
        (
            <div>
                <FormControl ref={this.textInput} value={this.state.expression} onChange={this.onExpressionChanged}
                             placeholder="" aria-label="Expression"/>
                <div id="result">{this.state.result}</div>
                <ButtonGroup>
                    <Button onClick={this.moveCursorLeft} variant="secondary">
                        {'<'}
                    </Button>
                    <Button onClick={this.append.bind(this, '-')} variant="secondary">
                        AC
                    </Button>
                    <Button onClick={this.clear} variant="secondary">
                        C
                    </Button>
                    <Button onClick={this.moveCursorRight} variant="secondary">
                        {'>'}
                    </Button>
                </ButtonGroup>
                <br/>
                <ButtonGroup>
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
        this.textInput.current.focus();
        insertText(this.textInput.current, str);
    };

    onExpressionChanged = (event) => {
        let expression = event.target.value.replace(/\s+/g, ' ');
        this.setState({
            expression: expression,
            result: this.tryEnumerate(expression)
        });
    };

    clear = () => {
        this.textInput.current.focus();
        this.textInput.current.selectionStart = 0;
        this.textInput.current.selectionEnd = this.state.expression.length;
        insertText(this.textInput.current, '');
        this.textInput.current.focus();
    };

    moveCursorLeft = () => {
        this.textInput.current.focus();
        if (this.textInput.current.selectionStart === this.textInput.current.selectionEnd)
            this.textInput.current.selectionStart -= 1;
        this.textInput.current.selectionEnd = this.textInput.current.selectionStart;
    };
    moveCursorRight = () => {
        this.textInput.current.focus();
        if (this.textInput.current.selectionStart === this.textInput.current.selectionEnd)
            this.textInput.current.selectionEnd += 1;
        this.textInput.current.selectionStart = this.textInput.current.selectionEnd;
    };

    tryEnumerate(exp) {
        exp = exp.trim();
        if (exp === "")
            return "";
        try {
            const result = this.math.compile(exp).evaluate().toString();
            // Handle strange bug with function names
            if (result.includes("function fn(arg")) {
                return "ERROR";
            }
            return result;
        } catch {
            return "ERROR";
        }
    }

}
