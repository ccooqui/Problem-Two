// Erica Romero

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
        percentFlag: false,
        result: 0
    };

    // Check current selected number or decimal value
    currentValue = (value) => {
        // If no operation is selected yet add value to Current Value
        if (this.state.selectedOperation === null) {
            // Check if a decimal has been entered for Current Value yet
            if (this.state.currentValueDecFlag === false && value === ".") {
                if (this.state.currentValue === "0") {
                    // Check if current value is zero if so keep value at 0
                    this.setState({
                        result: "0" + value,
                        currentValue: "0" + value,
                        currentValueDecFlag: true
                    });
                } else {
                    // If not zero set value to number entered
                    this.setState({
                        result: this.state.currentValue + value,
                        currentValue: this.state.currentValue + value,
                        currentValueDecFlag: true
                    });
                }
            }
            // Check if current value already has decimal and current num value is a decimal
            else if (this.state.currentValueDecFlag === true && value === ".") {
                // If decimal is selected nothing changes
                this.setState({currentValue: this.state.currentValue});
            }
            else {
                // If selected value is not a decimal
                if (this.state.currentValue === 0 || this.state.currentValue === "0") {
                    // If selected value is zero and current value is already 0
                    if (value === "0") {
                        this.setState({
                            result: 0,
                            currentValue: 0
                        });
                    } else {
                        // If not zero change current value to value selected
                        this.setState({
                            result: value,
                            currentValue: value
                        });
                    }
                } else {
                    this.setState({
                        result: "" + this.state.currentValue + value,
                        currentValue: "" + this.state.currentValue + value
                    });
                }
            }
        } else {
            // Operation is selected so add numbers to next value
            if (this.state.nextValueDecFlag === false && value === ".") {
                if (this.state.nextValue === "0") {
                    // Check if current value is zero
                    this.setState({
                        result: "0" + value,
                        nextValue: "0" + value,
                        nextValueDecFlag: true
                    });
                } else {
                    // If not zero
                    this.setState({
                        result: this.state.nextValue + value,
                        nextValue: this.state.nextValue + value,
                        nextValueDecFlag: true
                    });
                }
            }
            else if (this.state.nextValueDecFlag === true && value === ".") {
                // If decimal is selected and input is decimal nothing changes
                this.setState({nextValue: this.state.nextValue});
            }
            else {
                if (this.state.nextValue === 0 || this.state.nextValue === "0") {
                    if (value === "0") {
                        // If selected value is zero and current value is already 0
                        this.setState({
                            result: 0,
                            nextValue: 0
                        });
                    }
                    else {
                        // If not zero change current value to value selected
                        this.setState({
                            result: value,
                            nextValue: value
                        });
                    }
                } else {
                    this.setState({
                        result: "" + this.state.nextValue + value,
                        nextValue: "" + this.state.nextValue + value
                    });
                }
            }
        }
    };

    //Function to handle operation buttons
    selectedOperation = (value) => {
        if (value === "AC") {
            //Clear all values
            this.setState({
                currentValue: 0,
                currentValueDecFlag: false,
                nextValue: 0,
                nextValueDecFlag: false,
                selectedOperation: null,
                percentFlag: false,
                result: 0
            });
        }
        else if (value === "+/-") {
            //Change sign of number
            let signCalc = "";
            if (this.state.nextValue === 0) {
                signCalc = sign(this.state.currentValue);
                this.setState({
                    result: signCalc,
                    currentValue: signCalc
                });
            } else {
                signCalc = sign(this.state.nextValue);
                this.setState({
                    result: signCalc,
                    nextValue: signCalc
                });
            }
        }
        else if (value === "%"){
            // Calculate percent of current number
            let percentCalc = "";
            if (this.state.nextValue === 0){
                percentCalc = percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation);
                this.setState({
                    result: percentCalc,
                    currentValue: percentCalc
                });
            } else {
                // If operation is already selected set percent flag to true
                this.setState({percentFlag: true});
            }

        }
        else if (value === "=") {
            switch (this.state.selectedOperation) {
                case "+":
                    // Calculate the sum
                    let sum = "";
                    if (this.state.percentFlag){
                        sum = percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation);
                        this.setState({
                            result: sum,
                            currentValue: sum
                        });
                    } else {
                        sum = addition(this.state.currentValue, this.state.nextValue);
                        this.setState({
                            result: sum,
                            currentValue: sum
                        });
                    }
                    this.afterOpClear();
                    break;
                case "-":
                    // Calculate the difference
                    let difference = "";
                    if (this.state.percentFlag){
                        difference = percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation);
                        this.setState({
                            result: difference,
                            currentValue: difference
                        });
                    } else {
                        difference = subtract(this.state.currentValue, this.state.nextValue);
                        this.setState({
                            result: difference,
                            currentValue: difference
                        });
                    }
                    this.afterOpClear();
                    break;
                case "x":
                    // Calculate the product
                    let product = "";
                    if (this.state.percentFlag){
                        product = percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation);
                        this.setState({
                            result: product,
                            currentValue: product
                        });
                    } else {
                        product = multiply(this.state.currentValue, this.state.nextValue);
                        this.setState({
                            result: product,
                            currentValue: product
                        });
                    }
                    this.afterOpClear();
                    break;
                case "÷":
                    let dividend = "";
                    if (this.state.percentFlag){
                        dividend = percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation);
                        this.setState({
                            result: dividend,
                            currentValue: dividend
                        });
                    } else {
                        // Try to divide
                        try {
                            dividend = divide(this.state.currentValue, this.state.nextValue);
                            this.setState({
                                result: dividend,
                                currentValue: dividend
                            });
                        } catch {
                            // If divide by zero show error
                            this.setState({
                                result: "undefined",
                                currentValue: 0
                            });
                        }
                    }
                    this.afterOpClear();
                    break;
                case "%":
                    this.setState({result: percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation)});
                    this.setState({currentValue: percent(this.state.currentValue, this.state.nextValue, this.state.selectedOperation)});
                    this.afterOpClear();
                    break;

            }
        }
        else {
            this.setState({ selectedOperation: value });
        }
    };

    afterOpClear() {
        this.setState({
            nextValue: 0,
            nextValueDecFlag: false,
            selectedOperation: null,
            percentFlag: false});
    };

  render () {
      return (
          <div className="App">
              <div className="result"><p>{this.state.result}</p></div>
              <div className="controlGrid">
                  <Controls buttons={this.state.buttons} currentValue={this.currentValue} selectedOperation={this.selectedOperation}/>
              </div>
          </div>
      );
  }

}

export default App;
