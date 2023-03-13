import * as React from 'react'
import fx from 'money'
import { Input } from '.'

export class Converter extends React.Component {
  static defaultProps = {
    src: '/api/latest.json',
  }

  state = {
    from: {
      amount: '',
      currency: 'CAD',
    },
    to: {
      amount: '',
      currency: 'USD',
    },
    hasError: false,
  }

  async componentDidMount() {
    try {
      const response = await fetch(this.props.src)
      const { base, rates } = await response.json()
      fx.base = base
      fx.rates = rates
    } catch (err) {
      window.setTimeout(() => {
        this.setState({ hasError: true })
      }, 0)
    }
  }

  convert = (amount, source, destination) =>
    Number.isNaN(parseFloat(amount))
      ? ''
      : fx(amount).from(source).to(destination).toFixed(2).replace(/\.00$/g, '')

  handleAmountChange = ({ source, amount }) => {
    if (source === 'from') {
      this.setState(({ from, to }) => ({
        from: {
          ...from,
          amount,
        },
        to: {
          ...to,
          amount: this.convert(amount, from.currency, to.currency),
        },
      }))
    } else {
      this.setState(({ from, to }) => ({
        to: {
          ...to,
          amount,
        },
        from: {
          ...from,
          amount: this.convert(amount, to.currency, from.currency),
        },
      }))
    }
  }

  handleCurrencyChange = ({ source, currency }) => {
    if (source === 'from') {
      this.setState(({ from, to }) => ({
        from: {
          ...from,
          currency,
        },
        to: {
          ...to,
          amount: this.convert(from.amount, currency, to.currency),
        },
      }))
    } else {
      this.setState(({ from }) => ({
        to: {
          currency,
          amount: this.convert(from.amount, from.currency, currency),
        },
      }))
    }
  }

  render() {
    const inputs = (
      <div>
        <Input
          source="from"
          label="Type in amount and select currency:"
          onAmountChange={this.handleAmountChange}
          onCurrencyChange={this.handleCurrencyChange}
          amount={this.state.from.amount}
          currency={this.state.from.currency}
        />
        <Input
          source="to"
          label="Converted amount:"
          onAmountChange={this.handleAmountChange}
          onCurrencyChange={this.handleCurrencyChange}
          amount={this.state.to.amount}
          currency={this.state.to.currency}
        />
      </div>
    )

    const error = (
      <div className="alert alert-error">
        Error: Unable to load conversion rates!
      </div>
    )

    return (
      <div className="my-5">
        <h2>Currency converter</h2>
        {this.state.hasError ? error : inputs}
      </div>
    )
  }
}
