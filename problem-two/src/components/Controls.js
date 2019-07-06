import React, { Component } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

class Controls extends Component {

    render () {
        return this.props.buttons.map((button) => (
            <Button key={button.id} button={button} currentValue={this.props.currentValue} selectedOperation={this.props.selectedOperation}/>
        ));
    }
}

Controls.propTypes = {
    controls: PropTypes.array.isRequired
};

export default Controls;
