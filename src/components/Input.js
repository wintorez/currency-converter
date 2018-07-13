import React, { Component } from 'react';
import validator from 'validator';
import uniqueId from 'lodash/uniqueId';
import Help from './Help';

class CurrencyInput extends Component {
  state = {
    id: uniqueId('currency-input'),
    hasError: false,
  };

  handleAmountChange = (e) => {
    const { value } = e.target;
    if (value === '' || validator.isFloat(value)) {
      this.setState({ hasError: false });
    } else {
      this.setState({ hasError: true });
    }
    this.props.onAmountChange({
      amount: value,
      source: this.props.source,
    });
  };

  handleCurrencyChange = (e) => {
    this.props.onCurrencyChange({
      currency: e.target.value,
      source: this.props.source,
    });
  };

  render() {
    const helpBlock = this.state.hasError ? <Help>Invalid amount</Help> : null;
    const containerClass = `form-group${
      this.state.hasError ? ' has-error' : ''
    }`;
    return (
      <div className={containerClass}>
        <label className="control-label" htmlFor={this.state.id}>
          {this.props.label}
        </label>
        <div>
          <input
            id={this.state.id}
            type="text"
            className="form-control"
            value={this.props.amount || ''}
            onChange={this.handleAmountChange}
            placeholder="0.00"
          />
          <select
            className="form-control"
            value={this.props.currency}
            onChange={this.handleCurrencyChange}
          >
            <option>CAD</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        {helpBlock}
      </div>
    );
  }
}

export default CurrencyInput;
