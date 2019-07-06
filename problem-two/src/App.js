import React, {Component} from 'react';
import './App.scss';
import Controls from './components/Controls';
import {addition, divide, multiply, percent, sign, subtract} from './functionality/Operations';

let selectedButtons = require('./Calculator-Type/standard').buttons;

class App extends Component {
    state = {
        buttons: selectedButtons,
        currentValue: 0,
        currentValueDecFlag: false,
        nextValue: 0,
        nextValueDecFlag: false,
        selectedOperation: null,
        result: 0
    };


    currentValue = (value) => {
        if (this.state.selectedOperation === null) {
            // current value operations here
            if (this.state.currentValueDecFlag === false && value === ".") {
                if (this.state.currentValue === "0") {
                    //check if current value is zero
                    this.setState({currentValue: "0" + value});
                    this.setState({result: "0" + value});
                    this.setState({currentValueDecFlag: true});
                } else {
                    this.setState({currentValue: this.state.currentValue + value});
                    this.setState({result: this.state.currentValue + value});
                    this.setState({currentValueDecFlag: true});
                    // if not zero
                }
            }
            else if (this.state.currentValueDecFlag === true && value === ".") {
                // if decimal is selected nothing changes
                this.setState({currentValue: this.state.currentValue});
            }
            else {
                if (this.state.currentValue === 0) {
                    if (value === "0") {
                        this.setState({ currentValue: 0});
                        this.setState({ result: 0});
                    } else {
                        this.setState({ currentValue: value});
                        this.setState({ result: value});
                    }
                } else {
                    this.setState({ currentValue: "" + this.state.currentValue + value});
                    this.setState({ result: "" + this.state.currentValue + value});
                }
            }
        } else {
            // operation selected add to nextValue
            if (this.state.nextValueDecFlag === false && value === ".") {
                if (this.state.nextValue === "0") {
                    //check if current value is zero
                    this.setState({nextValue: "0" + value});
                    this.setState({result: "0" + value});
                    this.setState({nextValueDecFlag: true});
                } else {
                    this.setState({nextValue: this.state.nextValue + value});
                    this.setState({result: this.state.nextValue + value});
                    this.setState({nextValueDecFlag: true});
                    // if not zero
                }
            }
            else if (this.state.nextValueDecFlag === true && value === ".") {
                // if decimal is selected nothing changes
                this.setState({nextValue: this.state.nextValue});
            }
            else {
                if (this.state.nextValue === 0) {
                    if (value === "0") {
                        this.setState({ nextValue: 0});
                        this.setState({ result: 0});
                    }
                    else {
                        this.setState({ nextValue: value});
                        this.setState({ result: value});
                    }
                } else {
                    this.setState({ nextValue: "" + this.state.nextValue + value});
                    this.setState({ result: "" + this.state.nextValue + value});
                }
            }

        }
    };

    selectedOperation = (value) => {
        if (value === "AC") {
            this.setState({currentValue: 0});
            this.setState({currentValueDecFlag: false});
            this.setState({nextValue: 0});
            this.setState({nextValueDecFlag: false});
            this.setState({selectedOperation: null});
            this.setState({result: 0});
        }
        else if (value === "+/-") {
            if (this.state.nextValue === 0) {
                this.setState({result: sign(this.state.currentValue)});
                this.setState({currentValue: sign(this.state.currentValue)});
            } else {
                this.setState({result: sign(this.state.nextValue)});
                this.setState({nextValue: sign(this.state.nextValue)});
            }
        }
        else if (value === "=") {
            switch (this.state.selectedOperation) {
                case "+":
                    this.setState({
                        result: addition(this.state.currentValue, this.state.nextValue),
                        currentValue: addition(this.state.currentValue, this.state.nextValue)});
                    this.afterOpClear();
                    break;
                case "-":
                    this.setState({
                        result: subtract(this.state.currentValue, this.state.nextValue),
                        currentValue:subtract(this.state.currentValue, this.state.nextValue)});
                    this.afterOpClear();
                    break;
                case "x":
                    this.setState({
                        result: multiply(this.state.currentValue, this.state.nextValue),
                        currentValue: multiply(this.state.currentValue, this.state.nextValue)});
                    this.afterOpClear();
                    break;
                case "÷":
                    this.setState({
                        result: divide(this.state.currentValue, this.state.nextValue),
                        currentValue: divide(this.state.currentValue, this.state.nextValue)});
                    this.afterOpClear();
                    break;
                case "%":
                    break;

            }
        }
        else {
            this.setState({ selectedOperation: value });
            console.log(this.state.selectedOperation);
        }
    };

    afterOpClear() {
        this.setState({
            nextValue: 0,
            nextValueDecFlag: false,
            selectedOperation: null});
    };

  render () {
      return (
          <div className="App">
              <div className="result">{this.state.result}</div>
              <div className="controlGrid">
                  <Controls buttons={this.state.buttons} currentValue={this.currentValue} selectedOperation={this.selectedOperation}/>
              </div>
          </div>
      );
  }

}

export default App;
