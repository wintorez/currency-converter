import React, { Component } from 'react';
import cx from 'classnames';
import uniqueId from 'lodash/uniqueId';
import Help from './Help';

class CurrencyInput extends Component {
  state = {
    inputId: uniqueId('currency-input'),
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
    const { inputId, hasError } = this.state;
    const { label, amount = '', currency } = this.props;

    return (
      <div
        className={cx({
          'form-group': true,
          'has-error': hasError
        })}
      >
        <label className="control-label" htmlFor={inputId}>
          {label}
        </label>
        <div>
          <input
            id={inputId}
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
        {hasError && <Help>Invalid amount</Help>}
      </div>
    );
  }
}

export default CurrencyInput;
