import React, { Component } from 'react';
import '../App.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
    render () {
        const {value, isOp} = this.props.button;
        if (isOp === false){
            return (
                <div>
                    <button className="Btn" onClick={this.props.currentValue.bind(this, value)}>{value}</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button className="OpBtn" onClick={this.props.selectedOperation.bind(this, value)}>{value}</button>
                </div>
            )
        }
    }
}

Button.propTypes = {
    button: PropTypes.object.isRequired
};

export default Button;
