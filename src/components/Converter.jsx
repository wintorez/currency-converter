import * as React from 'react'
import axios from 'axios'
import fx from 'money'
import useSWR from 'swr'
import { Input } from '.'

function convert(amount, source, destination) {
  return !Number.isNaN(parseFloat(amount))
    ? fx(amount).from(source).to(destination).toFixed(2).replace(/\.00$/g, '')
    : ''
}

export function Converter(props) {
  const [state, setState] = React.useState({
    from: {
      amount: '',
      currency: 'CAD',
    },
    to: {
      amount: '',
      currency: 'USD',
    },
    hasError: false,
  })

  const url =
    props.src ??
    'https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=CAD,EUR,USD'
  const fetcher = () =>
    axios
      .get(url, { headers: { apikey: import.meta.env.VITE_API_KEY } })
      .then((r) => r.data)
  const { data, error, isLoading } = useSWR(url, fetcher)

  if (error) {
    return (
      <div>
        <h2 className="mb-0">Currency Converter</h2>
        <div className="alert alert-error">
          Error: Unable to load conversion rates!
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-0">Currency Converter</h2>
        <div>Loading...</div>
      </div>
    )
  }

  fx.base = data.base
  fx.rates = data.rates

  function handleAmountChange({ source, amount }) {
    if (source === 'from') {
      setState(({ from, to }) => ({
        from: {
          ...from,
          amount,
        },
        to: {
          ...to,
          amount: convert(amount, from.currency, to.currency),
        },
      }))
    } else {
      setState(({ from, to }) => ({
        to: {
          ...to,
          amount,
        },
        from: {
          ...from,
          amount: convert(amount, to.currency, from.currency),
        },
      }))
    }
  }

  function handleCurrencyChange({ source, currency }) {
    if (source === 'from') {
      setState(({ from, to }) => ({
        from: {
          ...from,
          currency,
        },
        to: {
          ...to,
          amount: convert(from.amount, currency, to.currency),
        },
      }))
    } else {
      setState(({ from }) => ({
        to: {
          currency,
          amount: convert(from.amount, from.currency, currency),
        },
      }))
    }
  }

  return (
    <div>
      <h2 className="mb-0">Currency Converter</h2>
      <Input
        source="from"
        label="Type in amount and select currency:"
        onAmountChange={handleAmountChange}
        onCurrencyChange={handleCurrencyChange}
        amount={state.from.amount}
        currency={state.from.currency}
      />
      <Input
        source="to"
        label="Converted amount:"
        onAmountChange={handleAmountChange}
        onCurrencyChange={handleCurrencyChange}
        amount={state.to.amount}
        currency={state.to.currency}
      />
    </div>
  )
}
