import * as React from 'react'
import { uniqueId } from 'lodash'

export class Input extends React.Component {
  state = {
    inputId: uniqueId('currency-input'),
    hasError: false,
  }

  handleAmountChange = ({ target: { value } }) =>
    this.setState(
      { hasError: value.trim() !== '' && isNaN(parseFloat(value)) },
      () =>
        this.props.onAmountChange({
          amount: value,
          source: this.props.source,
        })
    )

  handleCurrencyChange = ({ target: { value } }) =>
    this.props.onCurrencyChange({
      currency: value,
      source: this.props.source,
    })

  render() {
    const { inputId, hasError } = this.state
    const { label, amount = '', currency } = this.props

    return (
      <div className="form-control">
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
        <div>
          <input
            id={inputId}
            type="text"
            className="input"
            value={amount}
            onChange={this.handleAmountChange}
            placeholder="0.00"
          />
          <select
            className="input"
            value={currency}
            onChange={this.handleCurrencyChange}
          >
            <option>CAD</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        {hasError && <p>Invalid amount</p>}
      </div>
    )
  }
}
