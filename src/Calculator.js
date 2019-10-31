import React from 'react';
import 'mathjs';
import './App.scss';
import "./Calculator.scss";
import {Accordion, Button, Card, FormControl} from "react-bootstrap"
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

    renderCalculator = () =>
        <div className="Calculator">
            <div className={this.state.result.length < 10 ? "result" : "result resultSmall"}>{this.state.result}</div>
            <div className="resultHelperText">{this.getExponentText()}</div>
            <FormControl className="expression" ref={this.textInput} value={this.state.expression}
                         onChange={this.onExpressionChanged}
                         placeholder="" aria-label="Expression"/> <br/>
            <Accordion>
                <Card>
                    <Accordion.Toggle className="accordionHeader" as={Card.Header} eventKey="0">
                        Extra stuff
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {this.renderExtraFunctions()}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <div className="buttonContainer">
                <Button onClick={this.moveCursorLeft} variant="secondary">
                    {'<'}
                </Button>
                <Button onClick={this.moveCursorRight} variant="secondary">
                    {'>'}
                </Button>
                <Button onClick={this.clear} variant="secondary">
                    C
                </Button>
                <Button onClick={this.delete} variant="secondary">
                    DEL
                </Button>

                <Button onClick={this.bindAppend('(')} variant="secondary">
                    (
                </Button>
                <Button onClick={this.bindAppend(')')} variant="secondary">
                    )
                </Button>
                <Button onClick={this.bindAppend('^')} variant="secondary">
                    EXP
                </Button>
                <Button onClick={this.bindAppend('/')} variant="secondary">
                    ÷
                </Button>

                {this.renderButtons(7, 9)}

                <Button onClick={this.bindAppend('*')} variant="secondary">
                    x
                </Button>

                {this.renderButtons(4, 6)}

                <Button onClick={this.bindAppend('-')} variant="secondary">
                    -
                </Button>

                {this.renderButtons(1, 3)}

                <Button onClick={this.bindAppend('+')} variant="secondary">
                    +
                </Button>

                <Button onClick={this.bindAppend('0')} variant="secondary">
                    0
                </Button>

                <Button onClick={this.bindAppend('.')} variant="secondary">
                    .
                </Button>

                <Button className="smallText" onClick={this.undo} variant="secondary">
                    UNDO
                </Button>

                <Button className="smallText" onClick={this.redo} variant="secondary">
                    REDO
                </Button>

            </div>
        </div>;

    getExponentText = () => {
        let matches = this.state.result.match(/[\n]*e([+-])\s*([^\n\r]*)/);
        if (matches == null)
            return "";
        return matches[0];
    };

    renderButtons = (start, end) => {
        const output = [];
        for (let i = start; i < end + 1; i++) {
            output.push(<Button key={"button_" + i} onClick={this.bindAppend(i)} variant="secondary"> {i} </Button>);
        }
        return output;
    };

    renderExtraFunctions = () => {
        const output = [];
        const functions = ["abs", "factorial", "log", "log2", "log10"];
        const trigFunctions = ["sin", "cos", "tan", "sec", "csc", "cot"];
        const constants = ["pi", "tau", "e", "phi", "i", "deg"];
        output.push(<p key="functions">Functions</p>);
        for (let f of functions) {
            output.push(<span className="defaultLink" key={f} onClick={this.bindAppend(f + '(')}>{f} </span>);
        }
        output.push(<br key="brk1"/>);
        for (let f of trigFunctions) {
            output.push(<span className="defaultLink" key={f} onClick={this.bindAppend(f + '(')}>{f} </span>);
            output.push(<span className="defaultLink" key={f + '2'} onClick={this.bindAppend(f + 'h(')}>{f}h </span>);
            output.push(<span className="defaultLink" key={f + '3'}
                              onClick={this.bindAppend('a' + f + '(')}>a{f} </span>);
            output.push(<span className="defaultLink" key={f + '4'}
                              onClick={this.bindAppend('a' + f + 'h(')}>a{f}h </span>);
        }
        output.push(<p key="constants"><br/>Constants</p>);
        for (let c of constants) {
            output.push(<span className="defaultLink" key={c} onClick={this.bindAppend(c)}>{c} </span>);
        }
        return output;
    };

    render = () => {
        return this.renderCalculator();
    };

    append = (str) => {
        this.textInput.current.focus();
        insertText(this.textInput.current, str);
    };

    bindAppend = (str) => {
        return this.append.bind(this, str);
    };

    onExpressionChanged = (event) => {
        let expression = event.target.value.replace(/\s+/g, '');
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

    delete = () => {
        this.textInput.current.focus();
        if (this.textInput.current.selectionEnd === this.textInput.current.selectionStart) {
            this.textInput.current.selectionEnd = this.textInput.current.selectionStart;
            this.textInput.current.selectionStart = this.textInput.current.selectionEnd - 1;
        }
        insertText(this.textInput.current, '');
        this.textInput.current.focus();
    };

    undo = () => {
        this.textInput.current.focus();
        document.execCommand('undo', false, null);
    };

    redo = () => {
        this.textInput.current.focus();
        document.execCommand('redo', false, null);
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

    tryEnumerate(exp, iteration = 0) {
        iteration++;
        exp = exp.trim();
        if (exp === "")
            return "";
        try {
            let result = this.math.compile(exp).evaluate();
            // Fix for weird mathjs function bug
            if (typeof result === "function")
                return "ERROR";

            result = this.math.round(result, 10);

            return result.toString();
        } catch (err) {
            if (iteration < 2) {
                const numOpenParentheses = (exp.match(/\(/g) || []).length;
                const numClosedParentheses = (exp.match(/\)/g) || []).length;
                const parenthesesToAdd = numOpenParentheses - numClosedParentheses;
                if (parenthesesToAdd > 0) {
                    let parentheses = "";
                    for (let i = 0; i < parenthesesToAdd; i++) {
                        parentheses += ")";
                    }
                    return this.tryEnumerate(exp + parentheses, iteration);
                }
            }

            return "ERROR";
        }
    }

}
