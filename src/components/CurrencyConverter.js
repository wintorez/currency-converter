import React from 'react';
import fx from 'money';
import 'isomorphic-fetch';
import CurrencyInput from './CurrencyInput';

class CurrencyConverter extends React.Component {
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
  };

  async componentDidMount() {
    try {
      const response = await fetch(this.props.src);
      const { base, rates } = await response.json();
      fx.base = base;
      fx.rates = rates;
    } catch (err) {
      window.setTimeout(() => { this.setState({ hasError: true }); }, 0);
    }
  }

  convert = (amount, source, destination) => (Number.isNaN(parseFloat(amount))
    ? ''
    : fx(amount).from(source).to(destination).toFixed(2)
      .replace(/\.00$/g, ''));

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
      }));
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
      }));
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
      }));
    } else {
      this.setState(({ from }) => ({
        to: {
          currency,
          amount: this.convert(from.amount, from.currency, currency),
        },
      }));
    }
  }

  showDisclaimer = () => {
    window.alert('This widget uses Fixer.io which is a free JSON API for current and historical foreign exchange rates published by the European Central Bank. The rates are updated daily around 3PM CET.');
  }

  render() {
    const form = (
      <div>
        <form>
          <CurrencyInput
            source="from"
            label="Type in amount and select currency:"
            onAmountChange={this.handleAmountChange}
            onCurrencyChange={this.handleCurrencyChange}
            amount={this.state.from.amount}
            currency={this.state.from.currency}
          />
          <CurrencyInput
            source="to"
            label="Converted amount:"
            onAmountChange={this.handleAmountChange}
            onCurrencyChange={this.handleCurrencyChange}
            amount={this.state.to.amount}
            currency={this.state.to.currency}
          />
        </form>
        <div className="text-right">
          <button className="btn btn-info" onClick={this.showDisclaimer}>Disclaimer</button>
        </div>
      </div>
    );
    const error = (
      <div className="alert alert-danger">
        <strong>Error!</strong> Unable to load conversion rates.
      </div>
    );
    return (
      <div className="currency-converter panel panel-default">
        <div className="panel-heading">Currency converter</div>
        <div className="panel-body">
          {
            this.state.hasError
              ? error
              : form
          }
        </div>
      </div>
    );
  }
}

CurrencyConverter.defaultProps = {
  src: 'http://api.fixer.io/latest',
};

export default CurrencyConverter;
