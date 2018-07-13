import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import Help from './Help';

class CurrencyInput extends Component {
  state = {
    id: uniqueId('currency-input'),
    hasError: false
  };

  handleAmountChange = ({ target: { value } }) =>
    this.setState(
      { hasError: value.trim() !== '' && isNaN(parseFloat(value)) },
      () =>
        this.props.onAmountChange({
          amount: value,
          source: this.props.source
        })
    );

  handleCurrencyChange = ({ target: { value } }) =>
    this.props.onCurrencyChange({
      currency: value,
      source: this.props.source
    });

  render() {
    const { id, hasError } = this.state;
    const { label, amount = '', currency } = this.props;
    const helpBlock = hasError ? <Help>Invalid amount</Help> : null;
    const containerClass = `form-group${
      this.state.hasError ? ' has-error' : ''
    }`;

    return (
      <div className={containerClass}>
        <label className="control-label" htmlFor={id}>
          {label}
        </label>
        <div>
          <input
            id={id}
            type="text"
            className="form-control"
            value={amount}
            onChange={this.handleAmountChange}
            placeholder="0.00"
          />
          <select
            className="form-control"
            value={currency}
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
